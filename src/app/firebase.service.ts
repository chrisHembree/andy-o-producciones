import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { set } from 'firebase/database';
import {  ref as dbRef,} from 'firebase/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(public storage: AngularFireStorage,
    private db: AngularFireDatabase,) {}

  getCinematografiaData(): Observable<string[]> {
    const listRef = ref(this.storage.storage, 'pictures/cinematografia');

    return new Observable<string[]>(observer => {
      listAll(listRef)
        .then(res => {
          const imageIds = res.items.map(item => item.name);
          observer.next(imageIds);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching cinematografia data:', error);
          observer.error(error);
        });
    });
  }

  getImageDownloadURL(imageId: string) {
    const storageReference = ref(this.storage.storage, `pictures/cinematografia/${imageId}`);
    return getDownloadURL(storageReference);
  }

  writeCaption(imageId: string, caption: string): Promise<void> {
    const db = getDatabase();
    const captionsRef = dbRef(db, `captions/${imageId}`);

    return set(captionsRef, { caption });
  }

  deleteImage(folder: string, imageId: string): void {
    const storageRef = this.storage.ref(`pictures/${folder}/${imageId}`);
    storageRef.delete().toPromise().catch(error => console.error('Error deleting image', error));
  }

  deleteCaption(imageId: string): void {
    const captionsRef = ref(this.db, `captions/${imageId}`);
    set(captionsRef, null).catch(error => console.error('Error deleting caption', error));
  }


  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  uploadImage(folder: string, file: File): Promise<string> {
    const imageId = this.generateUniqueId();
    const storageRef = ref(this.storage.storage, `pictures/${folder}/${imageId}`);

    return uploadBytes(storageRef, file).then(() => {
      return imageId;
    });
  }

  getcontactinfo(): any {
    return this.db.object('/contactinfo').valueChanges();
  }

  updatecontactinfo(contactinfo: any): Promise<void> {
    return this.db.object('/contactinfo').update(contactinfo);
  }



}
