import { Component } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private UploadService: UploadService) {}

  openUploadDialog(): void {
    this.UploadService.openUploadDialog();
  }

}
