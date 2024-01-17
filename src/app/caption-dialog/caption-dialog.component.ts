import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-caption-dialog',
  templateUrl: './caption-dialog.component.html',
  styleUrls: ['./caption-dialog.component.css']
})
export class CaptionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CaptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { caption: string }
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
