import { Component, OnInit } from '@angular/core';
import { Message, Templates } from '../../../../models/Message';
import { CompaniesService } from '../../../../services/companies.service';
import { ICompany } from '../../../../models/Company';
import { IGuest } from '../../../../models/Guest';
import { GuestsService } from '../../../../services/guests.service';

type TemplateInput = { name: string, value: string };
type ValidateType = { [id: string]: string };

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public items: TemplateInput[] = [];
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
    this._resetDisplay();
  }

  ngOnInit(): void {
    this.message = '{greeting} {firstName}, and welcome to {company}! Room {roomNumber} is now ready you. ' +
      'Enjoy your stay, and let us know if you need anything.';

    this._guestService.getGuests().subscribe((guests: IGuest[]) => this.guests = guests);
    this._companiesService.getCompanies().subscribe((companies: ICompany[]) => this.companies = companies);
  }

  public addTemplate(): void {
    this.items.push({ name: '', value: '' });
  }

  public onSubmit(): void {
    this._resetDisplay();
    const templates = this._removeInvalidTemplates(this.items);
    const placeholders: Templates = Object.assign({}, this.company.getPlaceholders(), this.guest.getPlaceholders(), templates);
    const errors: string[] = Message.checkForInvalidPlaceholders(this.message, placeholders);
    if (errors.length > 0) {
      this.errors = errors;
    } else {
      const newMessage = new Message(this.message, placeholders);
      this.text = newMessage.toString();
    }
  }

  private _removeInvalidTemplates(items: TemplateInput[]): ValidateType {
    return items.reduce((reduced, item) => {
      if (item.name) {
        return { ... reduced, ... { [item.name]: item.value } };
      }
      return reduced;
    }, {});
  }

  private _resetDisplay(): void {
    this.text = '';
    this.errors = [];
  }
}
