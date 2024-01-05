import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  editingMode = false;
  phoneNumber = '3152490008';
  email = 'ANDYOCINE@GMAIL.COM';
  instaHandle = '@ANDYOCINE';

  toggleEditing() {
    this.editingMode = !this.editingMode;
  }

  saveChanges() {
    // Add any additional logic to save the changes if needed
    this.editingMode = false;
  }



}
