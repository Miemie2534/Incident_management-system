import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Claims } from '../../fireData/claims';



@Component({
  selector: 'app-dialog-claims',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDialogModule
  ],
  template: `<h2 mat-dialog-title class="d-flex align-items-center text-danger">
      <mat-icon class="me-2">warning</mat-icon>
      ยืนยันการลบข้อมูล
    </h2>
    <mat-dialog-content>
      คุณต้องการลบการเคลมถังดับเพลิงหมายเลข <strong>{{ claim.serialNumber }}</strong> ใช่หรือไม่?
      <p class="text-danger">โปรดตรวจสอบให้แน่ใจว่าคุณต้องการลบข้อมูลนี้จริงๆ</p>
      <p>หากคุณไม่แน่ใจ กรุณายกเลิกการดำเนินการนี้</p>
      <p>หากคุณต้องการดำเนินการต่อ กรุณายืนยันการลบข้อมูล</p>
      <p>โปรดตรวจสอบให้แน่ใจว่าคุณได้สำรองข้อมูลที่สำคัญก่อนดำเนินการลบ</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>ยกเลิก</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">
        <mat-icon class="me-1">delete</mat-icon>
        ยืนยันการลบ
      </button>
    </mat-dialog-actions>
  `,
  styleUrl: './dialog-claims.component.css'
})
export class DialogClaimsComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogClaimsComponent>,
    @Inject(MAT_DIALOG_DATA) public claim: Claims
  ){
    console.log('Dialog Claim:' , this.claim);

  }
}
