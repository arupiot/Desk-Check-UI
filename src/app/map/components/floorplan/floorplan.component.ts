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

    // this.placeExample();
  }

  toRadians(angle): number {
    return angle * (Math.PI/180);
  }

  drawDesks() {
    this.desks.forEach(d => {
      // To make the desks actually square, divide the deskSize by 2 on points where deskSize is subtracted from cY (e.g. cY-this.deskSize)
      // To find the rotation of each desk https://math.stackexchange.com/questions/270194/how-to-find-the-vertices-angle-after-rotation
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
          'fill-color': this.calcColor(d),
          'fill-opacity': 0.8
        }
      });
    });
  }

  calcColor(desk: Desk): string {
    let value: number;
    let range: number;
    let bottomValue: number;

    if (this.filters.CO2) {
      bottomValue = 400;
      range = 200;
      value = (desk.cO2-bottomValue)/range;
    } else if (this.filters.temp) {
      bottomValue = 15;
      range = 10;
      value = (desk.temp-bottomValue)/range;
    } else return '#088';

    let hue = ((1-value)*120).toString(10);

    return this.hslToHex(hue,100,50);
  }

  hslToHex(h, s, l) { // from https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  inc = 10;
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
    })
  }
}
