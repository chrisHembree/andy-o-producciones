import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref, set } from 'firebase/database';

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

  writeCaption(caption: string): Promise<void> {
    const db = getDatabase();
    return set(ref(db, 'captions/' + caption), {
      caption: caption
    });
  }
}
