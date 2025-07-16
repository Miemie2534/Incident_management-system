import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IncidentsService } from '../../services/incidents.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { DialogIncidentsComponent } from '../../dialog-incidents/dialog-incidents.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { DialogImageViewComponent } from '../../dialog-image-view/dialog-image-view.component';

@Component({
  selector: 'app-incident-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    RouterLink
  ],
  templateUrl: './incident-view.component.html',
  styleUrl: './incident-view.component.css'
})
export class IncidentViewComponent {
  incidentId?: number;
  incident?: any;
  imagePreviewsOld: string[] = [];

  constructor(
    private incidentService: IncidentsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.incidentId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.incidentId) {
      this.dialog.open(DialogIncidentsComponent, {
        data: { message: 'ไม่พบรหัสเหตุการณ์' },
      });
      this.router.navigate(['/incident-list']);
      return;
    }

    this.incidentService.getIncidentById(this.incidentId).subscribe({
  next: (data) => {
    this.incident = data;

    // แปลง images เป็น array เสมอ
    const imagesArray = Array.isArray(data.images)
      ? data.images
      : data.images ? [data.images] : [];

    this.imagePreviewsOld = imagesArray
      .filter((img: any) => img.imageData)
      .map((img: any) => 'data:image/jpeg;base64,' + img.imageData);

    console.log('imagePreviewsOld:', this.imagePreviewsOld);
  },
  error: () => {
    this.dialog.open(DialogIncidentsComponent, {
      data: { message: 'ไม่สามารถโหลดข้อมูลเหตุการณ์ได้' },
    });
    this.router.navigate(['/incident-list']);
  }
});
  }

   openImageDialog(imgSrc: string){
    this.dialog.open(DialogImageViewComponent, {
      data: {imgSrc }
    });
   }
}
