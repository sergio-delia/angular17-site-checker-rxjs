import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteStatusComponent } from './site-status/site-status.component';
import { HttpClientModule } from '@angular/common/http';
import { AddSiteComponent } from "./add-site/add-site.component";
import { SiteListComponent } from "./site-list/site-list.component";
import { SitesCheckerComponent } from "./sites-checker/sites-checker.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteStatusComponent, HttpClientModule, AddSiteComponent, SiteListComponent, SitesCheckerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'site-checker';
}
