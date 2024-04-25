import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccomodationListComponent } from '../accomodation-list/accomodation-list.component';

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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Accommodation } from '../interfaces/accomodation.interface';

@Component({
  selector: 'app-accomodation-detail',
  standalone: true,
  imports: [AccomodationListComponent, AccomodationDetailComponent, RouterLink,
    MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, FormsModule, 
    ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './accomodation-detail.component.html',
  styleUrl: './accomodation-detail.component.css'
})
export class AccomodationDetailComponent implements OnInit {
  reservationForm = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  accommodations: Accommodation[] = [
    {
      id: 1,
      name: 'Mediterranean Seafront Villa',
      location: 'Santorini, Greece',
      price: 550,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/szallasfoglaloprojekt-bae85.appspot.com/o/image1.png?alt=media',
      description: 'Overlooking the azure waters of the Aegean Sea, our Mediterranean Seafront Villa offers a luxury stay in the iconic setting of Santorini. Enjoy private balconies, sun-drenched terraces, and direct access to secluded beaches.'
    },
    {
      id: 2,
      name: 'Seaside Bungalow',
      location: 'Phuket, Thailand',
      price: 200,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/szallasfoglaloprojekt-bae85.appspot.com/o/image2.png?alt=media',
      description: 'Our Seaside Bungalow offers an idyllic beachfront location with stunning sunsets and crystal-clear waters. Enjoy the tropical climate, Thai cuisine, and a laid-back atmosphere for a truly relaxing holiday.'
    },
    {
      id: 3,
      name: 'Sakura Blossom Inn',
      location: 'Kyoto, Japan',
      price: 300,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/szallasfoglaloprojekt-bae85.appspot.com/o/image3.png?alt=media',
      description: ' Immerse yourself in Japanese culture at Sakura Blossom Inn. Located near historic temples and surrounded by cherry blossom trees, our inn provides a peaceful and picturesque setting for your stay in Kyoto.'
    },
    {
      id: 4,
      name: "The Artist's Loft",
      location: 'Paris, France',
      price: 275,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/szallasfoglaloprojekt-bae85.appspot.com/o/image4.png?alt=media',
      description: "Stay in a vibrant, artistically inspired loft in the Montmartre district. With its eclectic decor and proximity to galleries and cafes, The Artist's Loft is a creative's dream and a haven for those who seek inspiration."
    },
    {
      id: 5,
      name: 'Radisson',
      location: 'Aspen, Colorado, USA',
      price: 450,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/szallasfoglaloprojekt-bae85.appspot.com/o/image5.png?alt=media',
      description: 'Alpine Lodge offers a luxurious stay in the Rocky Mountains, with direct access to ski slopes and hiking trails. After a day of outdoor activities, relax by the fireplace or in the outdoor hot tub.'
    },
    {
      id: 6,
      name: 'Arctic Adventure Lodge',
      location: 'Tromsø, Norway',
      price: 470,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/szallasfoglaloprojekt-bae85.appspot.com/o/image6.png?alt=media',
      description: 'Positioned in the Arctic Circle, the Arctic Adventure Lodge is your gateway to the ultimate polar experience. From dog sledding and ice fishing to witnessing the majestic aurora borealis, our lodge offers an array of Arctic adventures.'
    },
    {
      id: 7,
      name: 'The Royal Rajputana',
      location: 'Jaipur, Rajasthan, India',
      price: 430,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/szallasfoglaloprojekt-bae85.appspot.com/o/image7.png?alt=media',
      description: 'Experience the grandeur of Indian royalty at The Royal Rajputana. This heritage hotel, set in a restored palace, offers a glimpse into the opulent lifestyle of the Maharajas, with traditional Rajasthani cuisine and cultural experiences.'
    },
    {
      id: 8,
      name: 'Coastal View Retreat',
      location: 'Malibu, California, USA',
      price: 350,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/szallasfoglaloprojekt-bae85.appspot.com/o/image8.png?alt=media',
      description: 'Enjoy breathtaking ocean views from every window at Coastal View Retreat. This luxurious property offers a tranquil getaway with a private beach, modern amenities, and elegantly designed interiors.'
    },
    {
      id: 9,
      name: 'Countryside Villa',
      location: 'Tuscany, Italy',
      price: 500,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/szallasfoglaloprojekt-bae85.appspot.com/o/image9.png?alt=media',
      description: "Experience the charm of Italian countryside in our exquisite villa. Surrounded by vineyards and olive groves, this spacious accommodation offers an authentic taste of Tuscany's serene lifestyle and culinary delights."
    },
  ];

  accommodation: any;

  constructor(private auth: Auth, private snackBar: MatSnackBar, private route: ActivatedRoute, private reservationService: ReservationService, private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.accommodation = this.accommodations.find(acc => acc.id === id);
  }

  bookNow(): void {
    if (this.auth.currentUser) {
      if (this.reservationForm.valid) {
        const bookingDetails = {
          ...this.accommodation,
          ...this.reservationForm.value,
        };
        this.reservationService.addReservation(bookingDetails);
        this.router.navigate(['/myaccomodations']);
      }
    } else {
      this.snackBar.open('You must be logged in to book an accommodation.', 'OK', {
        duration: 5000,
      });
    }
  }
}