import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CompaniesService } from '../services/companies.service';
import { HttpService } from '../services/http.service';
import { GuestsService } from '../services/guests.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
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
