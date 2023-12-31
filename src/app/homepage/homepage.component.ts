import { Component } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  imageUrl: string | ArrayBuffer = ''; // Variable to store the image URL

  constructor(private uploadService: UploadService) {}

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];

      // Display the selected image on the screen
      this.previewImage(file);

      // Upload the file using the UploadService
      this.uploadService.uploadFile(file).subscribe(
        (response) => {
          // Assuming your service returns the URL of the uploaded image
          this.imageUrl = response.imageUrl;
          console.log('File uploaded successfully. Image URL:', this.imageUrl);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }

  // Function to display the selected image on the screen
  private previewImage(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
