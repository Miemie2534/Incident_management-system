import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-image-view',
  imports:[
    MatDialogModule,
    MatButtonModule
  ],
  template: `
  <h2 mat-dialog-title>รูปภาพขนาดใหญ่</h2>
  <mat-dialog-content>
    <img [src]="data.imgSrc" alt="รูปภาพใหญ่" class="large-image" />
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="onSave()">บันทึก</button>
    <button mat-button mat-dialog-close>ปิด</button>
  </mat-dialog-actions>
  `,
  styles: [`
    .large-image {
      max-width: 100%;
      max-height: 80vh;
      display: block;
      margin: auto;
    }
  `]
})
export class DialogImageViewComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogImageViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imgSrc: string }
  ) {}

  onSave() {
    // ฟังก์ชันดาวน์โหลดภาพ
    this.downloadImage(this.data.imgSrc, 'incident-image.jpg');
  }

  downloadImage(dataUrl: string, filename: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }
}
