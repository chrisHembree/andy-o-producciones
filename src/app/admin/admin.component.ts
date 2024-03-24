import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../firebaseauth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

async onSubmit(): Promise<void> {
  try {
    await this.authService.signIn(this.email, this.password);
    console.log('Login successful');
  } catch (error) {
    console.error('Error logging in', error);
  }
}

async onLogout(): Promise<void> {
  try {
    await this.authService.signOut();
    console.log('Logout successful');
  } catch (error) {
    console.error('Error logging out', error);
  }
}


}








