import { Component, OnInit } from '@angular/core';
import { Message, Templates } from '../models/Message';
import { CompaniesService } from '../services/companies.service';
import { ICompany } from '..//models/Company';
import { IGuest } from '../models/Guest';
import { GuestsService } from '../services/guests.service';
import { constants, formErrors, defaultPlaceholders } from '../config/constants';
import { methods as dateMethods } from '../utilities/date.utils';

type TemplateInput = { name: string, value: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
  implements OnInit {

  public items: TemplateInput[];
  public message: string;
  public errors: string[];
  public text: string;
  public companies: ICompany[];
  public guests: IGuest[];
  public company: ICompany;
  public guest: IGuest;

  constructor(private _companiesService: CompaniesService,
              private _guestService: GuestsService) {
    this.message = '';
    this.items = [];
    this._resetDisplay();
  }

  ngOnInit(): void {
    console.assert(constants != null, 'Assertion Fail @ AppComponent#ngOnInit: No constants');
    console.assert(this._guestService != null, 'Assertion Fail @ AppComponent#ngOnInit: No _guestService');
    console.assert(this._companiesService != null, 'Assertion Fail @ AppComponent#ngOnInit: No _companiesService');

    this.message = constants.initialMessage;
    this.addPlaceholder();

    this._guestService.getGuests()
      .subscribe((guests: IGuest[]) => this.guests = guests);

    this._companiesService.getCompanies()
      .subscribe((companies: ICompany[]) => this.companies = companies);
  }

  public addPlaceholder(): void {
    console.assert(this.items != null, 'Assertion Fail @ AppComponent#addPlaceholder: No items');
    this.items.push({ name: '', value: '' });
  }

  public onSubmit(): void {
    this._resetDisplay();

    let selectErrors: string[] = this._validateSelects();

    if (selectErrors.length > 0) {
      this.errors = selectErrors;
      return;
    }

    console.assert(this.items != null, 'Assertion Fail @ AppComponent#onSubmit: No items');
    console.assert(this.message != null, 'Assertion Fail @ AppComponent#onSubmit: No message');

    const templates: Templates = this._removeNullTemplates(this.items);
    let placeholders: Templates = Object.assign({}, this.company.getPlaceholders(), this.guest.getPlaceholders(), templates);
    placeholders = this._checkForGreeting(placeholders);

    console.assert(Message != null, 'Assertion Fail @ AppComponent#onSubmit: No Message');

    const invalidPlaceholders: string[] = Message.checkForInvalidPlaceholders(this.message, placeholders);

    if (invalidPlaceholders.length > 0) {
      this.errors = invalidPlaceholders;
    } else {
      const newMessage = new Message(this.message, placeholders);
      this.text = newMessage.toString();
    }
  }

  private _validateSelects(): string[] {
    console.assert(formErrors != null, 'Assertion Fail @ AppComponent#_validateSelects: No formErrors');

    let errors: string[] = [];
    if (!this.guest) {
      errors.push(formErrors.selectGuest);
    }
    if (!this.company) {
      errors.push(formErrors.selectCompany);
    }
    return errors;
  }

  private _removeNullTemplates(items: TemplateInput[]): Templates {
    console.assert(items != null, 'Assertion Fail @ AppComponent#_removeNullTemplates: No items');

    return items.reduce((reduced, item) => {
      if (item.name) {
        return { ... reduced, ... { [item.name]: item.value } };
      }
      return reduced;
    }, {});
  }

  private _checkForGreeting(currentPlaceholders: Templates): Templates {
    console.assert(currentPlaceholders != null, 'Assertion Fail @ AppComponent#_checkForGreeting: No currentPlaceholders');
    console.assert(Message != null, 'Assertion Fail @ AppComponent#_checkForGreeting: No Message');
    console.assert(dateMethods != null, 'Assertion Fail @ AppComponent#_checkForGreeting: No dateMethods');

    const messagePlaceholders = Message.getMessagePlaceholders(this.message);
    if (messagePlaceholders.includes(defaultPlaceholders.greeting)) {
      const greeting: string = dateMethods.generateGreetingFromTimezone(this.company.timezone);
      return Object.assign({}, currentPlaceholders, { greeting });
    }
    return currentPlaceholders;
  }

  private _resetDisplay(): void {
    this.text = '';
    this.errors = [];
  }
}
