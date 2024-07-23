import { Routes } from '@angular/router';
import { AddSiteComponent } from './add-site/add-site.component';
import { SiteStatusComponent } from './site-status/site-status.component';
import { SiteListComponent } from './site-list/site-list.component';
import { EditSiteComponent } from './edit-site/edit-site.component';
import { TestComponent } from './test/test/test.component';

export const routes: Routes = [
  {path:'add-site', component: AddSiteComponent},
  {path:'site-status', component: SiteStatusComponent},
  {path:'site-list', component: SiteListComponent},
  {path:'edit-site/:id', component: EditSiteComponent},
  {path:'test', component: TestComponent},
  {path:'', redirectTo: 'site-list', pathMatch:'full'},
];
