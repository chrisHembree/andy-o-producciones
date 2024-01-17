import { Component } from '@angular/core';

@Component({
  selector: 'app-retratos',
  templateUrl: './retratos.component.html',
  styleUrls: ['./retratos.component.css']
})
export class RetratosComponent {

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
    // Save the caption for the image at the specified index
    console.log(`Caption saved: ${this.imageArray[index].caption}`);
    // You can implement further logic to persist the caption, e.g., through a service or Firebase.
  }
}
