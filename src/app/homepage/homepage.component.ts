import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import { Entry } from '../entry.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private UploadService: UploadService) {}

  entry: Entry = new Entry(null /* provide a File */, 'Optional Caption');

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      this.entry.image = fileList[0];
    }
  }

  submitForm() {
    // Handle form submission here, you can send the entry to a service or perform other actions.
    console.log('Submitted Entry:', this.entry);


    this.entry = new Entry(null, '');
  }



}
