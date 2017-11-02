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

  constructor(id: number,
              company: string,
              city: string,
              timezone: string) {
    console.assert(id != null, 'Assertion Fail @ Company#constructor: No id');
    console.assert(company != null, 'Assertion Fail @ Company#constructor: No company');
    console.assert(city != null, 'Assertion Fail @ Company#constructor: No city');
    console.assert(timezone != null, 'Assertion Fail @ Company#constructor: No timezone');

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
