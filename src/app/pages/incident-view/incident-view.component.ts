import { Incident } from './../../fireData/incident';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IncidentsService } from '../../services/incidents.service';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-incident-view',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './incident-view.component.html',
  styleUrl: './incident-view.component.css'
})
export class IncidentViewComponent {
  Incident: Incident [] = []
  constructor(
    private incidentservice: IncidentsService,
    private route: Router
  ) {
    this.initForm();
  }


  initForm() {
    this.incidentservice.getAllIncident().subscribe({
      next: (data) => {
        console.log('แสดงข้อมูล:', data);
        this.Incident = data;
      }
    })
  }
}
