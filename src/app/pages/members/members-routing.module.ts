import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMemberComponent } from './list-member/list-member.component';

const routes: Routes = [
  { path: 'list-member', component: ListMemberComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
