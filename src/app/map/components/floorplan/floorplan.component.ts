import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { MapService } from '../../services/map/map.service';
import { DeskService } from '../../services/desk/desk.service';

import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';
import { Filters } from '../../models/filters.model';
import { Desk } from 'src/app/core/models/Desk.model';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.scss']
})
export class FloorplanComponent implements OnInit, OnChanges {
  @Input() filters: Filters;

  ngOnChanges() {
    this.updateMapDesk();
  }

  constructor(
    private mapService: MapService,
    private deskService: DeskService,
  ) { }

  floor: number = 0;

  geoJson: any;
  desks: Desk[];

  oldFilters: Filters;

  rotation: number = this.toRadians(22); // anticlockwise rotation, radian conversion handled by the function

  deskSize: number = 0.000005;

  updateTime: number = 10; // number of seconds between data updates

  map: mapboxgl.Map;
  style: string = 'mapbox://styles/mapbox/light-v9';

  ngOnInit() {
    this.updateMapDesk();
  }

  updateMapDesk() {
    this.mapService.getSingle(this.filters.floor).subscribe(res => {
      this.geoJson = res;

      this.deskService.getAll().subscribe(res => {
        this.desks = res.filter(d => d.floor === +this.filters.floor);

        this.drawMap();
      });
    }, err => {
      console.log("err:", err);
    });
  }

  drawMap() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;

