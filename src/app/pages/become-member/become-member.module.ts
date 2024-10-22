import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BecomeMemberComponent } from './become-member.component';
import { BecomeMemberRoutingModule } from './become-member-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        BecomeMemberComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        SharedModule,
        BecomeMemberRoutingModule
    ]
})
export class BecomeMemberModule { }
