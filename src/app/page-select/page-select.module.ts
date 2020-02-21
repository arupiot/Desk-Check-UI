import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule
 } from '@angular/material/button';


// modules
import { PageSelectRoutingModule } from './page-select-routing.module';

// containers
import { PageSelectPageComponent } from './containers/page-select-page/page-select-page.component';


@NgModule({
  declarations: [PageSelectPageComponent],
  imports: [
    CommonModule,
    PageSelectRoutingModule,
    MatButtonModule,
  ]
})
export class PageSelectModule { }
