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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogIncidentsComponent } from '../../dialog-incidents/dialog-incidents.component';

@Component({
  selector: 'app-incident-edit',
  imports: [
    CommonModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './incident-edit.component.html',
  styleUrl: './incident-edit.component.css',
})
export class IncidentEditComponent {
  id?: number | null;
  isSubmited = false;
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  fileInputs: number[] = [0];
  imagePreviewsOld: string[] = [];
  imagePreviewsNew: string[] = [];
  imageUrl: string = '';

  incidentId: number = 0;

  incident = {
    id: null as number | null,
    report: '',
    location: '',
    type: '',
    description: '',
    solution: '',
    recorder: '',
    images: [] as File[],
  };

  constructor(
    private incidentservice: IncidentsService,
    private routes: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  private initForm() {
    this.incidentId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.incidentId) {
      this.dialog.open(DialogIncidentsComponent, {
        data: { message: 'ไม่พบรหัสเหตุการณ์' },
      });
      this.routes.navigate(['/incident-list']);
      return;
    }
    this.incidentservice.getIncidentById(this.incidentId).subscribe({
      next: (data) => {
        // Patch ข้อมูล incident ที่ได้จาก API
        this.incident = {
          ...this.incident,
          ...data,
          id: data.id ?? this.incidentId,
          images: [], // ไม่โหลดไฟล์ภาพเดิม (ถ้าต้องการแสดง preview ต้องปรับเพิ่ม)
        };
        // สร้าง preview สำหรับไฟล์ภาพที่มีอยู่แล้ว
        // ✅ แสดงรูปภาพเดิม
        if (Array.isArray(data.images) && data.images.length > 0) {
          this.imagePreviewsOld = data.images
            .filter((img: any) => img.imageData)
            .map((img: any) => 'data:image/jpeg;base64,' + img.imageData);
        }
      },
      error: () => {
        this.dialog.open(DialogIncidentsComponent, {
          data: { message: 'ไม่สามารถโหลดข้อมูลเหตุการณ์ได้' },
        });
        this.routes.navigate(['/incident-list']);
      },
    });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.incident.images.push(files[i]);
        // สร้าง preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviewsNew.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  addFileInput() {
    this.fileInputs.push(this.fileInputs.length);
  }

  // ลบรูปเดิมที่ดึงมาจาก id
  removeOldImage(index: number) {
  this.imagePreviewsOld.splice(index, 1);
  }

  // ลบรูปที่เพิ่มใหม่
  removeImage(index: number) {
    this.incident.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
    this.fileInputs.splice(index, 1);
  }

  editIncident() {
    this.isSubmited = true;
    if (
      !this.incident.report ||
      !this.incident.location ||
      !this.incident.type ||
      !this.incident.description ||
      !this.incident.solution ||
      !this.incident.recorder
    ) {
      this.dialog.open(DialogIncidentsComponent, {
        data: { message: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
      });
      return;
    }

    // สร้าง FormData สำหรับส่งไฟล์
    const formData = new FormData();
    formData.append('report', this.incident.report);
    formData.append('location', this.incident.location);
    formData.append('type', this.incident.type);
    formData.append('description', this.incident.description);
    formData.append('solution', this.incident.solution);
    formData.append('recorder', this.incident.recorder);

    this.incident.images.forEach((file) => {
      formData.append('images', file, file.name);
    });

    // ใช้ incidentId ที่ได้จาก route
    this.incidentservice.updateIncident(this.incidentId, formData).subscribe({
      next: () => {
        this.dialog.open(DialogIncidentsComponent, {
          data: { message: 'แก้ไขข้อมูลเหตุการณ์สำเร็จ' },
        });
        this.routes.navigate(['/incident-list']);
      },
      error: (err) => {
        this.dialog.open(DialogIncidentsComponent, {
          data: { message: 'เกิดข้อผิดพลาดในการแก้ไข' },
        });
        console.error('Error updating incident:', err);
      },
    });
  }
}