    const center: { [key: string]: [number, number] } = { default: [-0.137450,51.521942], test: [0,51] };

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 19,
      minZoom: 18,
      maxZoom: 22,
      center: center.default,
      bearing: 325
    });

    this.map.on('style.load', event => {

      this.drawDesks();

      this.updateDeskColors();

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
            'line-width': 2
          }
      });
    });

    // this.placeExample();
  }

  toRadians(angle): number {
    return angle * (Math.PI/180);
  }

  calcPoint(x, y, cX, cY, adjust): number[] {
    return [(((x-cX)*Math.cos(this.rotation))-((y-cY)*Math.sin(this.rotation-adjust)))+cX,((x-cX)*Math.sin(this.rotation))+((y-cY)*Math.cos(this.rotation-adjust))+cY];
  }

  drawDesks() {
    this.desks.forEach(d => {
      // To make the desks actually square, divide the deskSize by 2 on points where deskSize is subtracted from cY (e.g. `cY-this.deskSize`)
      // To find the rotation of each desk https://math.stackexchange.com/questions/270194/how-to-find-the-vertices-angle-after-rotation
      const cX: number = d.x;// The x coordinate of the centre point of the desk
      const cY: number = d.y;// The y coordinate of the centre point of the desk

      const adjustAngle = this.toRadians(-53);

      const p1 = this.calcPoint(cX-this.deskSize,cY-this.deskSize,cX,cY,adjustAngle);
      const p2 = this.calcPoint(cX-this.deskSize,cY+this.deskSize,cX,cY,0);
      const p3 = this.calcPoint(cX+this.deskSize,cY+this.deskSize,cX,cY,0);
      const p4 = this.calcPoint(cX+this.deskSize,cY-this.deskSize,cX,cY,adjustAngle);

      const data: any = {
        type: 'Feature',
        properties: {
          description: d
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              p1,
              p2,
              p3,
              p4,
              p1,
            ]
          ]
        }
      }

      this.map.addSource('desk' + d.deskID, {
        type: 'geojson',
        data: data
      });

      this.map.addLayer({
        id: 'desk' + d.deskID,
        type: 'fill',
        source: 'desk' + d.deskID,
        layout: {},
        paint: {
          'fill-color': this.calcColor(d),
          'fill-opacity': 0.8
        }
      });
    });
  }

  updateDeskColors() {
    window.setInterval(() => {
      this.deskService.getAll()
      .subscribe(res => {
        this.desks = res.filter(d => d.floor === +this.filters.floor);

        this.desks.forEach(d => {
            const layerId = 'desk' + d.deskID;

            this.map.setPaintProperty(layerId,'fill-color',this.calcColor(d));
        });
      });
    }, this.updateTime*1000);
  }

  calcColor(desk: Desk): string {
    let range: number; // The size of the possible range of values for the sensor
    let bottomValue: number; // The lowest possible value of the sensor
    let adjusted : number;
    let halfRange : number;

    if (this.filters.CO2) {
      bottomValue = 400;
      range = 200;
      adjusted = desk.cO2-bottomValue;
    } else if (this.filters.temp) {
      bottomValue = 15;
      range = 10;
      adjusted = desk.temp-bottomValue;
    } else {
      return desk.available ? '#00ff00' : '#ff0000';
    }

    halfRange = range/2;

    const color : string = adjusted > halfRange ? this.percentageToHsl((adjusted-halfRange)/halfRange,120,0) : this.percentageToHsl(adjusted/halfRange,0,120);

    return color;
  }
  percentageToHsl(percentage, hue0, hue1) {
    var hue = (percentage * (hue1 - hue0)) + hue0;
    return 'hsl(' + hue + ', 100%, 50%)';
  }

  inc = 1000;
  placeExample() {
    this.map.on('mousedown', e => {
      console.log("lng:", e.lngLat.lng, "lat:", e.lngLat.lat);

      let d = {
        deskID: this.inc,
        x: e.lngLat.lng,
        y: e.lngLat.lat
      }
      this.inc ++;

      const cX: number = d.x;// The x coordinate of the centre point of the desk
      const cY: number = d.y;// The y coordinate of the centre point of the desk

      const adjustAngle = -53;

      const p1X: number = ((((cX-this.deskSize)-cX)*Math.cos(this.rotation))-(((cY-this.deskSize)-cY)*Math.sin(this.rotation-this.toRadians(adjustAngle))))+cX;
      const p2X: number = ((((cX-this.deskSize)-cX)*Math.cos(this.rotation))-(((cY+this.deskSize)-cY)*Math.sin(this.rotation)))+cX;
      const p3X: number = ((((cX+this.deskSize)-cX)*Math.cos(this.rotation))-(((cY+this.deskSize)-cY)*Math.sin(this.rotation)))+cX;
      const p4X: number = ((((cX+this.deskSize)-cX)*Math.cos(this.rotation))-(((cY-this.deskSize)-cY)*Math.sin(this.rotation-this.toRadians(adjustAngle))))+cX;

      const p1Y: number = (((cX-this.deskSize)-cX)*Math.sin(this.rotation))+(((cY-this.deskSize)-cY)*Math.cos(this.rotation-this.toRadians(adjustAngle)))+cY;
      const p2Y: number = (((cX-this.deskSize)-cX)*Math.sin(this.rotation))+(((cY+this.deskSize)-cY)*Math.cos(this.rotation))+cY;
      const p3Y: number = (((cX+this.deskSize)-cX)*Math.sin(this.rotation))+(((cY+this.deskSize)-cY)*Math.cos(this.rotation))+cY;
      const p4Y: number = (((cX+this.deskSize)-cX)*Math.sin(this.rotation))+(((cY-this.deskSize)-cY)*Math.cos(this.rotation-this.toRadians(adjustAngle)))+cY;

      const data: any = {
        type: 'Feature',
        properties: {
          description: d
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [p1X,p1Y],
              [p2X,p2Y],
              [p3X,p3Y],
              [p4X,p4Y],
              [p1X,p1Y],
            ]
          ]
        }
      }

      this.map.addSource('desk' + d.deskID, {
        type: 'geojson',
        data: data
      });

      this.map.addLayer({
        id: 'desk' + d.deskID,
        type: 'fill',
        source: 'desk' + d.deskID,
        layout: {},
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8
        }
      });

      this.deskService.add(this.filters.floor, d.x, d.y).subscribe(res => console.log("success", res));
    })
  }
}
