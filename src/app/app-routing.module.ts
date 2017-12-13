import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportComponent } from './sport/sport.component';
import { ClubComponent } from './club/club.component';
import { RegistrationComponent } from './registration/registration.component';
import { SportEditComponent } from './sport/sport-edit/sport-edit.component';
import { ClubEditComponent } from './club/club-edit/club-edit.component';
import { RegistrationEditComponent } from './registration/registration-edit/registration-edit.component';
import { ClubListComponent } from './club-list/club-list.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/sport', pathMatch: 'full' },
  { path: 'sport', component: SportComponent, children: [
  	{ path: 'new', component: SportEditComponent },
  	{ path: ':id/edit', component: SportEditComponent },
  ] },
 { path: 'sport/:id', component: ClubComponent, children: [
  	{ path: 'new', component: ClubEditComponent },
  	{ path: ':cid/edit', component: ClubEditComponent },
  ] },
 { path: 'sport/:id/club/:cid', component: RegistrationComponent, children: [
    { path: 'new', component: RegistrationEditComponent },
    { path: ':rid/edit', component: RegistrationEditComponent },
  ] },
  { path: 'clubs', component: ClubListComponent },
  { path: 'registrations', component: RegistrationListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
