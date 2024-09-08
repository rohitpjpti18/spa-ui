import { NodeDirective } from "src/app/pathfinder/board/node.directive";
import { Graph } from "../datastructures/Graph";
import Random from "./Random";

export class MiscellaneousAlgorithms {
    static walls:Array<number> = new Array<number>();
    
    static randomWalls(graph: Graph, col:number, row:number, source:number, destination:number): Array<number> {
        MiscellaneousAlgorithms.walls = new Array<number>()
        
        for(let i = 0; i<graph.rowLen; i++) {
            for(let j = 0; j<graph.colLen; j++) {
                if(Random.generateTrueOrFalse() && Random.generateTrueOrFalse()) {
                    let currentIndex =NodeDirective.getId(i, j)
                    if(currentIndex !== source && currentIndex !== destination)
                    this.walls.push(currentIndex)
                }
            }
        }

        return MiscellaneousAlgorithms.walls
    }
}