import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMemberComponent } from './list-member/list-member.component';
import { ChartsMemberComponent } from './charts-member/charts-member.component';

const routes: Routes = [
  { path: 'list-member', component: ListMemberComponent },
  { path: 'charts-member', component: ChartsMemberComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
