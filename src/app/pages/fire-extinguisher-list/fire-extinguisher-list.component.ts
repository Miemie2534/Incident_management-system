import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServicesService } from '../../fire-extinguisher/services.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Data } from '../../fireData/data';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DialogAnimationsComponent } from '../dialog-animations/dialog-animations.component';

@Component({
  selector: 'app-fire-extinguisher-list',
  templateUrl: './fire-extinguisher-list.component.html',
  styleUrls: ['./fire-extinguisher-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class FireExtinguisherListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'serialNumber',
    'type',
    'size',
    'location',
    'status',
    'createdDate',
    'actions'];

  dataSource: MatTableDataSource<Data>;
  isLoading = false;
  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ServicesService,
    private toastr: ToastrService,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Data>([]);
  }

  ngOnInit() {
    this.loadData();
    this.setupDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setupDataSource() {
    // Custom filter predicate
    this.dataSource.filterPredicate = (data: Data, filter: string) => {
      const searchText = filter.toLowerCase();
      return data.serialNumber.toLowerCase().includes(searchText) ||
            data.type.toLowerCase().includes(searchText) ||
            data.location.toLowerCase().includes(searchText) ||
            data.size.toLowerCase().includes(searchText) ||
            new Date(data.createdDate).toLocaleDateString().includes(searchText) ||
            data.status.toLowerCase().includes(searchText);
    };
  }

  loadData() {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.errorMessage = 'ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง';
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(element: Data) {
   const dialogRef = this.dialog.open(DialogAnimationsComponent, {
    width: '400px',
    disableClose: true,
    autoFocus: false,
    data: { serialNumber: element.serialNumber }
   });

   dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.isLoading = true;
      this.service.deleteFireExinguishers(element.id).subscribe({
        next: () => {
          this.toastr.success('ลบข้อมูลสำเร็จ', 'แจ้งเตือน');
          this.loadData();
        },
          error: (error) => {
            this.toastr.error('ไม่สามารถลบข้อมูลได้', 'ข้อผิดพลาด', error);
            this.isLoading = false;
          }
      });
    }
   });
  }
}
