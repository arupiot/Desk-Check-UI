import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './core/components/login/login.component';
import { CallbackComponent } from './core/components/callback/callback.component';

// Guards
import { AuthGuard } from './auth/guards/auth.guard';
import { FmGuard } from './core/guard/fm/fm.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }, {
    path: 'callback',
    component: CallbackComponent
  }, {
    path: 'dashboard',
    canActivate: [AuthGuard, FmGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }, {
    path: 'map',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./map/map.module').then(m => m.MapModule)
  }, {
    path: 'page-select',
    canActivate: [AuthGuard, FmGuard],
    loadChildren: () =>
      import('./page-select/page-select.module').then(m => m.PageSelectModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
