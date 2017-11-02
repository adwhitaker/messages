import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IHttpService {
  get(url);
}

@Injectable()
export class HttpService
  implements IHttpService {

  constructor(private _http: HttpClient) {}

  public get(url: string) {
    console.assert(url != null, 'Assertion Fail @ HttpService#get: No url');

    return this._http.get(url);
  }
}


