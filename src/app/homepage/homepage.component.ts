import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaptionDialogComponent } from '../caption-dialog/caption-dialog.component';
import { FirebaseService } from '../firebase.service';
import { getStorage, deleteObject, ref, StorageReference } from "firebase/storage";
import {  ref as dbRef,} from 'firebase/database';


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
    this.loadCinematografiaData();
  }

  selectImage() {
    document.getElementById('img').click();
  }

  onSelect(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.uploadImage(file)
        .then(imageId => {
          this.imageArray.push({ url: '', caption: '' });
          this.firebaseService.writeCaption(imageId,'');
        })
        .catch(error => console.error('Error uploading image', error));
    }
  }

  private uploadImage(file: File): Promise<string> {
    return this.firebaseService.uploadImage('cinematografia', file);
  }

  private loadCinematografiaData() {
    this.firebaseService.getCinematografiaData().subscribe(
      (imageIds: string[]) => {
        imageIds.forEach(imageId => {
          this.firebaseService.getImageDownloadURL(imageId).then(downloadUrl => {
            this.imageArray.push({ url: downloadUrl, caption: '' });
          });
        });
      },
      error => console.error('Error loading cinematografia data:', error)
    );
  }

  openCaptionDialog(index: number): void {
    const captionId = dbRef(db, `captions/${captionId}`);

    const dialogRef = this.dialog.open(CaptionDialogComponent, {
      width: '400px',
      data: { caption: this.imageArray[index].caption }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.imageArray[index].caption = result;

        this.firebaseService.writeCaption(captionId, result);
      }
    });
  }

  deleteTheImage(url) {
    this.firebaseService.deleteImage(url)

  }

  }

