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
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {}

  async onSubmit(): Promise<void> {
    try {
      await this.authService.signIn(this.email, this.password);
      console.log('Login successful');
      this.loggedIn.emit(true);
    } catch (error) {
      console.error('Error logging in', error);
    }
  }
}








