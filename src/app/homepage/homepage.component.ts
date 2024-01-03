import { Component } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  imageUrl: string | ArrayBuffer = '';

  constructor(private uploadService: UploadService) {}

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];


      this.previewImage(file);


      this.uploadService.uploadFile(file).subscribe(
        (response) => {

          this.imageUrl = response.imageUrl;
          console.log('File uploaded successfully. Image URL:', this.imageUrl);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }


  private previewImage(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
