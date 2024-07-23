import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private stopTimer$ = new Subject<void>();
  private timerSubject = new BehaviorSubject<number>(0);
  timer$ = this.timerSubject.asObservable();
  private intervalMs: number;

  startTimer(intervalMs: number) {
    this.intervalMs = intervalMs;
    this.stopTimer$.next(); // Ferma qualsiasi timer esistente
    const startTime = Date.now();
    this.runTimer(startTime); // Avvia il timer
  }

  private runTimer(startTime: number) {
    interval(1000).pipe( // Aggiorna ogni secondo
      takeUntil(this.stopTimer$)
    ).subscribe(() => {
      const elapsedTime = Date.now() - startTime;
      let remainingTime = this.intervalMs - (elapsedTime % this.intervalMs);

      if (remainingTime <= 0) {
        // Se il tempo rimanente è 0 o meno, riavvia il timer
        remainingTime = this.intervalMs;
        startTime = Date.now(); // Reset dell'orario di inizio
      }

      this.timerSubject.next(Math.floor(remainingTime / 1000));
    });
  }

  stopTimer() {
    this.stopTimer$.next(); // Ferma il timer corrente
  }

  resetTimer() {
    this.startTimer(this.intervalMs); // Riavvia il timer
  }
}
