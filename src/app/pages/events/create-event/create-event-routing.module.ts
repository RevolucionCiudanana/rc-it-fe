import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create-event.component';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { StepThreeComponent } from './steps/step-three/step-three.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: CreateEventComponent,
      children: [
        { path: '', redirectTo: 'step-1', pathMatch: 'full' },
        { path: 'step-1', component: StepOneComponent },
        { path: 'step-2', component: StepTwoComponent },
        { path: 'step-3', component: StepThreeComponent },
      ]
    }
  ])], exports: [RouterModule]
})
export class CreateEventRoutingModule { }
