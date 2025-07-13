import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPatientsComponent } from '../../dialog-patients/dialog-patients.component';
import { Patient } from '../../fireData/patient';

@Component({
  selector: 'app-patient-edit',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.css'
})
export class PatientEditComponent implements OnInit {
  patientForm!: FormGroup;
  Patient: Patient[] = [];
  patientId!: number;
  isSubmitted = false;
  isLoading = false;

  patients: { id: number, firstName: string, lastName: string, department: string, sickness: string, hospital: string, recorder: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private patientservice: PatientService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.initForm();
  }


  ngOnInit() {
      this.patientId =+ (this.route.snapshot.paramMap.get('id') || 0);
      if(!this.patientId){
        this.toastr.error('ไม่พบข้อมูลผู้ป่วยที่ต้องการแก้ไข', 'ข้อผิดพลาด');
        this.router.navigate(['/patient-list']);
        return;
      }

      this.patientservice.getAllPatient().subscribe({
        next: (data) => {
          this.patients = data.map(item => ({
            ...item,
            id: item.id || 0, // Ensure id is a number
          }));

          this.loadPatientData();
        }
      })
  }

  private loadPatientData() {
    this.isLoading = true;
    this.patientservice.getPatientById(this.patientId).subscribe({
      next: (data) => {
        this.patientForm.patchValue({
          ReportDate: data.reportDate,
          employeeId: data.employeeId,
          firstName: data.firstName,
          lastName: data.lastName,
          Department: data.department,
          Sickness: data.sickness,
          Hospital: data.hospital,
          recorder: data.recorder
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error('ไม่สามารถโหลดข้อมูลผู้ป่วยได้', 'ข้อผิดพลาด');
        this.router.navigate(['/patient-list']);
        console.error('Error loading patient data', err);
        this.isLoading = false;
      }
    });
  }


  private initForm() {
    this.patientForm = this.fb.group({
      ReportDate: ['', Validators.required],
  employeeId: ['', [
    Validators.required,
    Validators.pattern('^[0-9]+$')
  ]],
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  Department: ['', Validators.required],
  Sickness: ['', Validators.required],
  Hospital: ['', Validators.required],
  recorder: ['', Validators.required],
    });
  }

  updatePatient() {
    this.isSubmitted = true;

    if(this.patientForm.invalid){
      this.toastr.error('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง', 'ข้อผิดพลาด');
      return;
    }
    this.isLoading = true;

    const updatePatient: Patient = {
      ...this.patientForm.value,
      id: this.patientId
    };

    this.patientservice.updatePatient(this.patientId, updatePatient).subscribe({
      next: () => {
        this.toastr.success('อัปเดตข้อมูลผู้ป่วยสำเร็จ', 'สำเร็จ');
        this.router.navigate(['/patient-list']);
      },
      error: (err) => {
        console.error('Error updating patient data', err);
        this.toastr.error('ไม่สามารถอัปเดตข้อมูลผู้ป่วยได้', 'ข้อผิดพลาด');
        this.isLoading = false;
      }
    });
  }
}
