import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaptionDialogComponent } from '../caption-dialog/caption-dialog.component';
import { FirebaseService } from '../firebase.service';
import { getStorage, deleteObject, ref, StorageReference } from "firebase/storage";
import {  ref as dbRef,} from 'firebase/database';

interface ImageItem {
  url: string;
  caption: string;
  id: number;
  captionText?: string;
}

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

  imageArray: { url: string, caption: string, id: number }[] = [];
  captions: { captionId: string, caption: string }[] = [];
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.firebaseService.getCinematografiaData().subscribe(
      (imageIds: string[]) => {
        const promises = imageIds.map(async (imageId) => {
          const downloadUrl = await this.firebaseService.getImageDownloadURL(imageId);
          const numericId = +imageId;
          const caption = await this.firebaseService.getCaptionByImageId(imageId);
          this.imageArray.push({ url: downloadUrl, caption: '', id: numericId, captionText: caption } as ImageItem);
        });

        Promise.all(promises).then(() => {
          this.imageArray.sort((a, b) => a.id - b.id);
          this.loadCaptionsData();
        });
      },
      error => console.error('Error loading cinematografia data:', error)
    );
  }


  selectImage() {
    document.getElementById('img').click();
  }

  onSelect(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.uploadImage(file)
        .then(imageId => {
          if (this.imageArray.length > 0) {
            this.imageArray.push({ url: '', caption: '', id: 0 });
            this.firebaseService.writeCaption(imageId.toString(), '');
          }
        })
        .catch(error => console.error('Error uploading image', error));
    }
  }


  private uploadImage(file: File): Promise<number> {
    return this.firebaseService.uploadImage('cinematografia', file);
  }


  openCaptionDialog(index: number): void {
    this.firebaseService.generateUniqueId().then(captionId => {
      const dialogRef = this.dialog.open(CaptionDialogComponent, {
        width: '400px',
        data: { caption: this.imageArray[index].caption }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.imageArray[index].caption = result;

          // Use the sequential captionId for the caption
          const captionsPath = `captions/${captionId}`;
          this.firebaseService.writeCaption(captionsPath, result);
        }
      });
    });
  }

  deleteTheImage(url) {
    const index = this.imageArray.findIndex(item => item.url === url);

    if (index !== -1) {
      const captionId = this.captions[index]?.captionId;

      this.firebaseService.deleteImage(url).then(() => {
        if (captionId) {
          this.firebaseService.deleteCaption(captionId).subscribe(
            () => {

              this.imageArray.splice(index, 1);
              this.captions.splice(index, 1);
            },
            error => console.error('Error deleting caption:', error)
          );
        }
      }).catch(error => console.error('Error deleting image:', error));
    }
  }

  private loadCaptionsData() {
    this.firebaseService.getCaptions().subscribe(
      (captionsData: { captionId: string, caption: string }[]) => {
        this.captions = captionsData;
      },
      error => console.error('Error loading captions data:', error)
    );
  }

  // onLoggedIn(isLoggedIn: boolean) {
  //   this.isLoggedIn = isLoggedIn;
  // }





  }

