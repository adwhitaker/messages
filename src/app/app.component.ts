import { Component, OnInit } from '@angular/core';
import { Message, Templates } from '../models/Message';
import { CompaniesService } from '../services/companies.service';
import { ICompany } from '..//models/Company';
import { IGuest } from '../models/Guest';
import { GuestsService } from '../services/guests.service';
import { formErrors, defaultPlaceholders } from '../config/constants';
import { methods as dateMethods } from '../utilities/date.utils';
import { MessagesService, IMessageTemplate } from '../services/messages.service';

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
  public messages: IMessageTemplate[];
  public messageTemplate: IMessageTemplate;
  public company: ICompany;
  public guest: IGuest;

  constructor(private _companiesService: CompaniesService,
              private _guestService: GuestsService,
              private _messagesService: MessagesService) {
    this.message = '';
    this.items = [];
    this._resetDisplay();
  }

  public ngOnInit(): void {
    this.addPlaceholder();
    this._initSelects();
  }

  private _initSelects(): void {
    console.assert(this._guestService != null, 'Assertion Fail @ AppComponent#_initSelects: No _guestService');
    console.assert(this._companiesService != null, 'Assertion Fail @ AppComponent#_initSelects: No _companiesService');
    console.assert(this._messagesService != null, 'Assertion Fail @ AppComponent#_initSelects: No _messagesService');

    this._guestService.getGuests()
      .subscribe((guests: IGuest[]) => this.guests = guests);

    this._companiesService.getCompanies()
      .subscribe((companies: ICompany[]) => this.companies = companies);

    this._messagesService.getTemplateMessages()
      .subscribe((messages: IMessageTemplate[]) => {
        if (messages.length) {
          this.messages = messages;
        }

        if (messages.length && !this.messageTemplate) {
          this.messageTemplate = messages[0];
          this.message = messages[0].value;
        }
      });
  }

  public changeMessageTemplate(newTemplate: IMessageTemplate): void {
    console.assert(newTemplate != null, 'Assertion Fail @ AppComponent#changeTemplate: No newTemplate');

    this.message = newTemplate.value;
  }

  public addTemplate(x): void {
    console.assert(this._messagesService != null, 'Assertion Fail @ AppComponent#addPlaceholder: No _messagesService');

    const newTemplate: IMessageTemplate = { name: x, value: this.message };
    this._messagesService.addMessageTemplate(newTemplate);
    this.messageTemplate = newTemplate;
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

    const invalidPlaceholders: string[] = Message.findInvalidPlaceholders(this.message, placeholders);

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
