import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Data } from '../../fireData/data';

@Component({
  selector: 'app-dialog-animations',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
   <h2 mat-dialog-title class="d-flex align-items-center text-danger">
      <mat-icon class="me-2">warning</mat-icon>
      ยืนยันการลบข้อมูล
    </h2>
    <mat-dialog-content>
      คุณต้องการลบถังดับเพลิงหมายเลข <strong>{{ data.serialNumber }}</strong> ใช่หรือไม่?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>ยกเลิก</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">
        <mat-icon class="me-1">delete</mat-icon>
        ยืนยันการลบ
      </button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./dialog-animations.component.css']
})
export class DialogAnimationsComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ){
    console.log('Dialog Data:' , this.data);
  }
}
