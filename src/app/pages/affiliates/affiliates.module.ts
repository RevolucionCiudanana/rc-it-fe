import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AffiliatesComponent } from './affiliates.component';
import { AffiliatesRoutingModule } from './affiliates-routing.module';


@NgModule({
    declarations: [
        AffiliatesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AffiliatesRoutingModule
    ]
})
export class AffiliatesModule { }
