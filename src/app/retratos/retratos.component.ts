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

  retratosImageArray: { url: string; retratosCaption: string; id: number }[] = [];
  retratosCaptions: { captionId: string; retratosCaption: string }[] = [];

  ngOnInit() {
    this.loadRetratosData();
    // this.loadRetratosCaptionsData();
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
            this.retratosImageArray.push({ url: '', retratosCaption: '', id: 0 });
            this.firebaseService.writeCaption(imageId.toString(), '');
          }
        })
        .catch(error => console.error('Error uploading image', error));
    }
  }

  private uploadImage(file: File): Promise<number> {
    return this.firebaseService.uploadRetratosImage('retratos', file);
  }

  private loadRetratosData() {
    this.firebaseService.getRetratosData().subscribe(
      (imageIds: string[]) => {
        const promises = imageIds.map(async (imageId) => {
          const downloadUrl = await this.firebaseService.getRetratosDownloadURL(imageId);
          const numericId = +imageId;


          const caption = await this.firebaseService.getCaptionByImageId(imageId);

          const retratosItem: RetratosItem = {
            url: downloadUrl,
            retratosCaption: '',
            id: numericId,
            retratosCaptionText: caption
          };

          this.retratosImageArray.push({ url: downloadUrl, retratosCaption: '', id: numericId, captionText: caption } as RetratosItem);
        });


        Promise.all(promises).then(() => {

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
      data: { caption: this.retratosImageArray[index].retratosCaption }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.retratosImageArray[index].retratosCaption = result;


        const captionsPath = `retratosCaptions/${captionId}`;
        this.firebaseService.writeCaption(captionsPath, result);
      }
    });
  }

  // deleteTheImage(url) {

  // }

  // private loadRetratosCaptionsData() {
  //   this.firebaseService.getRetratosCaptions().subscribe(
  //     (captionsData: { captionId: string; caption: string }[]) => {
  //       this.captions = captionsData;
  //     },
  //     error => console.error('Error loading retratos captions data:', error)
  //   );
  // }



}



