import { Component } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-retratos',
  templateUrl: './retratos.component.html',
  styleUrl: './retratos.component.css'
})
export class RetratosComponent {

  constructor(private UploadService: UploadService) {}

  imageUrl: string | ArrayBuffer = '';

    onFileChange(event: any) {
      const fileList: FileList = event.target.files;

      if (fileList.length > 0) {
        const file: File = fileList[0];


        this.previewImage(file);


        this.UploadService.uploadFile(file).subscribe(
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

