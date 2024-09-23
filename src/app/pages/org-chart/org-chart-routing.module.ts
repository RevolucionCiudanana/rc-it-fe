import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgChartComponent } from './org-chart.component';

const routes: Routes = [
    {
        path: 'organigramma',
        component: OrgChartComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrgChartRoutingModule { }
