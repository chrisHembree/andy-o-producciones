import { Component } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-retratos',
  templateUrl: './retratos.component.html',
  styleUrls: ['./retratos.component.css']
})
export class RetratosComponent {

  imageArray: string[] = [];

  url = "https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg";

  onSelect(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageArray.push(event.target.result);
      };
    }
  }

  selectImage() {
    // Trigger the file input
    document.getElementById('img').click();
  }

  deleteImage(index: number) {
    // Remove the image at the specified index from the array
    this.imageArray.splice(index, 1);
  }


}
