import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Site } from '../status-check.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-site',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-site.component.html',
  styleUrl: './edit-site.component.css'
})
export class EditSiteComponent implements OnInit, OnDestroy{

  siteId: string
  site$: Observable<any> | undefined;

  newSite: Omit<Site, 'id' | 'stato'> = {
    name: '',
    email: ''
  }

  private siteSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private toast: ToastrService, private firestore: FirestoreService){}

  ngOnInit(): void {
    this.siteId = this.route.snapshot.paramMap.get('id')!;
    if (this.siteId) {
      this.site$ = this.firestore.getSite(this.siteId);
      this.siteSubscription = this.site$.subscribe(site => {
        this.newSite = { ...site };
      });
    } else {
      console.error('No site ID found in route parameters');
    }
  }

  editSite() {
    if (this.siteId) {
      this.firestore.editSite(this.siteId, this.newSite)
        .then(() => {
          console.log('Site updated successfully');
          this.toast.success('Aggiornamento avvenuto con successo');
          this.router.navigate(['/dashboard']);
        })
        .catch((error: any) => {
          this.toast.error('Errore durante l\'aggiornamento');
          console.error('Error updating site:', error);
        });
    } else {
      console.error('No site ID available for updating');
    }
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    if (this.siteSubscription) {
      this.siteSubscription.unsubscribe();
    }
  }
}
