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
          'fill-color': '#088',
          'fill-opacity': 0.8
        }
      });
    });
  }

  inc = 10;
  placeExample() {
    this.map.on('mousedown', e => {
      console.log("lng:", e.lngLat.lng, "lat:", e.lngLat.lat);
      console.log();

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
