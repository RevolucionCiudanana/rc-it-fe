import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrgChartComponent } from './org-chart.component';
import { OrgChartRoutingModule } from './org-chart-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        OrgChartComponent],
    imports: [ReactiveFormsModule, CommonModule, SharedModule, TranslateModule, OrgChartRoutingModule],
})
export class OrgChartModule { }
