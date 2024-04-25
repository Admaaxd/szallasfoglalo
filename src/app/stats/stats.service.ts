import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, orderBy, limit, getDocs } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StatsService {

  constructor(private afs: Firestore) { }

  getRecentlyJoinedUsers(): Observable<any[]> {
    const usersRef = collection(this.afs, 'users');
    const q = query(usersRef,
                    orderBy('joinDate', 'desc'),
                    limit(3));
    return from(getDocs(q)).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
    );
  }
}
