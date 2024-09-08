import { Directive, ElementRef, Host, HostListener, Inject, QueryList, ViewChildren } from '@angular/core';
import { ColorNode } from 'src/core/animate/ColorNode';
import { BFS, DFS, SPLCOLOR_PATH } from 'src/core/common/Constants';
import { Graph } from 'src/core/graphlib/datastructures/Graph';
import { GraphNode } from 'src/core/graphlib/datastructures/GraphNode';
import { GraphUndirectedEdge } from 'src/core/graphlib/datastructures/GraphUndirectedEdge';

@Directive({
  selector: '[appNode]'
})
export class NodeDirective {
  static isClicked = false
  static startSelected = false
  static endSelected = false
  static overLapping = false
  static isProcessing = false
  static col: number
  static row: number
  static graph:Graph = new Graph(new Array<GraphNode>(), new Array<GraphUndirectedEdge>())
  static colorNode:ColorNode = new ColorNode()
  static visitedNodes: Array<GraphNode> = new Array<GraphNode>()
  static wallNodes: Array<GraphNode> = new Array<GraphNode>()
  static pathNodes: Array<GraphNode> = new Array<GraphNode>()
  static algoExecuted: boolean = false;

  static startIcon():string {
    return `S`
  }

  static endIcon():string {
    return `D`
  }

  static removeIcon():string {
    return ``;
  }

  static computeNeighbours() {
    

  }

  static setStart(start: GraphNode) {
    NodeDirective.graph.source = start
    NodeDirective.graph.source.el.nativeElement.innerHTML = NodeDirective.startIcon();
    NodeDirective.resetWall(start.id)
  }

  static setEnd(end: GraphNode) {
    NodeDirective.graph.destination = end
    NodeDirective.graph.destination.el.nativeElement.innerHTML = NodeDirective.endIcon();
    NodeDirective.resetWall(end.id)
  }

  static computeStartAndEnd() {
    let startRow = Math.floor(Math.floor(NodeDirective.graph.rowLen/2))
    let startCol = Math.floor(Math.floor(NodeDirective.graph.colLen/3))

    NodeDirective.setStart(NodeDirective.graph.nodes[NodeDirective.getId(startRow, startCol)])
    NodeDirective.setEnd(NodeDirective.graph.nodes[NodeDirective.getId(startRow, Math.floor((NodeDirective.graph.colLen*2)/3))])
  }

  static setWall(i: number) {
    if(NodeDirective.graph.nodes[i].id === NodeDirective.graph.source.id || NodeDirective.graph.nodes[i].id === NodeDirective.graph.destination.id) return 
    NodeDirective.graph.nodes[i].isWall = true
  }

  static resetWall(i: number) {
    //if(NodeDirective.graph.nodes[i].id == NodeDirective.graph.source.id || NodeDirective.graph.nodes[i].id === NodeDirective.graph.destination.id) return 
    NodeDirective.graph.nodes[i].isWall = false
  }

  static flipWall(i: number) {
    if(NodeDirective.graph.nodes[i].id == NodeDirective.graph.source.id || NodeDirective.graph.nodes[i].id === NodeDirective.graph.destination.id) return 
    if(NodeDirective.graph.nodes[i].isWall) {
      NodeDirective.resetWall(i)
    } else {
      NodeDirective.setWall(i)
    }
  }

  // resets all the values of the nodes
  static resetAll(color:ColorNode) {
    NodeDirective.algoExecuted = false
    for(let i = 0; i<NodeDirective.graph.nodes.length; i++) {
      NodeDirective.graph.nodes[i].reset();
      color.setColor(NodeDirective.graph.nodes[i], false)
    }
    NodeDirective.wallNodes = new Array()
    NodeDirective.visitedNodes = new Array()
    NodeDirective.pathNodes = new Array()
  }

  // Resets only parent, path, visited values and keeps weights and wall values intact
  static resetForAlgo(color:ColorNode) {
    for(let i = 0; i<NodeDirective.graph.nodes.length; i++) {
      NodeDirective.graph.nodes[i].visited = false
      NodeDirective.graph.nodes[i].parent = null
      NodeDirective.graph.nodes[i].path = false
      color.setColor(NodeDirective.graph.nodes[i], false)
    }
    NodeDirective.visitedNodes = new Array<GraphNode>()
    NodeDirective.pathNodes = new Array<GraphNode>()
  }

  static getId(row: number, col: number) {
    return row*NodeDirective.col+col
  }

  static async runPathFinder(delay:boolean, algorithm:string) {
    NodeDirective.isProcessing = true
    NodeDirective.algoExecuted = true
    NodeDirective.resetForAlgo(NodeDirective.colorNode)

    NodeDirective.graph.computeNeighbours()

    if(algorithm == DFS) 
      NodeDirective.graph.depthFirstSearch(NodeDirective.visitedNodes, NodeDirective.graph.source)
    else
      NodeDirective.graph.breadthFirstSearch(NodeDirective.visitedNodes)

    for(let i = 0; i < NodeDirective.visitedNodes.length; i++) await NodeDirective.colorNode.setColor(NodeDirective.visitedNodes[i], delay)
    NodeDirective.graph.computePath(NodeDirective.graph.destination, NodeDirective.pathNodes)
    for(let i = NodeDirective.pathNodes.length-1; i >= 0; i--) await NodeDirective.colorNode.setColor(NodeDirective.pathNodes[i], delay)

    NodeDirective.isProcessing = false
  }


  graphNode: GraphNode
  wasWall: boolean = false
  isWall: boolean = false
  color: String
  id:number

