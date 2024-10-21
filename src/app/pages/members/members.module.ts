import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListMemberComponent } from './list-member/list-member.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    MembersRoutingModule
  ],
  declarations: [
    ListMemberComponent,
  ]
})
export class MembersModule { }
