import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { PageSelectPageComponent } from './containers/page-select-page/page-select-page.component';

const routes: Routes = [
    {
        path: '',
        component: PageSelectPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageSelectRoutingModule {}