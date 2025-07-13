import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-dialog-incidents',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIconModule
  ],
  templateUrl: './dialog-incidents.component.html',
  styleUrl: './dialog-incidents.component.css',
})
export class DialogIncidentsComponent {

  constructor(private dialog: MatDialog) {}


  closeDialog(){
    this.dialog.closeAll();
  }
}
