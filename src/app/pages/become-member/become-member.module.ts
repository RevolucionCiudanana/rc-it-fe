import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BecomeMemberComponent } from './become-member.component';
import { BecomeMemberRoutingModule } from './become-member-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        BecomeMemberComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BecomeMemberRoutingModule
    ]
})
export class BecomeMemberModule { }
