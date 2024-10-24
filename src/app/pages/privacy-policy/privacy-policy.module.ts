import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';

@NgModule({
    declarations: [
        PrivacyPolicyComponent],
    imports: [ReactiveFormsModule, CommonModule, SharedModule, TranslateModule, PrivacyPolicyRoutingModule],
})
export class PrivacyPolicyModule { }
