import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Site } from '../status-check.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, MatDialogModule],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent implements OnInit{
  constructor(private firestore: FirestoreService, private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  sites$: Observable<any[]>;

  ngOnInit(): void {
    this.sites$ = this.firestore.getSites();
  }

  editSite(site:Site){
    this.router.navigate(['/edit-site', site.id])
  }

  confirmDelete(site: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Sei sicuro di voler eliminare il sito?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSite(site);
      }
    });
  }

  deleteSite(site: any) {
    this.firestore.deleteSite(site.id).then(() => {
      this.snackBar.open('Sito eliminato con successo', 'Chiudi', { duration: 3000 });
    }).catch(error => {
      console.error('Errore durante l\'eliminazione del sito', error);
      this.snackBar.open('Errore durante l\'eliminazione del sito', 'Chiudi', { duration: 3000 });
    });
  }

  addSite(){
    this.router.navigate(['add-site']);
  }
}
