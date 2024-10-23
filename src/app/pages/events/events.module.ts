import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule,
  ]
})
export class EventsModule { }
