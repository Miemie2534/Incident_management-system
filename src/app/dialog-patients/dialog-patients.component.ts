import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-patients',
  imports: [
    MatDialogModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule
  ],
  templateUrl: './dialog-patients.component.html',
  styleUrl: './dialog-patients.component.css'
})
export class DialogPatientsComponent {

  constructor(private dialog: MatDialog) {}

  closeDialog() {
    this.dialog.closeAll();
  }
}
