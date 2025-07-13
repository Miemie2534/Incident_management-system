import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../fireData/data';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  baseUrl = 'https://localhost:7103/';

  http = inject(HttpClient);

  constructor() { }

  // ดึงข้อมูลจาก API
  getAll(): Observable<Data[]> {
    return this.http.get<Data[]>(this.baseUrl + 'api/FireExtinguishers');
  }

  // ดึงข้อมูลจาก API โดยใช้ id
  getFireById(id: number): Observable<Data>{
    return this.http.get<Data>(this.baseUrl + 'api/FireExtinguishers/' + id);
  }

  // เพิ่มข้อมูล ใน API
  addFireExinguishers(data: Data): Observable<Data> {
    return this.http.post<Data>(this.baseUrl + 'api/FireExtinguishers', data);
  }

  // แก้ไขข้อมูล ใน API
  updateFireExinguishers(data: Data, id: number) {
    return this.http.put(`/api/fireextinguishers/${id}`, data);
  }

  // ลบข้อมูล ใน API
  deleteFireExinguishers(id: number): Observable<Data> {
    return this.http.delete<Data>(this.baseUrl + 'api/FireExtinguishers/' + id);
  }

}

