import { Component, OnInit, OnDestroy ,inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit, OnDestroy{
  authService = inject(AuthService);
  router = inject(Router);
  private userSubscription: Subscription = new Subscription;
  
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
        });
      }else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      }
    })
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}