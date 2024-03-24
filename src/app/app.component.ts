import { Component } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog,  } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from './firebaseauth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'andy-o-producciones';

  isAdminLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdminLoggedIn$ = this.authService.isLoggedIn$;
  }

  handleLoginStatus(status: boolean): void {
    // Handle login status here if needed
  }

  onAdminLoggedOut(): void {
    // Handle logout logic if needed
  }




}
