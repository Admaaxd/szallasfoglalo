import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { MessageService } from '../services/message.service';
import { SignupData } from '../interfaces/signup.interface';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatSnackBarModule,
    ReactiveFormsModule, HttpClientModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
    @Input()  redirectUrl: string = '/home';
    @Output() signupSuccess = new EventEmitter<boolean>();

    http = inject(HttpClient);

    constructor(
      private fb: FormBuilder, 
      private authService: AuthService,
      private router: Router, 
      private messageService: MessageService
    ) {}

    form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    errorMessage: string | null = null;

    onSubmit(): void {
      if(this.form.valid){
        const rawForm = this.form.getRawValue() as SignupData;
      this.authService
        .register(rawForm.email, rawForm.username, rawForm.password)
        .subscribe({ 
          next: () => {
            this.messageService.changeMessage('Successful signup!');
            this.router.navigateByUrl(this.redirectUrl);
            this.signupSuccess.emit(true);
          }, error: (err) => {
            if (err.error?.error?.message) {
              this.errorMessage = err.error.error.message;
              } else {
              this.errorMessage = 'Sign up failed. Please check your credentials and try again.';
              }
              this.signupSuccess.emit(false);
              }
        });
      } else {
        this.errorMessage = 'Please fill in all required fields correctly.';
      }
      
    }
}