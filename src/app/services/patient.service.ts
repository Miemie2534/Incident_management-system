import { Patient } from './../fireData/patient';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patient: Patient[] = [];
  http = inject(HttpClient);

  apiUrl = 'https://localhost:7103/api/Patient';

  constructor() { }

  getAllPatient(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  addPatient(Patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, Patient);
  }

  updatePatient(id: number, Patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, Patient);
  }

  deletePatient(id: number): Observable<Patient>{
    return this.http.delete<Patient>(`${this.apiUrl}/${id}`);
  }
}
