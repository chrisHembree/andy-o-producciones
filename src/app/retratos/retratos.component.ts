import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaptionDialogComponent } from '../caption-dialog/caption-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-retratos',
  templateUrl: './retratos.component.html',
  styleUrls: ['./retratos.component.css']
})
export class RetratosComponent {

  constructor(private dialog: MatDialog) {}

  imageArray: { url: string, caption: string }[] = [];

  url = "https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg";


  onSelect(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageArray.push({ url: event.target.result, caption: '' });
      };
    }
  }

  selectImage() {

    document.getElementById('img').click();
  }

  deleteImage(index: number) {

    this.imageArray.splice(index, 1);
  }

  saveCaption(index: number) {


    console.log(`Caption saved: ${this.imageArray[index].caption}`);


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







