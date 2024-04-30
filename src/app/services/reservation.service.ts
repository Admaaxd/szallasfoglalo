import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationsSource = new BehaviorSubject<any[]>([]);
  reservations$ = this.reservationsSource.asObservable();

  constructor() { }

  addReservation(reservation: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const currentReservations = this.reservationsSource.value;
        this.reservationsSource.next([...currentReservations, reservation]);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  getReservations() {
    return this.reservations$;
  }

  removeReservation(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const updatedReservations = this.reservationsSource.value.filter(reservation => reservation.id !== id);
        this.reservationsSource.next(updatedReservations);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  
  updateReservation(id: number, startDate: Date, endDate: Date): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const reservations = this.reservationsSource.value;
        const index = reservations.findIndex(reservation => reservation.id === id);
        if (index !== -1) {
          const updatedReservation = { ...reservations[index], startDate, endDate };
          reservations[index] = updatedReservation;
          this.reservationsSource.next([...reservations]);
          resolve();
        } else {
          throw new Error("Reservation not found");
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}