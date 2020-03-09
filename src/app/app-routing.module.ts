import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './core/components/login/login.component';

// Guards
import { AuthGuard } from './auth/guards/auth.guard';
import { LoggedInGuard } from './auth/guards/logged-in.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoggedInGuard] // This guard is mainly here as a precaution, it is unlikely that the user could get here when authenticated, but just incase
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }, {
    path: 'map',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./map/map.module').then(m => m.MapModule)
  }, {
    path: 'page-select',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./page-select/page-select.module').then(m => m.PageSelectModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
