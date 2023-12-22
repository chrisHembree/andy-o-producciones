import { Component } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-retratos',
  templateUrl: './retratos.component.html',
  styleUrl: './retratos.component.css'
})
export class RetratosComponent {

  constructor(private UploadService: UploadService) {}

  openUploadDialog(): void {
    this.UploadService.openUploadDialog();
  }

}
