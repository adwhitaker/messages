import { Templates } from './Message';

export interface ICompany {
  id: number;
  company: string;
  city: string;
  timezone: string;
  getPlaceholders(): Templates;
}

export class Company
  implements ICompany {
  readonly id;
  readonly company;
  readonly city;
  readonly timezone;

  constructor(id: number, company: string, city: string, timezone: string) {
    this.id = id;
    this.company = company;
    this.city = city;
    this.timezone = timezone;
  }

  public getPlaceholders(): Templates {
    return {
      company: this.company,
      city: this.city,
      timezone: this.timezone
    };
  }
}