  constructor(@Inject(ElementRef) private el:ElementRef) { 
    this.color = 'blue'
    this.graphNode = new GraphNode(el.nativeElement.id, -1, false, false, null, [], 1, this.el)
    this.graphNode.isWall = false
    this.id = -1
  }

  ngAfterViewInit() {
    this.graphNode.id = this.el.nativeElement.id
    this.id = this.el.nativeElement.id
    NodeDirective.graph.nodes.push(this.graphNode)
  }

  @HostListener('mousedown', ['$event'])
  mouseDownHandler(e: Event) {
    e.preventDefault()
    //console.log("Id:::" + this.graphNode.id + " MouseDown:: clicked:: " + NodeDirective.isClicked + " :: startSelected:: "+NodeDirective.startSelected+" :: endSelected :: "+ NodeDirective.endSelected )
    if(NodeDirective.isProcessing) return

    if(NodeDirective.isClicked && (NodeDirective.startSelected || NodeDirective.endSelected)) {
      NodeDirective.isClicked = false;
      if(NodeDirective.startSelected) 
        NodeDirective.setStart(this.graphNode);
      else
        NodeDirective.setEnd(this.graphNode);
      return;
    }

    

    NodeDirective.isClicked = true
    if(!this.isStartNode() && !this.isEndNode()){
      NodeDirective.flipWall(this.graphNode.id)
    } else if(NodeDirective.graph.source.id == this.graphNode.id) {
      NodeDirective.setStart(this.graphNode);
      NodeDirective.startSelected = true
    } else if(NodeDirective.graph.destination.id == this.graphNode.id) {
      NodeDirective.setEnd(this.graphNode);
      NodeDirective.endSelected = true
    }

    NodeDirective.colorNode.setColor(this.graphNode, false)
  }

  

  @HostListener('mouseenter', ['$event'])
  mouseEnterHandler(e: Event) {
    e.preventDefault()
    //console.log("Id:::" + this.graphNode.id + " MouseEnter:: clicked:: " + NodeDirective.isClicked + " :: startSelected:: "+NodeDirective.startSelected+" :: endSelected :: "+ NodeDirective.endSelected )
    if(NodeDirective.isProcessing) return
    
    if(NodeDirective.isClicked) {
      if(NodeDirective.startSelected || NodeDirective.endSelected) {

        this.wasWall = this.graphNode.isWall
        NodeDirective.resetWall(this.graphNode.id)
        this.el.nativeElement.innerHTML = NodeDirective.startSelected ? NodeDirective.startIcon() : NodeDirective.endIcon()

        if(NodeDirective.algoExecuted) {
          if(NodeDirective.startSelected) NodeDirective.setStart(this.graphNode);
          if(NodeDirective.endSelected) NodeDirective.setEnd(this.graphNode);
          NodeDirective.colorNode.setColor(this.graphNode, false)
          if(NodeDirective.graph.source.id !== NodeDirective.graph.destination.id) 
            NodeDirective.runPathFinder(false, BFS);
        }


      } else {
        NodeDirective.flipWall(this.graphNode.id)
      }
    }

    NodeDirective.colorNode.setColor(this.graphNode, false)
  }

  @HostListener('mouseleave', ['$event'])
  mouseLeaveHandler(e: Event) {
    e.preventDefault()
    //console.log("Id:::" + this.graphNode.id + " MouseLeave:: clicked:: " + NodeDirective.isClicked + " :: startSelected:: "+NodeDirective.startSelected+" :: endSelected :: "+ NodeDirective.endSelected )
    if(NodeDirective.isProcessing) return

    if(NodeDirective.isClicked) {
      if( NodeDirective.endSelected) { 
        this.graphNode.id == NodeDirective.graph.source.id ? NodeDirective.setStart(this.graphNode) : this.el.nativeElement.innerHTML = NodeDirective.removeIcon()
      } else if (NodeDirective.startSelected) {
        this.graphNode.id == NodeDirective.graph.destination.id ? NodeDirective.setEnd(this.graphNode) : this.el.nativeElement.innerHTML = NodeDirective.removeIcon()
      } 
      
      if(this.wasWall) {
        NodeDirective.graph.nodes[this.graphNode.id].isWall = true
        this.wasWall = false;
      }
    }
    NodeDirective.colorNode.setColor(this.graphNode, false)
  }

  @HostListener('mouseup', ['$event'])
  mouseUpHandler(e: Event) {
    e.preventDefault()
    if(NodeDirective.isProcessing) return

    NodeDirective.isClicked = false
    if(NodeDirective.startSelected) {
      this.graphNode.isWall = false;
      NodeDirective.startSelected = false
      if(this.isEndNode()) {
        NodeDirective.graph.source.el.nativeElement.innerHTML = NodeDirective.startIcon()
        NodeDirective.graph.destination.el.nativeElement.innerHTML = NodeDirective.endIcon()
      } else {
        this.el.nativeElement.innerHTML = NodeDirective.startIcon()
        NodeDirective.graph.source = this.graphNode;
      }
    }
    if(NodeDirective.endSelected) {
      this.graphNode.isWall = false;
      NodeDirective.endSelected = false;
      if(this.isStartNode()) {
        NodeDirective.graph.source.el.nativeElement.innerHTML = NodeDirective.startIcon()
        NodeDirective.graph.destination.el.nativeElement.innerHTML = NodeDirective.endIcon()
      } else {
        this.el.nativeElement.innerHTML = NodeDirective.endIcon()
        NodeDirective.graph.destination = this.graphNode;
      }
    }
    NodeDirective.colorNode.setColor(this.graphNode, false)
  }

  isStartNode():boolean{
    return this.id === NodeDirective.graph.source.id
  }

  isEndNode(): boolean {
    return this.id === NodeDirective.graph.destination.id
  }
}

