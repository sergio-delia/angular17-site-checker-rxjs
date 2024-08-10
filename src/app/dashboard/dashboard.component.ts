import { Component } from '@angular/core';
import { SitesCheckerComponent } from '../sites-checker/sites-checker.component';
import { RouterOutlet } from '@angular/router';
import { SiteListComponent } from "../site-list/site-list.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SitesCheckerComponent, RouterOutlet, SiteListComponent, LoginComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
