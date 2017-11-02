import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { UserComponent } from './pages/main/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { CompaniesService } from '../services/companies.service';
import { HttpService } from '../services/http.service';
import { GuestsService } from '../services/guests.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NoPageFoundComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule
  ],
  providers: [
    HttpService,
    CompaniesService,
    GuestsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
