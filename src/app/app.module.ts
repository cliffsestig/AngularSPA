import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SportComponent } from './sport/sport.component';
import { HeaderComponent } from './header/header.component';
import { ClubComponent } from './club/club.component';
import { RegistrationComponent } from './registration/registration.component';
import { SportEditComponent } from './sport/sport-edit/sport-edit.component';
import { ClubEditComponent } from './club/club-edit/club-edit.component';
import { RegistrationEditComponent } from './registration/registration-edit/registration-edit.component';
import { ClubListComponent } from './club-list/club-list.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';


@NgModule({
  declarations: [
    AppComponent,
    SportComponent,
    HeaderComponent,
    ClubComponent,
    RegistrationComponent,
    SportEditComponent,
    ClubEditComponent,
    RegistrationEditComponent,
    ClubListComponent,
    RegistrationListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
