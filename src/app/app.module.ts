import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CompaniesService } from '../services/companies.service';
import { HttpService } from '../services/http.service';
import { GuestsService } from '../services/guests.service';
import { MessagesService } from '../services/messages.service';
import { AddTemplateFormComponent } from './add-template-form/add-template-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTemplateFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    HttpService,
    CompaniesService,
    GuestsService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
