import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalSiteComponent } from './personalsite.component';
import { PersonalSiteRoutingModule } from './personalsite-routing.module';



@NgModule({
  declarations: [
    PersonalSiteComponent
  ],
  imports: [
    CommonModule,
    PersonalSiteRoutingModule
  ]
})
export class PersonalSiteModule { }
