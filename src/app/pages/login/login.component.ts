import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  isLoading = false;
  result: string = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toarts: ToastrService
    ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // ตรวจสอบถ้าผู้ใช้ล็อกอินอยู่แล้วให้ redirect ไปหน้า content
    if (this.auth.checkAuthStatus()) {
      this.router.navigate(['/content']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { username, password } = this.loginForm.value;

      this.auth.login(username, password).subscribe({
        next: (success) => {
          this.isLoading = false;
          if (success) {
            this.toarts.success('เข้าสู่ระบบสำเร็จ', 'สำเร็จ');
            this.router.navigate(['/content']);
          } else {
            this.errorMessage = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
            this.toarts.warning(this.errorMessage, 'ข้อผิดพลาด');
          }
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
          this.toarts.error(this.errorMessage, 'ข้อผิดพลาด');
        }
      });
    }
  }
}



