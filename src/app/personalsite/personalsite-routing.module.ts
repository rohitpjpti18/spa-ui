import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PersonalSiteComponent } from "./personalsite.component";

const personalRoutes: Routes = [
    {path: 'personal', component: PersonalSiteComponent}
];
  

@NgModule({
    imports: [
        RouterModule.forChild(personalRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PersonalSiteRoutingModule {}