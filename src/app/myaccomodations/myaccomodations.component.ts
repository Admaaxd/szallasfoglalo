import { Component, OnInit } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { ReservationService } from '../services/reservation.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-myaccomodations',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatSnackBarModule, NgFor, DatePipe, NgIf, FormsModule],
  templateUrl: './myaccomodations.component.html',
  styleUrl: './myaccomodations.component.css'
})
export class MyaccomodationsComponent implements OnInit{
  reservations: any[] = [];
  editingReservation: number | null = null;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  removeReservation(id: number): void {
    this.reservationService.removeReservation(id);
  }

  updateReservationDates(id: number): void {
    const reservation = this.reservations.find(res => res.id === id);
    if (reservation) {
      this.reservationService.updateReservation(id, reservation.startDate, reservation.endDate);
      this.editingReservation = null;
      reservation.editing = false;
    }
  }

  toggleEdit(reservation: any): void {
    reservation.editing = !reservation.editing;
  }
}