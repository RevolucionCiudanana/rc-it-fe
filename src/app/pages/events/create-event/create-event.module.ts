import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEventRoutingModule } from './create-event-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../shared/shared.module";
import { BrowserModule } from '@angular/platform-browser';
import { CreateEventComponent } from './create-event.component';


@NgModule({
  declarations: [
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CreateEventRoutingModule,
    SharedModule
  ]
})
export class CreateEventModule { }
