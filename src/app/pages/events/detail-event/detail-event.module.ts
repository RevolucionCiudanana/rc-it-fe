import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailEventRoutingModule } from './detail-event-routing.module';
import { DetailEventComponent } from './detail-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DetailEventComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DetailEventRoutingModule
  ]
})
export class DetailEventModule { }
