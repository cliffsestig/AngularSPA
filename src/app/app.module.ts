import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SportComponent } from './sport/sport.component';
import { HeaderComponent } from './header/header.component';
import { SportDetailComponent } from './sport/sport-detail/sport-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    SportComponent,
    HeaderComponent,
    SportDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
