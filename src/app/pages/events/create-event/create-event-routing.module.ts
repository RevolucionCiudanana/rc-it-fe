import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateEventComponent } from './create-event.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: CreateEventComponent,
    }
  ])], exports: [RouterModule]
})
export class CreateEventRoutingModule { }
