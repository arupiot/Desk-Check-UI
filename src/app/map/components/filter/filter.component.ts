import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { OnOff } from '../../models/OnOff.model';
import {Floor} from '../../models/floor.model';

import { UserService } from '../../../core/services/userService/user-service.service';
import { Observable } from 'rxjs';
import { Filters } from '../../models/filters.model';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() filters = new EventEmitter<Filters>();

  constructor(
    private userService: UserService
  ) { }

  isFM: Observable<boolean>;

  brandControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  floors: Floor[] = [
    { value: 0, viewValue: 0 },
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
  ];
  OnOffs: OnOff[] = [
    { value: true, viewValue: "On"},
    { value: false, viewValue: "Off"},
  ];

  filtered: Filters = {
    floor: 0,
    temp: false,
    CO2: false,
    noise: false
  }

  ngOnInit() {
    this.isFM = this.userService.isFM;
  }
  filterUpdate(): void {
    console.log("emit");
    this.filters.emit(this.filtered);
  }
}
