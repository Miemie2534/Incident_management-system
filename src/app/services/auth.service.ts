import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkAuthStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  authUrl = 'https://localhost:7103/api/Auth/login';

  loginUrl = 'https://localhost:7103/api/Auth';

  http = inject(HttpClient)

  checkAuthStatus(): boolean {
    return !!localStorage.getItem('jwtToken');
  }


  login(credentials: { username: string, password: string}): Observable<any> {
    return this.http.post(this.authUrl, credentials);
  }


   setLoginStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.isLoggedInSubject.next(false);
  }

  getAdminOnly(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.loginUrl}/admin-only`, { headers });
  }
}
