import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { AccomodationListComponent } from './accomodation-list/accomodation-list.component';
import { AccomodationDetailComponent } from './accomodation-detail/accomodation-detail.component';

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
import { MatChipsModule } from '@angular/material/chips';
import { MyaccomodationsComponent } from './myaccomodations/myaccomodations.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MainComponent, FooterComponent, NavigationComponent, LoginComponent, SignupComponent,
  AboutComponent, AccomodationListComponent, AccomodationDetailComponent, MyaccomodationsComponent, 
  MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
  MatInputModule, MatSelectModule, MatSnackBarModule, MatChipsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'szallasfoglaloprojekt-webkert';
}
