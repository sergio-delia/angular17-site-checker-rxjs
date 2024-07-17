import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Site } from '../status-check.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent implements OnInit{
  constructor(private firestore: FirestoreService, private router: Router) {}

  sites$: Observable<any[]>;

  ngOnInit(): void {
    this.sites$ = this.firestore.getSites();
  }

  editSite(site:Site){
    this.router.navigate(['/edit-site', site.id])
  }

  deleteSite(site: any){}

  addSite(){
    this.router.navigate(['add-site']);
  }
}
