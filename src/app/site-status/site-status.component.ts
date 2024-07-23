import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatusCheckService } from '../status-check.service';
import { Subject, Subscription, interval, takeUntil } from 'rxjs';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-site-status',
  standalone: true,
  imports: [],
  templateUrl: './site-status.component.html',
  styleUrl: './site-status.component.css'
})
export class SiteStatusComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();
  private statusSubscription: Subscription;
  time_scan:number = 10000
  constructor(private statusCheckService: StatusCheckService, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    console.log('Console log from component: Initializing site status component'); // Esempio di console.log nel componente

    this.statusSubscription = this.statusCheckService.checkStatusPeriodically(this.time_scan).subscribe();
    //this.statusSubscription = this.statusCheckService.checkStatusOnce().subscribe();

    // this.statusCheckService.checkStatusPeriodically().subscribe(response => {
    //   if (response) {
    //     console.log('Console log from component: Site is online. Status:', response.status); // Esempio di console.log nel componente
    //   }
    // });

    // this.firestoreService.getSites().subscribe(data => {
    //   console.log(data);
    // })
  }

  ngOnDestroy(): void {
    this.statusCheckService.completeRequests();
    this.statusSubscription.unsubscribe();
  }

}
