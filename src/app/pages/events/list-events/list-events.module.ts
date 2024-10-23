import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ListEventsComponent } from './list-events.component';
import { ListEventsRoutingModule } from './list-events-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [ListEventsComponent],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule, // Ensure TranslateModule is imported properly
        SharedModule,
        ListEventsRoutingModule,
    ],
})
export class ListEventsModule { }
