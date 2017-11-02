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
    return this._http.get(url);
  }
}


