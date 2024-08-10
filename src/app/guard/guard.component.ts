import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-guard',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './guard.component.html',
  styleUrl: './guard.component.css'
})
export class GuardComponent {

}
