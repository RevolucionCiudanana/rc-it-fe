import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventsComponent } from './list-events.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: ListEventsComponent,
        }
    ])], exports: [RouterModule]
})
export class ListEventsRoutingModule { }
