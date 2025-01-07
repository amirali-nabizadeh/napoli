import { Component, OnInit } from '@angular/core';
import { FormInterface, Login, User } from '../app-interfaces';
import { FormService } from '../form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formDatas: Partial<FormInterface>[] = [];
  loggedUser: Login[] = [];

  formDataObj: FormInterface = {
    name: '',
    grade: 0,
    major: 0,
    description: '',
    formId: 0,
    status: 'در حال بررسی',
  };

  gradeOptions: { value: number; name: string }[] = [
    { value: 10, name: 'دهم' },
    { value: 11, name: 'یازدهم' },
    { value: 12, name: 'دوازدهم' },
  ];

  majorOptions: { value: number; name: string }[] = [
    { value: 1, name: 'کامپیوتر' },
    { value: 2, name: 'حسابداری' },
    { value: 3, name: 'برق خودرو' },
    { value: 4, name: 'مکانیک' },
  ];

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  onSaveForm() {
    const loggedInUser: Login = JSON.parse(
      localStorage.getItem('loginUser') || '{}'
    );

    this.formDatas = JSON.parse(localStorage.getItem('formDatas') || '[]');
    if (
      !this.formDataObj.name ||
      !this.formDataObj.grade ||
      !this.formDataObj.major ||
      !this.formDataObj.description
    ) {
      alert('!لطفا تمام فیلد های مشخص شده را پر کنید');
      return;
    } else {
      const formDataCopy = { ...this.formDataObj };
      this.formDataObj.formId = loggedInUser.userId;
      this.formService.setForm(formDataCopy);
      this.formDatas.push(this.formDataObj);
      localStorage.setItem('formDatas', JSON.stringify(this.formDatas));
    }
    this.formDataObj = {
      name: '',
      grade: 0,
      major: 0,
      description: '',
      formId: 0,
      status: 'در حال بررسی',
    };
  }
}
