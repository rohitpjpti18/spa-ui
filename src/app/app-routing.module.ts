import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathfinderModule } from './pathfinder/pathfinder.module';

const routes: Routes = [
  //{ path: 'pathfinder', loadChildren: () => import('./pathfinder/pathfinder.module').then(m => m.PathfinderModule)}
  { path: '', redirectTo: '/pathfinder', pathMatch: 'full'},
  { path: 'path', redirectTo: '/pathfinder', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
