import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomepageComponent],
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, SharedModule, HomepageRoutingModule],
})
export class HomepageModule { }
