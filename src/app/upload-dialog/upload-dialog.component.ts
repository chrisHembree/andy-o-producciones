// upload-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
})
export class UploadDialogComponent {
  selectedFile: File | null = null;
  caption: string = '';

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.selectedFile) {
      // You can handle the file and caption here
      // For example, you can upload the file to a server and save the caption
      console.log('File:', this.selectedFile);
      console.log('Caption:', this.caption);
      // Close the dialog
      this.dialogRef.close();
    } else {
      // Handle the case where no file is selected
      console.error('No file selected.');
    }
  }

  handleFileInput(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }
}
