import { methods as regexMethods } from '../utilities/regex.utils';

export type Templates = { [templateName: string]: string };

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
    const placeholders: string[] = regexMethods.getPlaceholdersFromString(message);
    if (placeholders) {
      return Message.removeTemplateWrapper(placeholders);
    } else {
      return [];
    }
  }

  static removeTemplateWrapper(placeholders: string[]): string[] {
    return placeholders.reduce((reduced: string[], word: string) => {
      const removedWrapper: string = regexMethods.removeTemplateFromWord(word);
      return [... reduced, removedWrapper];
    }, []);
  }

  constructor(message: string, templates: Templates) {
    this._message = message;
    this._templates = templates;
  }

  public toString(): string {
    let message = this._message;
    const placeholders: string[] = regexMethods.getPlaceholdersFromString(message);
    placeholders.forEach(placeholder => {
      const regex: RegExp = new RegExp(placeholder, REGEX_GLOBAL);
      const templateKey: string = regexMethods.removeTemplateFromWord(placeholder);
      const value: string = this._templates[templateKey] || '';
      message = message.replace(regex, value);
    });
    return message;
  }


}
