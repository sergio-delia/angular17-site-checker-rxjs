import { Router, Routes } from '@angular/router';
import { AddSiteComponent } from './add-site/add-site.component';
import { SiteStatusComponent } from './site-status/site-status.component';
import { SiteListComponent } from './site-list/site-list.component';
import { EditSiteComponent } from './edit-site/edit-site.component';
import { TestComponent } from './test/test/test.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { GuardComponent } from './guard/guard.component';


export const routes: Routes = [
  {path:'dashboard', component: DashboardComponent, canActivate:[authGuard]},
  {path:'add-site', component: AddSiteComponent},
  // {path:'site-status', component: SiteStatusComponent},
  // {path:'site-list', component: SiteListComponent},
  {path:'edit-site/:id', component: EditSiteComponent},
  // {path:'test', component: TestComponent},
  {path:'', redirectTo: 'dashboard', pathMatch:'full'},
  {path:'login', component: LoginComponent}
];
