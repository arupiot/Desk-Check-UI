import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { DashboardRoutingModule } from './dashboard-routing.module';

// containers
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';



@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
