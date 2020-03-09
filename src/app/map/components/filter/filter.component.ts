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
  floors: Floor[] = [
    { value: 1, viewValue: 1},
    { value: 2, viewValue: 2},
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4},
    { value: 5, viewValue: 5},
  ];
  OnOffs: OnOff[] = [
    { value: true, viewValue: "On"},
    { value: false, viewValue: "Off"},
  ];
  selectedFloorValue = undefined;
  selectedTempValue = undefined;
  selectedCO2Value = undefined;
  selectedNoiseValue = undefined;
  selected = undefined;
  isFM: Boolean=true;

  
  constructor() { }

  ngOnInit() {
  }
  ChangeFloorButton(selectedFloorValue){
    console.log(selectedFloorValue);
  }
  ChangeTempButton(selectedTempValue){
    console.log(selectedTempValue);
  }
  ChangeCO2Button(selectedCO2Value){
    console.log(selectedCO2Value);
  }
  ChangeNoiseButton(selectedNoiseValue){
    console.log(selectedNoiseValue);
  }

}

export interface Floor {
  value: number;
  viewValue: number;
}
export interface OnOff {
  value: Boolean;
  viewValue: string;
}
