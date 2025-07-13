import { Claims } from './../fireData/claims';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  Claims: Claims[] = [];

  apiUrl = 'https://localhost:7103/api/RepairClaims';
  http = inject(HttpClient);

  constructor() { }


  getClaims(): Observable<Claims[]> {
    return this.http.get<Claims[]>(this.apiUrl);
  }

  getClaimsId(id: number): Observable<Claims> {
    return this.http.get<Claims>(`${this.apiUrl}/${id}`);
  }

  addClaims(data: Claims): Observable<Claims> {
    return this.http.post<Claims>(this.apiUrl, data);
  }

  updateClaims(data: Claims, id: number): Observable<Claims> {
    return this.http.put<Claims>(`${this.apiUrl}/${id}`, data);
  }

  deleteClaims(id: number): Observable<Claims> {
    return this.http.delete<Claims>(`${this.apiUrl}/${id}`);
  }
}
