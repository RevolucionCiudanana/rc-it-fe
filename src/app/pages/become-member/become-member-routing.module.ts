import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BecomeMemberComponent } from './become-member.component';

const routes: Routes = [
    {
        path: 'become-member',
        component: BecomeMemberComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BecomeMemberRoutingModule { }
