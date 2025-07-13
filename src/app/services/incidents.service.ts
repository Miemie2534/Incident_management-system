import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from '../fireData/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  Incident: Incident[] = []
  apiUrl: string = 'https://localhost:7103/api/Incident';

  http = inject(HttpClient)

  constructor() { }

  getAllIncident(): Observable<Incident[]>{
    return this.http.get<Incident[]>(this.apiUrl);
  }

  getIncidentById(id: number): Observable<Incident>{
    return this.http.get<Incident>(`${this.apiUrl}/${id}`);
  }

  addIncident(formData: FormData): Observable<Incident> {
    return this.http.post<Incident>(this.apiUrl, formData);
  }

  updateIncident(incidentId: number, formData: FormData): Observable<Incident> {
    return this.http.put<Incident>(`${this.apiUrl}/${incidentId}`, formData);
  }

  deleteIncident(id: number): Observable<Incident>{
    return this.http.delete<Incident>(`${this.apiUrl}/${id}`);
  }
}
