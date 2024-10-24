import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

@NgModule({
    declarations: [
        TermsAndConditionsComponent],
    imports: [ReactiveFormsModule, CommonModule, SharedModule, TranslateModule, TermsAndConditionsRoutingModule],
})
export class TermsAndConditionsModule { }
