import { Component } from '@angular/core';
import { Site } from '../status-check.service';
import { FirestoreService } from '../firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor( private firestore: FirestoreService, private router: Router, private toast: ToastrService ){}

  addSite(){
    this.firestore.addSite(this.newSite).then(() => {
      console.log('Site added');
      this.toast.success('Sito aggiunto con successo');
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      this.toast.error('Errore durante l\'inserimento');
      console.error('Error adding site:', error);
    })
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
