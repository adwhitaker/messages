import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Company, ICompany } from '../models/Company';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const JSON_COMPANIES: string = '../assets/Companies.json';

type companyResponse = {
  id: number,
  company: string,
  city: string,
  timezone: string
};

export interface ICompaniesService {
  getCompanies(): Observable<ICompany[]>;
}

@Injectable()
export class CompaniesService
  implements ICompaniesService {

  private _companies:  BehaviorSubject<ICompany[]>;

  public getCompanies(): Observable<ICompany[]> {
    return this._companies;
  }

  constructor(private _httpService: HttpService) {
    this._companies = <BehaviorSubject<ICompany[]>>new BehaviorSubject([]);
    this._loadCompanies();
  }

  private _loadCompanies(): void {
    this._httpService
      .get(JSON_COMPANIES)
      .subscribe(
      (response: companyResponse[]) => this._handleLoadCompaniesResponse(response),
      error => console.error('Error @ CompaniesService#_loadCompanies', error)
    );
  }

  private _handleLoadCompaniesResponse(companies: companyResponse[]): void {
    console.assert(companies != null, 'Assertion Fail @ CompaniesService#_handleLoadCompaniesResponse: No companies');

    let formattedCompanies: ICompany[] = [];
    companies.forEach((company: companyResponse) => {
      console.assert(company != null, 'Assertion Fail @ CompaniesService#_handleLoadCompaniesResponse: No company');
      const newCompany: ICompany = new Company(company.id, company.company, company.city, company.timezone);
      formattedCompanies.push(newCompany);
    });
    this._companies.next(formattedCompanies);
  }
}
