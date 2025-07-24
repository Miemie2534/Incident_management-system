import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { ServicesService } from '../../fire-extinguisher/services.service';
import { ClaimsService } from '../../services/claims.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  recentIncidents: any[] = [];
  totalFireExtinguishers = 0;
  activeFireExtinguishers = 0;
  inRepairFireExtinguishers = 0;
  claimedFireExtinguishers = 0;
  totalClaims = 0;
  pendingClaims = 0;
  incident = 0;
  totalIncident = 0;
  totalIncidentToday = 0;
  totalIncidentThisMonth = 0;
  incidentsCount = 0;
  totalPatient = 0;
  pendingPatient = 0;

  isLoading = true;


  constructor(
    private fireService: ServicesService,
    private claimsService: ClaimsService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.fireService.getAll().subscribe({
      next: (data) => {
        this.totalFireExtinguishers = data.length;
        this.activeFireExtinguishers = data.filter(item => item.status === 'พร้อมใช้งาน').length;
        this.claimedFireExtinguishers = data.filter(item => item.status === 'เคลม').length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('ไม่สามารถโหลดข้อมูลถังดับเพลิงได้', error);
        this.isLoading = false;
      }
    });

    this.claimsService.getClaims().subscribe({
      next: (claims) => {
        this.totalClaims = claims.length;
        this.pendingClaims = claims.filter(claim => !claim.actionTaken).length;
      },
      error: (error) => {
        console.error('ไม่สามารถโหลดข้อมูลการเคลมได้', error);
      }
    });
  }



  getAvailabilityPercentage(): number {
    if (this.totalFireExtinguishers === 0) return 0;
    return (this.activeFireExtinguishers / this.totalFireExtinguishers) * 100;
  }
}

