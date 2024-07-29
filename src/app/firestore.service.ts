import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Site } from './status-check.service';
import { addDoc, deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor( private db: Firestore  ) { }

  getSites(): Observable<any[]> {
    const sitesCollection = collection(this.db, 'sites');
    return collectionData(sitesCollection)
  }

  getSite(id: string): Observable<any> {
    const siteDocRef = doc(this.db, `sites/${id}`);
    return docData(siteDocRef, { idField: 'id' });
  }

  editSite(id: string, updatedData: any): Promise<void> {
    const siteDocRef = doc(this.db, `sites/${id}`);
    return updateDoc(siteDocRef, updatedData);
  }

  cambiaStato(site: Site) {
    const sitesCollection = collection(this.db, 'sites');
    return updateDoc(doc(sitesCollection, site.id), {
      stato: !site.stato
    })
  }

  deleteSite(id:string){
    const siteDocRef = doc(this.db, `sites/${id}`);
    return deleteDoc(siteDocRef);
  }

  async addSite(site: Omit<Site, 'id' | 'stato'>) {
    const sitesCollection = collection(this.db, 'sites');

    try {
      const docRef = await addDoc(sitesCollection, site)
      const newId = docRef.id

      await updateDoc(docRef, {
        id: newId,
        stato: true
      })
      console.log('Sito aggiunto correttamente');

    } catch (error) {
      console.log('Errore nell\'aggiunta del sito', error);

    }

    return
  }
}
