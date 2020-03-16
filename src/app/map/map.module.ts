import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { environment } from '../../environments/environment';

import {
  MatButtonModule
} from '@angular/material/button';

// modules
import { MapRoutingModule } from './map-routing.module';

// containers
import { MapPageComponent } from './containers/map-page/map-page.component';

// components
import { FilterComponent } from './components/filter/filter.component';
import { FloorplanComponent } from './components/floorplan/floorplan.component';

@NgModule({
  declarations: [FilterComponent, FloorplanComponent, MapPageComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    MatButtonModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken
    })
  ]
})
export class MapModule { }
