import * as moment from 'moment';

export type Templates = { [templateName: string]: string | number };

export interface IMessage {
  toString(): string;
}

const REGEX_GLOBAL: string = 'g';

export class Message
  implements IMessage {

  private _message: string;
  private _templates: Templates;

  static checkForInvalidPlaceholders(message: string, templates: Templates): string[] {
    const placeholders: string[] = Object.keys(templates);
    const messagePlaceholders: string[] = Message.getMessagePlaceholders(message);
    const errors: string[] = [];
    messagePlaceholders.forEach((placeholder: string) => {
      if (!placeholders.includes(placeholder)) {
        errors.push(placeholder);
      }
    });
    return errors;
  }

  static getMessagePlaceholders(message: string): string[] {
    const placeholders: string[] = message.match(/{([^{}]*)}/g);
    if (placeholders) {
      return Message.removeTemplateWrapper(placeholders);
    } else {
      return [];
    }
  }

  static removeTemplateWrapper(placeholders: string[]): string[] {
    return placeholders.reduce((reduced: string[], word: string) => {
      const removedWrapper: string = word.slice(1, -1).trim();
      return [... reduced, removedWrapper];
    }, []);
  }

  private _removeTemplate(word: string): string {
   return  word.slice(1, -1).trim();
  }

  constructor(message: string, templates: Templates) {
    this._message = message;
    this._templates = templates;
  }

  public toString(): string {
    return this._replaceTemplates();
  }

  private _getGreeting(): string {
    const x = moment();
    return '';
  }

  private _getPlaceholders(message: string): string[] {
    return message.match(/{([^{}]*)}/g);
  }

  private _replaceTemplates(): string {
    let message = this._message;
    const placeholders: string[] = this._getPlaceholders(message);
    placeholders.forEach(placeholder => {
      const regex: RegExp = new RegExp(placeholder, REGEX_GLOBAL);
      const templateKey: string = this._removeTemplate(placeholder);
      const value: string = this._templates[templateKey] as string || '';
      message = message.replace(regex, value);
    });
    return message;
  }

}
