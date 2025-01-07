import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormInterface } from '../app-interfaces';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css'],
})
export class FormDetailsComponent implements OnInit {
  formDatas: FormInterface[] = [];
  selectedIndex!: number;
  selectedFormData!: FormInterface;
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('formDatas');

    this.formDatas = JSON.parse(storedData || '[]');
    this.route.paramMap.subscribe((params) => {
      const indexParam = params.get('index');
      if (indexParam) {
        this.selectedIndex = +indexParam;
        this.selectedFormData = this.formDatas[this.selectedIndex];
      }
    });
  }
  onGoBack() {
    this.location.back();
  }
}
