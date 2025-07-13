import { ClaimsService } from './../../services/claims.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Claims } from '../../fireData/claims';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogClaimsComponent } from '../dialog-claims/dialog-claims.component';

@Component({
  selector: 'app-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})


export class ClaimsListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'index',
    'serialNumber',
    'type',
    'size',
    'location',
    'claims',
    'actionTaken',
    'claimDate',
    'replacement',
    'actions'
  ];

  dataSource = new MatTableDataSource<Claims>();

  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private ClaimsService: ClaimsService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ){
    this.LoadData();
  }

  LoadData(){
    this.ClaimsService.getClaims().subscribe({
      next: (data: Claims[]) => {
        this.dataSource.data = data;
        this.isLoading = true;
      },
      error: (error) => {
        console.error('เรียกข้อมูลการเคลมไม่สำเร็จ', error);

        this.isLoading = false;
      }
    });
  }

  // ฟังส์ชันสำหรับการกรองข้อมูลในตาราง
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(id: number) {
   this.router.navigate(['/claims-edit', id]);
  }


  onDelete(claim: any) {
    const dialogRef = this.dialog.open(DialogClaimsComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: false,
      data: { id: claim.id,
        serialNumber: claim.serialNumber
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.isLoading = true;
      this.ClaimsService.deleteClaims(claim.id).subscribe({
        next: () => {
          this.LoadData();
          this.isLoading = true;
          this.router.navigate(['/claims-list']);
          this.toastr.success('ลบการเคลมสำเร็จ', 'สำเร็จ');
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error('เกิดข้อผิดพลาดในการลบการเคลม', 'ผิดพลาด');
          console.error('Error deleting claim:', error);
        }
        });
      }
    });
  }
}
