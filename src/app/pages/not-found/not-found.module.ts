import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
    declarations: [NotFoundComponent],
    imports: [CommonModule, SharedModule, NotFoundRoutingModule],
})
export class NotFoundModule { }
