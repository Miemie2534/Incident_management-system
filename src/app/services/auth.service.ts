import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkAuthStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  checkAuthStatus(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  login(username: string, password: string): Observable<boolean> {
    if (username === 'pathumthip199' && password === 'Pvoert199') {
      localStorage.setItem('auth_token', 'your-jwt-token');
      this.isLoggedInSubject.next(true);
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isLoggedInSubject.next(false);
  }
}
