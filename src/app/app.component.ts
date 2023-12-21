import { Component } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog,  } from '@angular/material/dialog';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'andy-o-producciones';

  constructor(private dialog: MatDialog) {}

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '400px', // adjust the width as needed
    });


  }

}
