import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  brandControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  brands: Brand[] = [
    { value: 'Louis Vuitton', viewValue: 'Louis Vuitton'},
    { value: 'Gucci', viewValue: 'Gucci'},
    { value: 'Prada', viewValue: 'Prada' },
    { value: 'Chanel', viewValue: 'Chanel' },
  ];

  constructor() { }

  ngOnInit() {
  }

}

export interface Brand {
  value: String;
  viewValue: string;
}
