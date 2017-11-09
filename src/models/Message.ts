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

  static findInvalidPlaceholders(message: string, templates: Templates): string[] {
    console.assert(message != null, 'Assertion Fail @ Message#findInvalidPlaceholders: No message');
    console.assert(Message != null, 'Assertion Fail @ Message#findInvalidPlaceholders: No Message');

    const placeholders: string[] = Object.keys(templates);
    const messagePlaceholders: string[] = Message.getMessagePlaceholders(message);
    const invalidPlaceholders: string[] = [];

    messagePlaceholders.forEach((placeholder: string) => {
      if (!placeholders.includes(placeholder)) {
        invalidPlaceholders.push(placeholder);
      }
    });

    return invalidPlaceholders;
  }

  static getMessagePlaceholders(message: string): string[] {
    console.assert(message != null, 'Assertion Fail @ Message#getMessagePlaceholders: No message');
    console.assert(Message != null, 'Assertion Fail @ Message#getMessagePlaceholders: No Message');
    console.assert(regexMethods != null, 'Assertion Fail @ Message#getMessagePlaceholders: No regexMethods');

    const placeholders: string[] = regexMethods.getPlaceholdersFromString(message);

    if (placeholders) {
      return Message.removeTemplateFromPlaceholders(placeholders);
    }
    return [];
  }

  static removeTemplateFromPlaceholders(placeholders: string[]): string[] {
    console.assert(placeholders != null, 'Assertion Fail @ Message#removeTemplateFromPlaceholders: No placeholders');
    console.assert(regexMethods != null, 'Assertion Fail @ Message#removeTemplateFromPlaceholders: No regexMethods');

    return placeholders.reduce((reduced: string[], word: string) => {
      const removedWrapper: string = regexMethods.removeTemplateFromWord(word);
      return [... reduced, removedWrapper];
    }, []);
  }

  constructor(message: string, templates: Templates) {
    console.assert(message != null, 'Assertion Fail @ Message#constructor: No message');
    console.assert(templates != null, 'Assertion Fail @ Message#constructor: No templates');

    this._message = message;
    this._templates = templates;
  }

  public toString(): string {
    console.assert(this._message != null, 'Assertion Fail @ Message#toString: No message');
    console.assert(regexMethods != null, 'Assertion Fail @ Message#toString: No regexMethods');

    const message: string = this._message;
    const placeholdersWithTemplate: string[] = regexMethods.getPlaceholdersFromString(message);

    placeholdersWithTemplate.forEach(placeholder => {
      const regex: RegExp = new RegExp(placeholder, REGEX_GLOBAL);
      const templateKey: string = regexMethods.removeTemplateFromWord(placeholder);
      const value: string = this._templates[templateKey] || '';
      message = message.replace(regex, value);
    });

    return message;
  }


}
