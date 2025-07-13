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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from '../../fire-extinguisher/services.service';

@Component({
  selector: 'app-claims-edit',
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
  ],
  templateUrl: './claims-edit.component.html',
  styleUrl: './claims-edit.component.css'
})
export class ClaimsEditComponent implements OnInit {
  claimForm!: FormGroup;
  isSubmitted = false;
  claims: Claims[] = [];
  claimsId!: number;
  isLoading = false;

  fireExtinguishers: { id: number, serialNumber: string, location: string, size: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ClaimsService,
    private fireservice: ServicesService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ){
    this.initForm();
  }


  ngOnInit() {
    console.log('ngOnInit เรียกแล้ว');
    this.claimsId =+(this.route.snapshot.paramMap.get('id') || 0);
    console.log('claimsId:', this.claimsId);
    if (!this.claimsId) {
      this.toastr.error('ไม่สามารถแก้ไขข้อมูลได้ เนื่องจากยังไม่มีการแจ้งเคลม');
      this.router.navigate(['/claims-list']);
      return;
    }

    // โหลดข้อมูลถังดับเพลิงก่อน แล้วค่อยโหลดข้อมูลเคลม
    this.fireservice.getAll().subscribe({
      next: (data) => {
        this.fireExtinguishers = data.map(fe => ({
          ...fe,
          id: Number(fe.id) // ป้องกันปัญหา type ไม่ตรง
        }));

        // เมื่อได้ถังแล้ว ค่อยโหลดข้อมูลการเคลม
        this.loadClaimsData();
      },
      error: () => {
        this.toastr.error('ไม่สามารถโหลดข้อมูลถังดับเพลิง');
      }
    });
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

  // โหลดข้อมูลเคลม
  private loadClaimsData() {
    this.isLoading = true;
    this.service.getClaimsId(this.claimsId).subscribe({
      next: (data) => {
        this.claimForm.patchValue({
          fireExtinguisherId: Number(data.fireExtinguisherId), // ให้มั่นใจว่าเป็น number
          claims: data.claims ?? '',
          actionTaken: data.actionTaken ?? '',
          claimDate: data.claimDate ? new Date(data.claimDate) : '',
          replacement: data.replacement ?? ''
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('โหลดข้อมูลเคลมล้มเหลว', err);
        this.toastr.error('ไม่สามารถโหลดข้อมูลการเคลมได้');
        this.router.navigate(['/claims-list']);
        this.isLoading = false;
      }
    });
  }

  // อัปเดตข้อมูล
  updateClaims() {
    this.isSubmitted = true;

    if (this.claimForm.invalid) {
      this.toastr.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const updatedClaims: Claims = {
      ...this.claimForm.value,
      id: this.claimsId
    };

    this.service.updateClaims(updatedClaims, this.claimsId).subscribe({
      next: () => {
        this.toastr.success('แก้ไขข้อมูลเรียบร้อยแล้ว');
        this.router.navigate(['/claims-list']);
      },
      error: (err) => {
        console.error('อัปเดตล้มเหลว', err);
        this.toastr.error('เกิดข้อผิดพลาดในการแก้ไข');
        this.isLoading = false;
      }
    });
  }
}
