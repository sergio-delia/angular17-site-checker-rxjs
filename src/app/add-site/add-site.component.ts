import { Component } from '@angular/core';
import { Site } from '../status-check.service';
import { FirestoreService } from '../firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-site',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-site.component.html',
  styleUrl: './add-site.component.css'
})
export class AddSiteComponent {
  newSite: Omit<Site, 'id' | 'stato'> = {
    name: '',
    email: ''
  }

  constructor( private firestore: FirestoreService ){}

  addSite(){
    this.firestore.addSite(this.newSite).then(() => {
      console.log('Site added');

    }).catch(error => {
      console.log('Errore', error);

    })
  }
}
