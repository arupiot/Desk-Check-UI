import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { OnOff } from '../../models/OnOff.model';
import {Floor} from '../../models/floor.model';

import { UserService } from '../../../core/services/userService/user-service.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  constructor(
    private userService: UserService
  ) { }

  isFM: Observable<boolean>;

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

  ngOnInit() {
    this.isFM = this.userService.isFM;
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



