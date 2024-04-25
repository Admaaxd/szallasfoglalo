import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

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
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-accomodation-list',
  standalone: true,
  imports: [NgFor, RouterLink, 
    MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatSnackBarModule],
  templateUrl: './accomodation-list.component.html',
  styleUrl: './accomodation-list.component.css'
})
export class AccomodationListComponent implements OnInit{
  accommodations: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadAccommodations();
  }

  loadAccommodations(): void {
    const accommodationsData = [
      { id: 1, name: 'Mediterranean Seafront Villa', location: 'Santorini, Greece', price: 550, imageUrl: 'image1.png' },
      { id: 2, name: 'Seaside Bungalow', location: 'Phuket, Thailand', price: 200, imageUrl: 'image2.png' },
      { id: 3, name: 'Sakura Blossom Inn', location: 'Kyoto, Japan', price: 300, imageUrl: 'image3.png' },
      { id: 4, name: "The Artist's Loft", location: 'Paris, France', price: 275, imageUrl: 'image4.png' },
      { id: 5, name: 'Radisson', location: 'Aspen, Colorado, USA', price: 450, imageUrl: 'image5.png' },
      { id: 6, name: 'Arctic Adventure Lodge', location: 'Tromsø, Norway', price: 470, imageUrl: 'image6.png' },
      { id: 7, name: 'The Royal Rajputana', location: 'Jaipur, Rajasthan, India', price: 430, imageUrl: 'image7.png' },
      { id: 8, name: 'Coastal View Retreat', location: 'Malibu, California, USA', price: 350, imageUrl: 'image8.png' },
      { id: 9, name: 'Countryside Villa', location: 'Tuscany, Italy', price: 500, imageUrl: 'image9.png' },
    ];

    const storage = getStorage();
  const tempAccommodations: any[] = [];
  let fetchCount = 0;

  accommodationsData.forEach((accommodation, index) => {
    const imgRef = ref(storage, `gs://szallasfoglaloprojekt-bae85.appspot.com/${accommodation.imageUrl}`);
    getDownloadURL(imgRef)
      .then((url) => {
        tempAccommodations[index] = { ...accommodation, imageUrl: url };
        fetchCount++;
        if (fetchCount === accommodationsData.length) {
          this.accommodations = tempAccommodations;
        }
      })
      .catch((error) => {
        console.log(error);
        fetchCount++;
        if (fetchCount === accommodationsData.length) {
          this.accommodations = tempAccommodations;
        }
      });
  });
 }
}