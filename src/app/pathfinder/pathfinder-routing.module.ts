import { RouterModule, Routes } from "@angular/router";
import { BoardComponent } from "./board/board.component";
import { NgModule } from "@angular/core";

const pathfinderRoutes: Routes = [
    {path: 'pathfinder', component: BoardComponent}
];
  

@NgModule({
    imports: [
        RouterModule.forChild(pathfinderRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PathfinderRoutingModule {}