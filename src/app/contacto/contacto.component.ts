import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  editingMode = false;
  contactData: any = {};

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {

    this.firebaseService.getcontactinfo().subscribe((data: any) => {
      this.contactData = data;
    });
  }

  toggleEditing(): void {
    this.editingMode = !this.editingMode;
  }

  saveChanges(): void {

    this.firebaseService.updatecontactinfo(this.contactData);
    this.editingMode = false;
  }
}
