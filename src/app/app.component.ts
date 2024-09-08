import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { reset } from 'src/core/ngrx/menuoptions/menuoptions.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pathfinder-visualizer';

  constructor(private store: Store<{menuOption: {algorithms: string[], mazePattern: string[]}}>) {
    
  }


  ngOnInit() {
    this.store.dispatch(reset())
  }
}
