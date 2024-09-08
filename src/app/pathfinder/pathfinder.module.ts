import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { RouterModule, Routes } from '@angular/router';
import { NodeDirective } from './board/node.directive';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { menuOptionReducer } from 'src/core/ngrx/menuoptions/menuoptions.reducer';
import { PathfinderRoutingModule } from './pathfinder-routing.module';


@NgModule({
  declarations: [
    BoardComponent,
    NodeDirective
  ],
  imports: [
    CommonModule,
    PathfinderRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatMenuModule,
    PathfinderRoutingModule,
    StoreModule.forRoot({menuOption: menuOptionReducer}, {})
  ]
})
export class PathfinderModule { }
