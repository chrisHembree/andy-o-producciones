import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  email: string = '';
  password: string = '';

  constructor() {}

  onSubmit(): void {
    // Handle login logic here (validate email and password)
    // For simplicity, let's just close the dialog for now

  }
}








