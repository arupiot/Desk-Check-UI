import { Component, OnInit } from '@angular/core';

import { MapService } from '../../services/map/map.service';

import { environment } from 'src/environments/environment';

// import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.scss']
})
export class FloorplanComponent implements OnInit {
  constructor(
    private mapService: MapService,
  ) { }

  ngOnInit() {
    this.mapService.getSingle(1).subscribe(res => {
      console.log("res:", res);
    }, err => {
      console.log("err:", err);
    });
  }
}
