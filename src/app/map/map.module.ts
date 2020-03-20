import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MapModule { }

