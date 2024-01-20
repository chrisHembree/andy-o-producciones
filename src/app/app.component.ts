import { Component } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog,  } from '@angular/material/dialog';


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
      width: '400px',
    });
  }

  isUserAuthenticated(): boolean {
    // Implement logic to check if the user is authenticated
    // Return true if authenticated, false otherwise
    // You might use an authentication service for this check
    return true; // Replace with your actual authentication logic
  }


}
