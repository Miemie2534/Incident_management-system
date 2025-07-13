import { Component } from '@angular/core';
import { IncidentsService } from '../../services/incidents.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogIncidentsComponent } from '../../dialog-incidents/dialog-incidents.component';


@Component({
  selector: 'app-incident',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterLink,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './incident.component.html',
  styleUrl: './incident.component.css',
})
export class IncidentComponent {
  isSubmited = false;
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  fileInputs: number[] = [0];  // เริ่มต้นมีช่องเดียว

  incident = {
    id: null as number | null, // หรือ 0 ถ้าต้องการ
    report: '',
    location: '',
    type: '',
    description: '',
    solution: '',
    recorder: '',
    images: [] as File[],
  };

  constructor(
    private incidentService: IncidentsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  addFileInput() {
  this.fileInputs.push(this.fileInputs.length);
  }

  // ฟังส์ชันเพิ่มรูป
  onFileSelected(event: any, index: number) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFiles[index] = file;

    // แสดงรูปภาพที่ต้องการอัพโหลด
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviews[index] = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
  removeImage(index: number){
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
    this.fileInputs.splice(index, 1);
  }

  // ฟังส์ชัน เก็บข้อมูลรูปภาพ + Text
  submit() {
    const formData = new FormData();
    this.isSubmited = true;
    formData.append('report', this.incident.report);
    formData.append('location', this.incident.location);
    formData.append('type', this.incident.type);
    formData.append('description', this.incident.description);
    formData.append('solution', this.incident.solution);
    formData.append('recorder', this.incident.recorder);

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i]); // ต้องใช้ชื่อ key เดียวกัน 'images'
    }

    if(this.incident.id !== null && this.incident.id !== undefined) {
      formData.append('id', this.incident.id.toString()); // ถ้ามี id ให้ส่งไปด้วย
      this.incidentService.updateIncident(this.incident.id, formData).subscribe({
      next: () => {
        this.router.navigate(['/incident-list']);

        this.isSubmited = true;

        this.dialog.open(DialogIncidentsComponent, {
          width: '400px',
          data: { message: 'บันทึกข้อมูลการแจ้งเหตุฉุกเฉินสำเร็จ' },
        }).afterClosed().subscribe(() => {
          this.router.navigate(['/incident-list']);
        })
      },
      error: (err) => console.error(err),
    });
  } else {
    this.incidentService.addIncident(formData).subscribe({
      next: () => {
        this.router.navigate(['/incident-list']);

        this.isSubmited = true;

        this.dialog.open(DialogIncidentsComponent, {
          width: '400px',
          data: { message: 'บันทึกข้อมูลการแจ้งเหตุฉุกเฉินสำเร็จ' },
        }).afterClosed().subscribe(() => {
          this.router.navigate(['/incident-list']);
        })
      },
      error: (err) => console.error(err),
    })
  }
}
}
