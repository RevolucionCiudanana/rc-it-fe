import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule qui

import { ListEventsComponent } from './list-events.component';
import { ListEventsRoutingModule } from './list-events-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        ListEventsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ListEventsRoutingModule,
    ],
    exports: [
        ListEventsComponent
    ]
})
export class ListEventsModule { }
