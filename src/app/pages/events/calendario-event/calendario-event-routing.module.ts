import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioEventComponent } from './calendario-event.component';

const routes: Routes = [
    {
        path: '',
        component: CalendarioEventComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CalendarioEventRoutingModule { }
