import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create-event.component';
import { StepOneComponent } from './steps/step-one/step-one.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: CreateEventComponent,
      children: [
        { path: '', redirectTo: 'step-1', pathMatch: 'full' },
        { path: 'step-1', component: StepOneComponent },
      ]
    }
  ])], exports: [RouterModule]
})
export class CreateEventRoutingModule { }
