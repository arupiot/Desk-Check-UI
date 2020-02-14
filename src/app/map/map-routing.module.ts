import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { MapPageComponent } from './containers/map-page/map-page.component';

const routes: Routes = [
    {
        path: '',
        component: MapPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule {}