import { IncidentsService } from './../../services/incidents.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Incident } from '../../fireData/incident';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogIncidentDeleteComponent } from '../../dialog-incident-delete/dialog-incident-delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-incident-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.css'
})
export class IncidentListComponent implements AfterViewInit{
  displayedColumns: string[] = [
    'reportDate',
    'report',
    'location',
    'description',
    'solution',
    'type',
    'recorder',
    'actions'
  ];

  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Incident>();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private IncidentsService: IncidentsService,
    private router: Router,
    private dialog: MatDialog,
    private toast: ToastrService
  ){
    this.LoadData();
  }

  LoadData(){
    this.IncidentsService.getAllIncident().subscribe({
      next: (data: Incident[]) => {
        console.log('Success full', data);
        this.dataSource.data = data;
        this.isLoading = true;
      },
      error: (err) => {
        console.error('เรียกข้อมูลการแจ้งเหตุฉุกเฉินไม่สำเเร็จ', err)
      }
    });
  }

  viewImages(element: any){

  }
  applyFilter(event: any){

  }

  deleteIncident(id: number){
    const dialogRef = this.dialog.open(DialogIncidentDeleteComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: false
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.isLoading = true;
        this.IncidentsService.deleteIncident(id).subscribe({
          next: () => {
            this.LoadData();
            this.toast.success('ลบข้อมูลสำเร็จ', 'แจ้งเตือน');
          },
          error: (error) => {
            console.error('ไม่สามารถลบข้อมูลได้', 'ข้อผิดพลาด', error);
            this.isLoading = false;
          }
        });
      }
    })
}
}
