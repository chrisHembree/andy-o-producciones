import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}










  getContactData(): any {
    return this.db.object('/contactData').valueChanges();
  }

  updateContactData(contactData: any): Promise<void> {
    return this.db.object('/contactData').update(contactData);
  }
}
