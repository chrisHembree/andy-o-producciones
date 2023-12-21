import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private dialog: MatDialog) {}

  openUploadDialog(): void {
    this.dialog.open(UploadDialogComponent, {
      width: '400px',
      // Add any other MatDialogConfig options here
    });
  }
}




