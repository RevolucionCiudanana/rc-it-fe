import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEventRoutingModule } from './create-event-routing.module';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../shared/shared.module";


@NgModule({
  declarations: [
    StepOneComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CreateEventRoutingModule,
    SharedModule
  ]
})
export class CreateEventModule { }
