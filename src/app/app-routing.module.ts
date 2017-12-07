import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportComponent } from './sport/sport.component';
import { SportDetailComponent } from './sport/sport-detail/sport-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/sport', pathMatch: 'full' },
  { path: 'sport', component: SportComponent, children: [

  ] },
    	{ path: 'sport/:id', component: SportDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
