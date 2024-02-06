import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { getDatabase, remove } from 'firebase/database';
import { set } from 'firebase/database';
import {  ref as dbRef,} from 'firebase/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getStorage, deleteObject } from "firebase/storage";

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

  writeCaption(captionsPath: string, caption: string): Promise<void> {
    const db = getDatabase();
    const captionsRef = dbRef(db, captionsPath);

    return set(captionsRef, { caption });
  }


  deleteImage(path: string): Promise<void> {
    const storageRef = this.storage.refFromURL(path);
    return storageRef.delete().toPromise();
  }

  deleteCaption(captionId: string): Observable<void> {
    const db = getDatabase();
    const captionsRef = dbRef(db, `captions/${captionId}`);
    return from(remove(captionsRef));
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
