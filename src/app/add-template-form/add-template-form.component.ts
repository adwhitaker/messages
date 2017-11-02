import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-template-form',
  templateUrl: './add-template-form.component.html',
  styleUrls: ['./add-template-form.component.scss']
})
export class AddTemplateFormComponent {
  @Output() private addMessageTemplate: EventEmitter<string>;
  public name: string;
  public error: boolean;

  constructor() {
    this.addMessageTemplate = new EventEmitter();
    this.name = '';
    this.error = false
  }

  public addTemplate(): void {
    console.assert(this.addMessageTemplate != null, 'Assertion Fail @ AddTemplateFormComponent#addTemplate: No addMessageTemplate');
    console.assert(this.addMessageTemplate.emit != null, 'Assertion Fail @ AddTemplateFormComponent#addTemplate: No emit');

    if (!this.name) {
      this.error = true;
      return;
    }

    this.error = false;
    this.addMessageTemplate.emit(this.name);
    this.name = '';
  }
}
