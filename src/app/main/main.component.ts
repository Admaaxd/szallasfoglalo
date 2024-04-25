import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
import { LoginComponent } from "../login/login.component";
import { HighlightPipe } from "../pipes/highlight.pipe";
import { CustomDatePipe } from '../pipes/custom-date.pipe';
import { StatsService } from '../stats/stats.service';
import { NgFor, NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from '../services/message.service';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [RouterLink, RouterLinkActive,
        MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
        MatInputModule, MatSelectModule, MatSnackBarModule, LoginComponent, HighlightPipe, CustomDatePipe , NgFor, NgIf]
})
export class MainComponent implements OnInit{
    recentlyJoinedUsers: any[] = [];
    backgroundUrl: string = '';

    constructor(private statsService: StatsService, private messageService: MessageService, private snackBar: MatSnackBar ) {}
  
    ngOnInit() {
      this.statsService.getRecentlyJoinedUsers().subscribe({
        next: users => {
          this.recentlyJoinedUsers = users;
        },
        error: error => console.error('Error fetching recently joined users:', error)
      });

      this.messageService.currentMessage.subscribe(message => {
        if (message) {
          this.snackBar.open(message, 'OK', {
            duration: 5000,
          });
          this.messageService.clearMessage();
        }
      });
      this.loadBackgroundImage();
    }

    loadBackgroundImage(): void {
      const storage = getStorage();
      const bgRef = ref(storage, 'gs://szallasfoglaloprojekt-bae85.appspot.com/bg.png');
      getDownloadURL(bgRef)
        .then((url) => {
          this.backgroundUrl = url;
        })
        .catch((error) => console.error('Failed to load background image:', error));
    }
  
}