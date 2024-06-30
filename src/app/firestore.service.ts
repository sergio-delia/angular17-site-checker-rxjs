import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Site } from './status-check.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor( private db: Firestore  ) { }

  getSites(): Observable<any[]> {
    const sitesCollection = collection(this.db, 'sites');
    return collectionData(sitesCollection)
  }

  cambiaStato(site: Site) {
    const sitesCollection = collection(this.db, 'sites');
    return updateDoc(doc(sitesCollection, site.id), {
      stato: !site.stato
    })
  }
}
