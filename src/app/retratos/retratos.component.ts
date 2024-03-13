import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaptionDialogComponent } from '../caption-dialog/caption-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FirebaseService } from '../firebase.service';

interface RetratosItem {
  url: string;
  retratosCaption: string;
  id: number;
  retratosCaptionText?: string;
}


@Component({
  selector: 'app-retratos',
  templateUrl: './retratos.component.html',
  styleUrls: ['./retratos.component.css']
})
export class RetratosComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private firebaseService: FirebaseService
  ) {}

  retratosImageArray: { url: string; caption: string; id: number }[] = [];
  retratosCaptions: { captionId: string; caption: string }[] = [];

  ngOnInit() {
    this.loadRetratosData();
    this.loadRetratosCaptionsData();
  }

  selectImage() {
    document.getElementById('img').click();
  }

  onSelect(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.uploadImage(file)
        .then(imageId => {
          if (this.retratosImageArray.length > 0) {
            this.retratosImageArray.push({ url: '', caption: '', id: 0 });
            this.firebaseService.writeCaption(imageId.toString(), '');
          }
        })
        .catch(error => console.error('Error uploading image', error));
    }
  }

  private uploadImage(file: File): Promise<number> {
    return this.firebaseService.uploadImage('retratos', file);
  }

  private loadRetratosData() {
    this.firebaseService.getRetratosData().subscribe(
      (imageIds: string[]) => {
        const promises = imageIds.map(async (imageId) => {
          const downloadUrl = await this.firebaseService.getImageDownloadURL(imageId);
          const numericId = +imageId;

          // Create a mapping between image ID and caption
          const caption = await this.firebaseService.getCaptionByImageId(imageId);

          // Explicitly specify the properties to resolve TypeScript error
          this.retratosImageArray.push({ url: downloadUrl, caption: '', id: numericId, captionText: caption } as ImageItem);
        });

        // Wait for all promises to resolve before sorting
        Promise.all(promises).then(() => {
          // Sort the imageArray based on the IDs
          this.retratosImageArray.sort((a, b) => a.id - b.id);
        });
      },
      error => console.error('Error loading retratos data:', error)
    );
  }

  openCaptionDialog(index: number): void {
    const captionId = this.firebaseService.generateUniqueId();

    const dialogRef = this.dialog.open(CaptionDialogComponent, {
      width: '400px',
      data: { caption: this.retratosImageArray[index].caption }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.retratosImageArray[index].caption = result;

        // Use the sequential captionId for the caption
        const captionsPath = `retratoscaptions/${captionId}`;
        this.firebaseService.writeCaption(captionsPath, result);
      }
    });
  }

  deleteTheImage(url) {
    // Implement as needed
  }

  private loadRetratosCaptionsData() {
    this.firebaseService.getRetratosCaptions().subscribe(
      (captionsData: { captionId: string; caption: string }[]) => {
        this.captions = captionsData;
      },
      error => console.error('Error loading retratos captions data:', error)
    );
  }
}



