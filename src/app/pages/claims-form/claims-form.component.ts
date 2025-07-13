import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Claims } from '../../fireData/claims';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClaimsService } from '../../services/claims.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from '../../fire-extinguisher/services.service';
import { DialogPatientsComponent } from '../../dialog-patients/dialog-patients.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-claims-form',
  templateUrl: './claims-form.component.html',
  styleUrls: ['./claims-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ]
})
export class ClaimsFormComponent implements OnInit {
  claimForm!: FormGroup;
  Claims: Claims[] = [];
  isSubmitted = false;

  fireExtinguishers: { id: number, serialNumber: string, location: string, size: string }[] = []

  constructor(
    private fb: FormBuilder,
    private service: ClaimsService,
    private fireservice: ServicesService,
    private router: Router,
    private toasr: ToastrService,
    private dialog: MatDialog
  ){
    this.initForm();
    }

    // ดึงข้อมูลรหัสถังดับเพลิง เพื่อให้ผู้ใช้งานเลือกจากถังดับเพลิงที่มีอยู่
    ngOnInit(): void {
        this.fireservice.getAll().subscribe(data => {
          this.fireExtinguishers = data;
        })
    }

  private initForm(): void {
    this.claimForm = this.fb.group({
      fireExtinguisherId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      claims: ['', Validators.required],
      actionTaken: ['', Validators.required],
      claimDate: ['', Validators.required],
      replacement: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.claimForm.valid){
      this.service.addClaims(this.claimForm.value).subscribe({
        next: (data) => {
          this.dialog.open(DialogPatientsComponent, {
            data: {
              message: 'บันทึกข้อมูลสำเร็จ',
              action: 'success'
            }
          })
          this.toasr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือน');
          this.router.navigate(['/claims-list']);
          this.isSubmitted = false;
          this.claimForm.reset();
        },
        error: (err) => {
          this.toasr.error('ไม่สามารถสร้างรายการเคลมได้', 'แจ้งเตือน', err)
          alert('ไม่สามรถเพิ่มรายการเคลมได้ กรุณาลองใหม่อีกครั้ง.');
          this.isSubmitted = false;
        }
      });
    }
  }
}
