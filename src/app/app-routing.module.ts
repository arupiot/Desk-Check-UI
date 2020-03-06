import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // { path: '', redirectTo: '/page-select', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }, {
    path: 'map',
    loadChildren: () =>
      import('./map/map.module').then(m => m.MapModule)
  }, {
    path: 'page-select',
    loadChildren: () =>
      import('./page-select/page-select.module').then(m => m.PageSelectModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
