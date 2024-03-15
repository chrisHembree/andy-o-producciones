import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { get, getDatabase, remove } from 'firebase/database';
import { set } from 'firebase/database';
import {  ref as dbRef, onValue} from 'firebase/database';
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



  getCaptions(): Observable<any[]> {
    const db = getDatabase();
    const captionsRef = dbRef(db, 'captions');

    return new Observable<any[]>(observer => {
      onValue(captionsRef, snapshot => {
        const captionsData = snapshot.val();
        const captionsArray = Object.keys(captionsData || {}).map(key => ({
          captionId: key,
          caption: captionsData[key].caption
        }));
        observer.next(captionsArray);
        observer.complete();
      });
    });
  }

  getCaptionByImageId(imageId: string): Promise<string> {
    const db = getDatabase();
    const captionsRef = dbRef(db, `captions/${imageId}`);

    return new Promise<string>((resolve, reject) => {
      onValue(captionsRef, snapshot => {
        const captionData = snapshot.val();
        if (captionData) {
          resolve(captionData.caption);
        } else {
          resolve('');
        }
      }, reject);
    });
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





  generateUniqueId(): Promise<number> {
    const db = getDatabase();
    const captionsRef = dbRef(db, 'captions');

    return get(captionsRef)
      .then(snapshot => {
        const existingCaptionCount = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
        const captionId = existingCaptionCount + 1;
        return captionId;
      });
  }

  uploadImage(folder: string, file: File): Promise<number> {
    const listRef = ref(this.storage.storage, `pictures/${folder}`);


    return listAll(listRef)
      .then(res => res.items.length)
      .then(existingImageCount => {
        const imageId = existingImageCount + 1;
        const storageRef = ref(this.storage.storage, `pictures/${folder}/${imageId}`);

        return uploadBytes(storageRef, file).then(() => imageId);
      });
  }

  getcontactinfo(): any {
    return this.db.object('/contactinfo').valueChanges();
  }

  updatecontactinfo(contactinfo: any): Promise<void> {
    return this.db.object('/contactinfo').update(contactinfo);
  }

//
//
//
//
//
// Retratos

getRetratosDownloadURL (imageId: string) {
  const storageReference = ref(this.storage.storage, `pictures/retratos/${imageId}`);
  return getDownloadURL(storageReference);
}

  getRetratosData(): Observable<string[]> {
    const listRef = ref(this.storage.storage, 'pictures/retratos');

    return new Observable<string[]>((observer) => {
      listAll(listRef)
        .then((res) => {
          const imageIds = res.items.map((item) => item.name);
          observer.next(imageIds);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error fetching retratos data:', error);
          observer.error(error);
        });
    });
  }

  getRetratosCaptions(): Observable<any[]> {
    const db = getDatabase();
    const captionsRef = dbRef(db, 'retratoscaptions');

    return new Observable<any[]>((observer) => {
      onValue(captionsRef, (snapshot) => {
        const captionsData = snapshot.val();
        const captionsArray = Object.keys(captionsData || {}).map((key) => ({
          captionId: key,
          caption: captionsData[key].caption
        }));
        observer.next(captionsArray);
        observer.complete();
      });
    });
  }

  writeRetratosCaption(captionsPath: string, caption: string): Promise<void> {
    const db = getDatabase();
    const captionsRef = dbRef(db, captionsPath);

    return set(captionsRef, { caption });
  }

  uploadRetratosImage(folder: string, file: File): Promise<number> {
    const listRef = ref(this.storage.storage, `pictures/${folder}`);

    return listAll(listRef)
      .then((res) => res.items.length)
      .then((existingImageCount) => {
        const imageId = existingImageCount + 1;
        const storageRef = ref(this.storage.storage, `pictures/${folder}/${imageId}`);

        return uploadBytes(storageRef, file).then(() => imageId);
      });
  }

//   generateRetratosUniqueId(): number {
//     this.lastRetratosCaptionId++;
//     return this.lastRetratosCaptionId;
//   }
// }


}
