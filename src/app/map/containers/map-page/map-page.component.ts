import { Component, OnInit } from '@angular/core';
import { Filters } from '../../models/filters.model';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  filters: Filters = {
    floor: 0,
    temp: false,
    CO2: false
  };

  updateFilters(f: Filters): void {
    this.filters = Object.assign({}, f);
  }

}
