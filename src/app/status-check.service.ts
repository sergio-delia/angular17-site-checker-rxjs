import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, forkJoin, interval, map, mergeMap, of, switchMap, takeUntil, tap } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { MailInfo, MailServiceService } from './mail-service.service';
import moment from 'moment';


export interface Site {
  name: string,
  email: string,
  stato: boolean,
  id: string
}


@Injectable({
  providedIn: 'root'
})

export class StatusCheckService {


  //private root: string = "https://cors-anywhere.herokuapp.com/";
  private url = 'https://cors-anywhere.herokuapp.com/sergiodelia.it'; // Cambia con l'URL del sito che vuoi controllare
  private time_scan = 10000;
  private destroy$ = new Subject<boolean>()

  private sites$: Site[] = []
  constructor(private http: HttpClient, private firestoreService: FirestoreService, private mailService: MailServiceService) {

    this.firestoreService.getSites().subscribe(data => {
      this.sites$ = data
    })
  }


  checkStatusOnce(): Observable<any>{
    return this.firestoreService.getSites().pipe(
      switchMap(data => {
        this.sites$ = data;
        return of(...this.sites$).pipe(
          mergeMap(site => this.checkStatusSingleSite(site))
        );
      }),
      catchError(err => {
        console.error(err);
        return EMPTY;
      })
    );
  }



  checkStatusPeriodically(): Observable<any>{
    console.log('Entrato nella funzione');
      return interval(this.time_scan).pipe(
        takeUntil(this.destroy$),
        mergeMap(() => this.checkTestSite())
      )
  }



  private checkTestSite(): Observable<any>{
    return of(...this.sites$).pipe(
      mergeMap(data => this.checkStatusSingleSite(data))
    );

  }






  private checkStatusSingleSite(site:Site): Observable<any> {


    const urlWithoutWww = `https://corsproxy.io/?${encodeURIComponent('https://' + site.name)}`
    const urlWithWww = `https://corsproxy.io/?${encodeURIComponent('https://www.' + site.name)}`
    return forkJoin({
      // forkJoin viene utilizzato quando si desidera eseguire più osservabili in parallelo e attendere che tutti abbiano completato prima di procedere.
      withoutWww: this.http.get(urlWithoutWww, { observe: 'response', responseType: 'text' }).pipe(
        map((response: HttpResponse<any>) => ({ response, withWww: false })),
        catchError((error: HttpErrorResponse) => of({ error, withWww: false }))
      ),
      withWww: this.http.get(urlWithWww, { observe: 'response', responseType: 'text' }).pipe(
        map((response: HttpResponse<any>) => ({ response, withWww: true })),
        catchError((error: HttpErrorResponse) => of({ error, withWww: true }))
      )
    }).pipe(
      map(results => {
        const withoutWww = results.withoutWww as { response?: HttpResponse<any>, error?: HttpErrorResponse, withWww: boolean };
        const withWww = results.withWww as { response?: HttpResponse<any>, error?: HttpErrorResponse, withWww: boolean };
        // FUNZIONA SENZA IL WWW.
        if (withoutWww.response) {
          if (!site.stato) {
            this.firestoreService.cambiaStato(site);
          }
          console.log(`Sito ${site.name} online (senza www). Status: ${withoutWww.response.status}`);
          return withoutWww.response;
        }
        // FUNZIONA CON IL WWW.
        if (withWww.response) {
          if (!site.stato) {
            this.firestoreService.cambiaStato(site);
          }
          console.log(`Sito ${site.name} online (con www). Status: ${withWww.response.status}`);
          return withWww.response;
        }

        // Se entrambe le richieste falliscono
        const error = withoutWww.error || withWww.error;
        if (site.stato && error) {
          this.firestoreService.cambiaStato(site);

          const mailInfo: MailInfo = {
            site_name: site.name,
            mail_cliente: site.email,
            hour: moment(new Date()).format('DD/MM/YYYY - HH:mm'),
            error: this.replaceUrlWithSiteName(error.message, site.name),
            error_status: error.status
          };

          // Invia email al proprietario del sito (decommentare la riga successiva se la mailService è configurata)
          // this.mailService.send(mailInfo);
        }

        if (error) {
          console.error(`Site ${site.name} is offline. Status: ${error.status}, Status Text: ${error.statusText}`);
        } else {
          console.error(`Site ${site.name} is offline and no error information is available.`);
        }

        return EMPTY;
      }),
      catchError(error => {
        console.error('Error during status check', error);
        return EMPTY;
      })
    );
  }





















// ----------------------- PARTE MODIFICATA ---------------------------------------
//   private checkStatusSingleSite(site:Site): Observable<any> {
//   return this.http.get('https://corsproxy.io/?'+ encodeURIComponent('https://'+site.name),  { observe: 'response', responseType: 'text' }).pipe(
  //   //return this.http.get('https://api.allorigins.win/get?url='+ encodeURIComponent('https://'+site.name),  { observe: 'response', responseType: 'text' }).pipe(
  //   //return this.http.get('https://thingproxy.freeboard.io/fetch/'+ 'https://'+site.name,  { observe: 'response', responseType: 'text' }).pipe(
  //   //return this.http.get(this.root+site.name,  { observe: 'response', responseType: 'text' }).pipe(
  //     map((response: HttpResponse<any>) => {
  //       if(!site.stato){
  //         this.firestoreService.cambiaStato(site);
  //       }
  //       console.log(`Sito ${site.name} online. Status: ${response.status}`);
  //       return response
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       if(site.stato){

  //         //INVIA MAIL AL PROPRIETARIO DEL SITO
  //         this.firestoreService.cambiaStato(site);
  //         const mailInfo: MailInfo = {
  //           site_name: site.name,
  //           mail_cliente: site.email,
  //           hour: moment(new Date()).format('DD/MM/YYYY - HH:mm'),
  //           error: this.replaceUrlWithSiteName(error.message, site.name),
  //           error_status: error.status
  //         }
  //         //const sendEmail = this.mailService.send(mailInfo)
  //       }


  //       console.error(`Site ${site.name} is offline. Status: ${error.status}, Status Text: ${error.statusText}`);

  //       return EMPTY; // Restituisce un Observable vuoto che completa immediatamente
  //     }
  //   )
  //   );
  // }
// ---------------------------------- FINE VECCHIA FUNZIONE --------------------------------

  replaceUrlWithSiteName(errorMsg: string, siteName: string): string {
    return errorMsg.replace(/https:\/\/[^\s]+/, siteName);
  }


  private checkStatus() {

    const headers = new HttpHeaders({
      'X-Requested-With': '',  // Imposta l'header 'X-Requested-With'
    });
    return this.http.get(this.url, { headers, observe: 'response', responseType: 'text' }).pipe(
      map((response: HttpResponse<any>) => {
        console.log(`Sito online. Status: ${response}`)
        return EMPTY
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(`Site is offline. Status: ${error.status}, Status Text: ${error.statusText}`);
        return EMPTY; // Restituisce un Observable vuoto che completa immediatamente
      }
    )
    );
  }


  completeRequests() {
    console.log('Chiamato');
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
