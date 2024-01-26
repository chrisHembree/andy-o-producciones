import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaptionDialogComponent } from '../caption-dialog/caption-dialog.component';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private firebaseService: FirebaseService
  ) {}

  imageArray: { url: string, caption: string }[] = [];

  ngOnInit() {
    this.loadCinematografiaImages();
  }

  selectImage() {
    document.getElementById('img').click();
  }

  onSelect(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event: any) => {

        const imageId = this.firebaseService.generateUniqueId();


        this.uploadImage(file, imageId)
          .then((downloadUrl: string) => {

            this.imageArray.push({ url: downloadUrl, caption: '' });


            this.firebaseService.writeCaption(imageId, '');
          })
          .catch(error => console.error('Error uploading image', error));
      };
    }
  }

  private loadCinematografiaImages() {
    this.firebaseService.getCinematografiaData().subscribe((imageUrls: string[]) => {
      this.imageArray = imageUrls.map(url => ({ url, caption: '' }));
    });
  }

  private uploadImage(file: File, imageId: string): Promise<string> {
    const storageRef = this.firebaseService.storage.ref(`pictures/cinematografia/${imageId}`);
    const uploadTask = storageRef.put(file);

    return new Promise((resolve, reject) => {
      uploadTask.snapshotChanges().toPromise()
        .then(() => storageRef.getDownloadURL().toPromise())
        .then(downloadUrl => resolve(downloadUrl))
        .catch(error => reject(error));
    });
  }

  openCaptionDialog(index: number): void {
    const dialogRef = this.dialog.open(CaptionDialogComponent, {
      width: '400px',
      data: { caption: this.imageArray[index].caption }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.imageArray[index].caption = result;
      }
    });
  }







  }










