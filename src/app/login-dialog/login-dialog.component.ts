import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  email: string = '';
  password: string = '';

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) {}

  onSubmit(): void {
    // Handle login logic here (validate email and password)
    // For simplicity, let's just close the dialog for now
    this.dialogRef.close();
  }
}
