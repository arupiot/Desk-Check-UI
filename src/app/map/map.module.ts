import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { FloorplanComponent } from './components/floorplan/floorplan.component';
import { MapPageComponent } from './containers/map-page/map-page.component';
import { ContainersComponent } from './page-select/containers/containers.component';
import { PageSelectPageComponent } from './page-select/containers/page-select-page/page-select-page.component';



@NgModule({
  declarations: [FilterComponent, FloorplanComponent, MapPageComponent, ContainersComponent, PageSelectPageComponent],
  imports: [
    CommonModule
  ]
})
export class MapModule { }
