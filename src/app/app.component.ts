import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteStatusComponent } from './site-status/site-status.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteStatusComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'site-checker';
}
