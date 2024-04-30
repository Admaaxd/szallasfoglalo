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
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
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
  tempDates: { [key: number]: { startDate: Date, endDate: Date } } = {};

  constructor(private reservationService: ReservationService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  removeReservation(id: number): void {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      this.reservationService.removeReservation(id);
      this.reservations = this.reservations.filter(reservation => reservation.id !== id);
      this.snackBar.open('Reservation removed successfully.', 'OK', { duration: 3000 });
    }
  }

  validateDates(startDate: Date, endDate: Date): boolean {
    if (new Date(startDate) > new Date(endDate)) {
      this.snackBar.open('Start date must be earlier than end date.', 'OK', { duration: 3000 });
      return false;
    }
    return true;
  }

  updateReservationDates(id: number): void {
    const dates = this.tempDates[id];
    if (this.validateDates(dates.startDate, dates.endDate)) {
      const index = this.reservations.findIndex(res => res.id === id);
      if (index !== -1) {
        this.reservations[index].startDate = dates.startDate;
        this.reservations[index].endDate = dates.endDate;
        this.reservationService.updateReservation(id, dates.startDate, dates.endDate);
        this.reservations = [...this.reservations];
        this.reservations[index].editing = false;
        this.editingReservation = null;
      }
    }
  }

  toggleEdit(reservation: any): void {
    if (!reservation.editing) {
      this.tempDates[reservation.id] = {
        startDate: new Date(reservation.startDate),
        endDate: new Date(reservation.endDate)
      };
    }
    reservation.editing = !reservation.editing;
    this.editingReservation = reservation.editing ? reservation.id : null;
  }
}