import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaptionDialogComponent } from '../caption-dialog/caption-dialog.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(
    private dialog: MatDialog,
    private storage: AngularFireStorage,
    private firebaseService: FirebaseService
  ) {}

  imageArray: { url: string, caption: string }[] = [];

  selectImage() {
    document.getElementById('img').click();
  }

  onSelect(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event: any) => {
        // Create a unique ID for the image (you can use your own logic)
        const imageId = this.generateUniqueId();

        // Upload the image to Firebase Storage
        this.uploadImage(file, imageId)
          .then((downloadUrl: string) => {
            // Add the image and its download URL to the array
            this.imageArray.push({ url: downloadUrl, caption: '' });

            // Save the caption in Firebase Realtime Database
            this.firebaseService.writeCaption(imageId, '');
          })
          .catch(error => console.error('Error uploading image', error));
      };
    }
  }

  private uploadImage(file: File, imageId: string): Promise<string> {
    const storageRef = this.storage.ref(`pictures/cinematografia/${imageId}`);
    const uploadTask = storageRef.put(file);

    return new Promise((resolve, reject) => {
      uploadTask.snapshotChanges().toPromise()
        .then(() => storageRef.getDownloadURL().toPromise())
        .then(downloadUrl => resolve(downloadUrl))
        .catch(error => reject(error));
    });
  }

  // Other methods (selectImage, deleteImage, saveCaption, openCaptionDialog) remain the same

  private generateUniqueId(): string {
    // Implement your own logic to generate a unique ID
    return Math.random().toString(36).substr(2, 9);
  }
}





