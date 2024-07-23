import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { TimerService } from '../timer.service';
import { StatusCheckService } from '../status-check.service';

@Component({
  selector: 'app-sites-checker',
  standalone: true,
  imports: [],
  templateUrl: './sites-checker.component.html',
  styleUrl: './sites-checker.component.css'
})
export class SitesCheckerComponent implements OnInit, OnDestroy {
  minuti = 1;
  intervalMs = this.minuti *60000; // Default interval
  timerValue: number = 0;
  private timerSubscription: Subscription;
  private executeNowSubscription: Subscription | undefined;
  private statusSubscription: Subscription;
  private destroy$ = new Subject<void>();

  constructor(private timerService: TimerService, private statusCheckService: StatusCheckService) { }

  ngOnInit() {
    this.timerSubscription = this.timerService.timer$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.timerValue = value;
    });
    this.startTimer();
  }

  startTimer() {
    this.timerService.startTimer(this.intervalMs);
    this.statusSubscription = this.statusCheckService.checkStatusPeriodically(this.intervalMs).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  executeNow() {
    // Unsubscribe from any existing execution
    if (this.executeNowSubscription) {
      this.executeNowSubscription.unsubscribe();
    }

    this.executeNowSubscription = this.statusCheckService.checkStatusOnce().subscribe();
  }

  ngOnDestroy() {
    this.statusCheckService.completeRequests();
    this.timerService.stopTimer();
    this.destroy$.next();
    this.destroy$.complete();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
