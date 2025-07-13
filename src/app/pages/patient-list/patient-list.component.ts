import { PatientService } from './../../services/patient.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Patient } from '../../fireData/patient';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogIncidentDeleteComponent } from '../../dialog-incident-delete/dialog-incident-delete.component';

@Component({
  selector: 'app-patient-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'employeeId',
    'firstName',
    'lastName',
    'department',
    'sickness',
    'hospital',
    'recorder',
    'actions'
  ];

  isLoading = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Patient>();

  constructor(
    private patientservice: PatientService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ){
    this.loadPatient();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  // ค้นหารายการผู้ป่วย
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPatient(){
    this.patientservice.getAllPatient().subscribe({
      next: (data: Patient[]) => {
        this.dataSource.data = data;
        this.isLoading = true;
      },
      error:(err) => {
        console.error('Error loading patient data', err);
        this.isLoading = false;
      }
    });
  }

  editPatient(id: number){
    this.router.navigate(['/patient-edit', id]);
  }


  deleteIncident(id: number) {
    const dialogRef = this.dialog.open(DialogIncidentDeleteComponent, {
      width: '400px',
      data: {
        title: 'ลบรายการผู้ป่วย',
        message: 'คุณต้องการลบรายการผู้ป่วยนี้หรือไม่?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientservice.deletePatient(id).subscribe({
          next: () => {
            this.toast.success('ลบรายการผู้ป่วยสำเร็จ', 'สำเร็จ');
            this.loadPatient();
          },
          error: () => {
            this.toast.error('เกิดข้อผิดพลาดในการลบรายการผู้ป่วย', 'ผิดพลาด');
          }
        });
      }
    });
  }
}
