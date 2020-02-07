import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { FloorplanComponent } from './components/floorplan/floorplan.component';
import { MapPageComponent } from './containers/map-page/map-page.component';



@NgModule({
  declarations: [FilterComponent, FloorplanComponent, MapPageComponent],
  imports: [
    CommonModule
  ]
})
export class MapModule { }
