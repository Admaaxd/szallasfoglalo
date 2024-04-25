import { Component, inject, EventEmitter, Output, Input } from '@angular/core';

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
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { MessageService } from '../services/message.service';
import { LoginData } from '../interfaces/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,
    MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatSnackBarModule, HttpClientModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() redirectUrl: string = '/home';
  @Output() loginSuccess = new EventEmitter<boolean>();

  http = inject(HttpClient);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue() as LoginData;
      this.authService.login(rawForm.email, rawForm.password).subscribe({
        next: () => {
          this.messageService.changeMessage('Successful login!');
          this.router.navigateByUrl(this.redirectUrl);
          this.loginSuccess.emit(true);
        },
        error: (err) => {
          if (err.error?.error?.message) {
            this.errorMessage = err.error.error.message;
            } else {
            this.errorMessage = 'Login failed. Please check your credentials and try again.';
            }
            this.loginSuccess.emit(false);
            }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}