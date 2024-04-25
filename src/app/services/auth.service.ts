import { Injectable, signal } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut, user } from "@angular/fire/auth";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { Observable, catchError, from, throwError } from "rxjs";
import { UserInterface } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$ = user(this.firebaseAuth)
    currentUserSig = signal<UserInterface | null | undefined>(undefined)

    constructor(private firebaseAuth: Auth) {}
      
    register(email: string, username: string, password: string): Observable<void> {
      const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
        .then(response => {
          return updateProfile(response.user, { displayName: username });
        })
        .catch(error => {
          throw error;
        });
  
      return from(promise).pipe(
        catchError(error => {
          return throwError(() => new Error("Failed to register. Please try again."));
        })
      );
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
        return from(promise);
    }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        return from(promise);
      }
}