import { Component, OnInit } from '@angular/core';
import { FormInterface } from '../app-interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-forms',
  templateUrl: './my-forms.component.html',
  styleUrls: ['./my-forms.component.css'],
})
export class MyFormsComponent implements OnInit {
  myForms: FormInterface[] = [];
  p: number = 1;
  searchedValue: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    const storedForms: Partial<FormInterface>[] = JSON.parse(
      localStorage.getItem('formDatas') || '[]'
    );

    this.myForms = storedForms
      .filter((form: Partial<FormInterface>) => form.formId === userId)
      .map((form: Partial<FormInterface>) => {
        return {
          name: form.name || '',
          grade: form.grade || 0,
          major: form.major || 0,
          description: form.description || '',
          formId: form.formId || 0,
          status: form.status || '',
        };
      });
  }

  search(): void {
    if (this.searchedValue) {
      const filteredForms = this.myForms.filter((form) =>
        form.name.toLowerCase().startsWith(this.searchedValue.toLowerCase())
      );
      this.myForms = filteredForms;
    }
  }
}
