import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { PageSelectRoutingModule } from './page-select-routing.module';

// containers
import { PageSelectPageComponent } from './containers/page-select-page/page-select-page.component';

@NgModule({
  declarations: [PageSelectPageComponent],
  imports: [
    CommonModule,
    PageSelectRoutingModule
  ]
})
export class PageSelectModule { }
