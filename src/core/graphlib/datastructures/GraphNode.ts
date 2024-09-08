import { ElementRef } from "@angular/core";

export class GraphNode {
    id: number
    value: number;
    path:boolean;
    visited:boolean;
    weighted: boolean;
    parent:GraphNode|null;
    neighbours: GraphNode[];
    weightValue: number;
    isWall: boolean;
    isWeighted: boolean;
    el:ElementRef

    constructor(id:number, value: number, visited: boolean, weighted: boolean, parent: GraphNode|null, neighbourNodes: GraphNode[], weightValue: number, el:ElementRef|null) {
        this.id = id
        this.value = value;
        this.visited = visited;
        this.weighted = weighted;
        this.parent = parent;
        this.neighbours = neighbourNodes
        this.weightValue = weightValue
        this.isWall = false
        this.path = false
        this.isWeighted = false
        this.el = el !== null ? el : new ElementRef(new Object()) 
    }

    getHTMLElement(){
        return this.el;
    }

    reset() {
        this.visited = false
        this.parent = null
        this.weightValue = 1
        this.isWall = false
        this.isWeighted = false
        this.path = false
    }
}