import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailEventComponent } from './detail-event.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: DetailEventComponent,
    }
  ])], exports: [RouterModule]
})
export class DetailEventRoutingModule { }
