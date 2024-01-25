import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'] // Correct property name is styleUrls
})
export class ContactoComponent implements OnInit {
  editingMode = false;
  contactData: any = {};

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    // Fetch contact data from Firebase on component initialization
    this.firebaseService.getcontactinfo().subscribe((data: any) => {
      this.contactData = data;
    });
  }

  toggleEditing(): void {
    this.editingMode = !this.editingMode;
  }

  saveChanges(): void {
    // Update contact data in Firebase when Save button is clicked
    this.firebaseService.updatecontactinfo(this.contactData);
    this.editingMode = false;
  }
}
