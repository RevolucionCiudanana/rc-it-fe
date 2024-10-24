import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListMemberComponent } from './list-member/list-member.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    MembersRoutingModule,

  ],
  declarations: [
    ListMemberComponent,
  ]
})
export class MembersModule { }
