// upload-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
})
export class UploadDialogComponent {
  videoUrl: string = '';
  caption: string = '';

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // Add your logic here to handle the submitted videoUrl and caption
    // For example, you can pass them to your service for further processing
    this.dialogRef.close({ videoUrl: this.videoUrl, caption: this.caption });
  }
}
