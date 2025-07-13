import { Data } from './../../fireData/data';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesService } from '../../fire-extinguisher/services.service';
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

@Component({
  selector: 'app-fire-form',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './fire-form.component.html',
  styleUrl: './fire-form.component.css'
})
export class FireFormComponent  {
  dataForm!: FormGroup;
  isSubmitted = false;
  Data: Data[] = [];



  constructor(
    private fb: FormBuilder,
    private service: ServicesService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.dataForm = this.fb.group({
      SerialNumber: ['', Validators.required],
      Type: ['', Validators.required],
      Size: ['', Validators.required],
      Location: ['', Validators.required],
      Status: ['', Validators.required],
      CreatedDate: ['', Validators.required],
    });
  }



  onSubmit(){
   if (this.dataForm.valid) {
    this.service.addFireExinguishers(this.dataForm.value).subscribe({
      next: () => {
        this.toastr.success('บันทึกข้อมูลสำเร็จ','แจ้งเตือน');
        this.router.navigate(['/fire-list']);
        this.isSubmitted = true;
        this.dataForm.reset();
      },
      error: (err) =>{
        this.toastr.warning('ไม่สามารถบันทืกข้อมูลได้', err);
        this.isSubmitted = false;
      }
    });
  }
}
}
