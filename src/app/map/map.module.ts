import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ]
})
export class MapModule { }
