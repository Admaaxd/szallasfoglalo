import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccomodationDetailComponent } from './accomodation-detail/accomodation-detail.component';
import { AccomodationListComponent } from './accomodation-list/accomodation-list.component';
import { AboutComponent } from './about/about.component';
import { MyaccomodationsComponent } from './myaccomodations/myaccomodations.component';
import { AuthGuard } from './AuthGuard/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: MainComponent },
    { path: 'accommodationDetail/:id', component: AccomodationDetailComponent, canActivate: [AuthGuard] },
    { path: 'accommodationList', component: AccomodationListComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'myaccomodations', component: MyaccomodationsComponent, canActivate: [AuthGuard] }
];