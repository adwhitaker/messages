import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const JSON_MESSAGE_TEMPLATES: string = '../assets/MessageTemplates.json';

export interface IMessageTemplate {
  name: number;
  value: string;
}

export interface IMessagesService {
  getTemplateMessages(): Observable<IMessageTemplate[]>;
  addMessageTemplate(template: IMessageTemplate): void;
}

@Injectable()
export class MessagesService
  implements IMessagesService {

  private _templateMessages:  BehaviorSubject<IMessageTemplate[]>;

  public getTemplateMessages(): Observable<IMessageTemplate[]> {
    return this._templateMessages;
  }

  constructor(private _httpService: HttpService) {
    this._templateMessages = <BehaviorSubject<IMessageTemplate[]>>new BehaviorSubject([]);
    this._loadTemplateMessages();
  }

  public addMessageTemplate(template: IMessageTemplate): void {
    this._templateMessages.next([... this._templateMessages.getValue(), template]);
  }

  private _loadTemplateMessages(): void {
    this._httpService
      .get(JSON_MESSAGE_TEMPLATES)
      .subscribe(
      (response: IMessageTemplate[]) => this._handleLoadCompaniesResponse(response),
      error => console.error('Error @ MessagesService#_loadTemplateMessages', error)
    );
  }

  private _handleLoadCompaniesResponse(messages: IMessageTemplate[]): void {
    console.assert(messages != null, 'Assertion Fail @ CompaniesService#_handleLoadCompaniesResponse: No companies');

    this._templateMessages.next(messages);
  }
}
