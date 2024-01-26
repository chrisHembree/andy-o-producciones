import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref, set } from 'firebase/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase,
    public storage: AngularFireStorage,) {}

  getcontactinfo(): any {
    return this.db.object('/contactinfo').valueChanges();
  }

  updatecontactinfo(contactinfo: any): Promise<void> {
    return this.db.object('/contactinfo').update(contactinfo);
  }

  writeCaption(imageId: string, caption: string): Promise<void> {
    const db = getDatabase();
    return set(ref(db, `captions/${imageId}`), { caption });
  }

  getCinematografiaData() {
    return this.storage.ref('pictures/cinematografia').listAll().pipe(
      catchError(error => {
        console.error('Error fetching cinematografia data:', error);
        return [];
      }),
      // Map the items to their download URLs
      map(result => result.items.map(item => item.getDownloadURL()))
    );
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }



}
