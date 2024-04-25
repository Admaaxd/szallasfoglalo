import { Injectable, inject, signal } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut, user } from "@angular/fire/auth";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "../interfaces/user.interface";
import { Firestore, addDoc, collection, doc, setDoc } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$ = user(this.firebaseAuth)
    currentUserSig = signal<UserInterface | null | undefined>(undefined)

    private firestore: Firestore;

    constructor(private firebaseAuth: Auth, firestore: Firestore) {
        this.firestore = firestore;
      }
      
    register(email: string, username: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
          .then(response => {
            updateProfile(response.user, {displayName: username});
            const userDocRef = doc(this.firestore, `users/${response.user.uid}`);
            return setDoc(userDocRef, {
              username: username,
              email: email,
              joinDate: new Date()
            });
          });
    
        return from(promise);
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