import { Patient } from './../../fireData/patient';
import { Component } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPatientsComponent } from '../../dialog-patients/dialog-patients.component';

@Component({
  selector: 'app-patient-form',
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
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css'
})
export class PatientFormComponent {

  Patient: Patient[] = [];
  dataForm!: FormGroup;
  isSubmitted = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private patientservice: PatientService,
    private dialog: MatDialog
  ){
    this.initForm();
  }


  private initForm(): void {
   this.dataForm = this.fb.group({
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

// loadPatient(){
//   this.patientservice.getAllPatient().subscribe({
//     next: (data) => {
//       this.Patient = data;
//       console.log(data);
//     },
//     error: (error) => {
//       console.error('Error fetching patients:', error);
//       this.toastr.error('ไม่สามารถโหลดข้อมูลผู้ป่วยได้', 'ข้อผิดพลาด');
//     }
//   })
// }

onSubmit(){
  if(!this.dataForm.invalid){
    this.isSubmitted = true;
    this.patientservice.addPatient(this.dataForm.value).subscribe({
      next: (data) => {
        this.dialog.open(DialogPatientsComponent, {
          width: '400px',
          data: {
            message: 'บันทึกข้อมูลผู้ป่วยสำเร็จ',
            patient: data
          }
        });
        console.log(data);
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือน');
        this.dataForm.reset();
        this.router.navigate(['/patient-list']);
      }
    });
  }
}
}
