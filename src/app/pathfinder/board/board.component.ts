import { Component, Inject, QueryList, ViewChildren } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { pathfinder } from 'src/core/ngrx/menuoptions/menuoptions.actions';
import { NodeDirective } from './node.directive';
import { ColorNode } from 'src/core/animate/ColorNode';
import { MazeAlgorithmsImpl } from 'src/core/graphlib/algorithms/MazeAlgorithmsImpl';
import { BFS, DFS, SPLCOLOR_PATH } from 'src/core/common/Constants';
import { MiscellaneousAlgorithms } from 'src/core/graphlib/algorithms/MiscellaneousAlgorithms';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  rows:number[]
  columns:number[] 
  cell: string
    
  algorithmMenu: string[] = []
  mazeMenu: string[] = []
  selectedApplication: any
  colorNode: ColorNode
  selectedPathFinder: string

  @ViewChildren(NodeDirective)
  nodes: QueryList<NodeDirective>|undefined

  constructor(@Inject(Store) private store: Store<{menuOption: {algorithms: string[], mazePattern: string[]}}>) {
    this.rows = []
    this.columns = []
    this.cell = 'cell'
    
    this.colorNode = new ColorNode()
    this.selectedPathFinder = `Choose an Algorithm`
    this.selectedApplication = `${this.selectedPathFinder}`
    NodeDirective.colorNode = this.colorNode
    store.pipe(select('menuOption')).subscribe(data => {
      this.algorithmMenu = data.algorithms
      this.mazeMenu = data.mazePattern
    });
  }

  ngAfterViewInit() {
    NodeDirective.row = this.rows.length
    NodeDirective.col = this.columns.length
    NodeDirective.graph.colLen = this.columns.length
    NodeDirective.graph.rowLen = this.rows.length
    NodeDirective.computeStartAndEnd()
    NodeDirective.graph.source.el.nativeElement.innerHTML = NodeDirective.startIcon()
    NodeDirective.graph.destination.el.nativeElement.innerHTML = NodeDirective.endIcon()
  }

  ngOnInit() {
    let board = document.getElementById('boardContainer')
    let width = board?.offsetWidth;
    let height = board?.offsetHeight;

    if(width != null && height != null) {
      let temp1:number;
      temp1 = Math.floor(width/24);
      if(temp1%2 == 0) temp1--;
  
      let temp2:number;
      temp2 = Math.floor(height/24)-2;
      if(temp2%2 == 0) temp2--;
  
      for(let i = 0; i<temp2; i++) this.rows.push(i);
      for(let i = 0; i<temp1; i++) this.columns.push(i);
    }
    this.store.dispatch(pathfinder()) 

  }

  ngOnChanges() {

  }

  onClickHandler($event: Event) {
    const input = $event.target as HTMLElement;
    this.selectedApplication = input.innerText;
  }

  resetBoard() {
    NodeDirective.resetAll(this.colorNode)
  }

  async algorithmRunHandler(event: Event) {
    event.preventDefault()
    const button = event.target as HTMLButtonElement;
    NodeDirective.isProcessing = true
    NodeDirective.algoExecuted = true
    if(button.innerText === BFS) {
      this.selectedPathFinder = BFS
      await NodeDirective.runPathFinder(true, button.innerText)
    } else if(button.innerText === DFS) {
      this.selectedPathFinder = DFS
      await NodeDirective.runPathFinder(true, DFS)
    } 
    else {
      NodeDirective.resetAll(this.colorNode)
    }
  

    NodeDirective.isProcessing = false
  }

  handleAlgorithmSelection(event: MouseEvent) {
    const element = event.target as HTMLButtonElement;
    this.selectedPathFinder = element.innerText;
  }
 
  
  async mazeAlgorithm(event: MouseEvent) {
    const element = event.target as HTMLButtonElement;
    NodeDirective.isProcessing = true
    NodeDirective.resetAll(this.colorNode)


    let walls:Array<number> = new Array();
    if(element.innerText === `Recursive division`) {
      walls = MazeAlgorithmsImpl.recursiveDivisionMaze(NodeDirective.graph, NodeDirective.col, NodeDirective.row, NodeDirective.graph.source.id, NodeDirective.graph.destination.id);
      this.paintWalls(walls);
    } else if(element.innerText === `Recursive division (horizontal)`) {
      walls = MazeAlgorithmsImpl.recursiveDivisionHorizontalMaze(NodeDirective.graph, NodeDirective.col, NodeDirective.row, NodeDirective.graph.source.id, NodeDirective.graph.destination.id )
      this.paintWalls(walls);
    } else if(element.innerText === `Recursive division (vertical)`) {
      walls = MazeAlgorithmsImpl.recursiveDivisionVerticalMaze(NodeDirective.graph, NodeDirective.col, NodeDirective.row, NodeDirective.graph.source.id, NodeDirective.graph.destination.id )
      this.paintWalls(walls);
    } else if(element.innerText === `Random walls`) {
      walls = MiscellaneousAlgorithms.randomWalls(NodeDirective.graph, NodeDirective.col, NodeDirective.row, NodeDirective.graph.source.id, NodeDirective.graph.destination.id)
      for(let i = 0; i< walls.length; i++) {
        if(this.nodes !== undefined)
          NodeDirective.setWall(NodeDirective.graph.nodes[walls[i]].id);
          this.colorNode.setColor(NodeDirective.graph.nodes[walls[i]], true)
      }
    }
      
    NodeDirective.isProcessing = false
  }

  async paintWalls(walls: Array<number>) {
    for(let i = 0; i< walls.length; i++) {
      if(this.nodes !== undefined)
        NodeDirective.setWall(NodeDirective.graph.nodes[walls[i]].id);
        await this.colorNode.setColor(NodeDirective.graph.nodes[walls[i]], true)
    }
  }
}
