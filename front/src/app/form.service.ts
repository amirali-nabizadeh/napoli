import { Injectable } from '@angular/core';
import { FormInterface } from './app-interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  forms: FormInterface[] = [];
  constructor() {}

  setForm(form: FormInterface) {
    this.forms.push(form);
  }

  getForms() {
    return this.forms;
  }
}
