import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

const routes: Routes = [
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TermsAndConditionsRoutingModule { }
