import { Component, OnInit, Input } from '@angular/core';

import { MapService } from '../../services/map/map.service';

import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';
import { Filters } from '../../models/filters.model';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.scss']
})
export class FloorplanComponent implements OnInit {
  @Input() filters: Filters;

  constructor(
    private mapService: MapService,
  ) { }

  floor: number = 0;

  geoJson: any;

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v9';

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;

    const center: { [key: string]: [number, number] } = { default: [-0.137450,51.521942] };


    this.mapService.getSingle(this.floor).subscribe(res => {
      this.geoJson = res;

      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 19,
        minZoom: 4,
        maxZoom: 22,
        center: center.default
      });

      this.map.on('style.load', event => {
        this.map.addSource('no8', {
          type: 'geojson',
          data: this.geoJson
        });

        this.map.addLayer({
            id: 'no8',
            type: 'line',
            source: 'no8',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#888',
              'line-width': 4
            }
        });
      });
    }, err => {
      console.log("err:", err);
    });
  }
}
