import { Component, OnInit } from '@angular/core';
import { FormInterface } from '../app-interfaces';
import { FormService } from '../form.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  formDatas: FormInterface[] = [];
  p: number = 1;
  isAdmin: boolean = false;
  searchedValue: string = '';
  showModal: boolean = false;
  newStatus: string = '';
  formDataObj: Partial<FormInterface> = {};
  statusOptions: string[] = ['تایید شده', 'رد شده'];
  sortOptions: string[] = ['از دهم به دوازدهم', 'از دوازدهم به دهم'];
  selectedSortOrder: string = '';

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    const storedUsers = JSON.parse(localStorage.getItem('loginUser') || '[]');
    if (storedUsers) {
      const user = storedUsers;
      this.isAdmin = user.isAdmin;
    }
    const storedData = localStorage.getItem('formDatas');
    this.formDatas = JSON.parse(storedData || '[]');
  }

  search(): void {
    if (this.searchedValue) {
      const filteredForms = this.formDatas.filter((form) =>
        form.name.toLowerCase().startsWith(this.searchedValue.toLowerCase())
      );
      this.formDatas = filteredForms;
    }
  }

  sortForms() {
    if (this.selectedSortOrder === 'descending') {
      this.formDatas.sort((a, b) => b.grade - a.grade);
    } else {
      this.formDatas.sort((a, b) => a.grade - b.grade);
    }
  }

  openModal(formData: FormInterface) {
    this.formDataObj = formData;
    this.showModal = true;
  }

  submitStatus() {
    const index = this.formDatas.findIndex(
      (f) => f.formId === this.formDataObj.formId
    );

    this.formDatas[index].status = this.newStatus;

    localStorage.setItem('formDatas', JSON.stringify(this.formDatas));

    this.closeModal();
  }

  closeModal() {
    this.newStatus = '';

    this.showModal = false;
  }

  getGradeString(grade: number | string): string {
    let x;
    switch (grade) {
      case '10':
        x = 'دهم';
        break;
      case '11':
        x = 'یازدهم';
        break;
      case '12':
        x = 'دوازدهم';
        break;
      default:
        x = '';
    }
    return x;
  }

  getMajorString(major: string | number): string {
    let y;
    switch (major) {
      case '1':
        y = 'کامپیوتر';
        break;
      case '2':
        y = 'حسابداری';
        break;
      case '3':
        y = 'برق خودرو';
        break;
      case '4':
        y = 'مکانیک';
        break;
      default:
        y = '';
    }
    return y;
  }
}
