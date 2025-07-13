import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogActions, MatDialogModule, MatDialogClose, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-incident-delete',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
    MatDialogModule
  ],
  template: `<h2 mat-dialog-title class="d-flex align-items-center text-danger" style="margin: 10px;">
      <mat-icon class="me-2">warning</mat-icon>
      ยืนยันการลบข้อมูล
    </h2>
    <mat-dialog-content>
      คุณต้องการลบรายการแจ้งเหตุหรือไม่? การลบข้อมูลนี้จะไม่สามารถกู้คืนได้อีก
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
  styleUrl: './dialog-incident-delete.component.css'
})
export class DialogIncidentDeleteComponent {
  readonly dialog = inject(MatDialog)


  constructor( ){}
}
