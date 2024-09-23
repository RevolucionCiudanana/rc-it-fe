import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomepageComponent],
  imports: [ReactiveFormsModule, CommonModule, SharedModule, HomepageRoutingModule],
})
export class HomepageModule { }
