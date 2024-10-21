import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListMemberComponent } from './list-member/list-member.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MembersRoutingModule
  ],
  declarations: [
    ListMemberComponent,
  ]
})
export class MembersModule { }
