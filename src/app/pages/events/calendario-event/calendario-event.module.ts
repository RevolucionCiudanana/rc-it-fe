import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { CalendarioEventComponent } from './calendario-event.component';
import { CalendarioEventRoutingModule } from './calendario-event-routing.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
        CalendarioEventComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        CalendarioEventRoutingModule
    ]
})
export class CalendarioEventModule { }
