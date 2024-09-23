import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { CalendarioComponent } from './calendario.component';
import { CalendarioRoutingModule } from './calendario-routing.module';


@NgModule({
    declarations: [
        CalendarioComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CalendarioRoutingModule
    ]
})
export class CalendarioModule { }
