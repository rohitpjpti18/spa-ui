import { NodeDirective } from "src/app/pathfinder/board/node.directive";
import { Graph } from "../datastructures/Graph";
import Random from "./Random";
import { MaxLengthValidator } from "@angular/forms";

export class MazeAlgorithmsImpl {
    static walls:Array<number> = new Array<number>();

    static buildBorder(col:number, row:number, source:number, destination:number) {
        for(let i = 0; i<col; i++) {
            if(i !== source && i !== destination) {
                MazeAlgorithmsImpl.walls.push(i)
            }
        }
        for(let i = 1; i<row-1; i++) {
            if(i*col !== source && i*col !== destination) {
                MazeAlgorithmsImpl.walls.push(i*col)
                MazeAlgorithmsImpl.walls.push(i*col+(col-1))
            }
        }

        for(let i = 0; i<col; i++) {
            if(i+((row-1)*col) !== source && i+((row-1)*col) !== destination) {
                MazeAlgorithmsImpl.walls.push(i+((row-1)*col))
            }
        }

    }

    static recursiveDivision(colStart:number, rowStart:number, colEnd:number, rowEnd:number) {
        if((rowEnd>rowStart+1) && (colEnd>colStart+1)) {
            if((rowEnd-rowStart) < (colEnd-colStart)) {
                let divider = Random.generateEvenRandomNumber(colStart, colEnd)
                for(let i = rowStart; i<=rowEnd; i++) {
                    let current = NodeDirective.getId(i, divider)
                    MazeAlgorithmsImpl.walls.push(current)
                }

                let openRow = Random.generateOddRandomNumber(rowStart, rowEnd)
                let openNode = NodeDirective.getId(openRow, divider)
                const index = MazeAlgorithmsImpl.walls.indexOf(openNode);
                if (index > -1) {
                    MazeAlgorithmsImpl.walls.splice(index, 1);
                }

                MazeAlgorithmsImpl.recursiveDivision(colStart, rowStart, divider-1, rowEnd)
                MazeAlgorithmsImpl.recursiveDivision(divider+1, rowStart, colEnd, rowEnd)
            } else {
                let divider = Random.generateEvenRandomNumber(rowStart, rowEnd)
                for(let i = colStart; i<=colEnd; i++) {
                    let current = NodeDirective.getId(divider, i)
                    MazeAlgorithmsImpl.walls.push(current)
                }

                let openCol = Random.generateOddRandomNumber(colStart, colEnd)
                let openNode = NodeDirective.getId(divider, openCol)
                const index = MazeAlgorithmsImpl.walls.indexOf(openNode);
                if (index > -1) {
                    MazeAlgorithmsImpl.walls.splice(index, 1);
                }

                MazeAlgorithmsImpl.recursiveDivision(colStart, rowStart, colEnd, divider-1)
                MazeAlgorithmsImpl.recursiveDivision(colStart, divider+1, colEnd, rowEnd)
            }
        }
    }

    static recursiveDivisionHorizontal(rowStart:number, rowEnd:number, colStart:number, colEnd:number) {
        if((rowEnd>rowStart+1)&&(colEnd>colStart+1)){
            let divider = Random.generateEvenRandomNumber(rowStart, rowEnd);
            for(let i = colStart; i<=colEnd; i++){
                let current = NodeDirective.getId(divider, i);
                MazeAlgorithmsImpl.walls.push(current)
            }

            let openCol1 = Random.generateRandomNumber(colStart, colStart + Math.floor((colEnd-colStart)/2));
            let openCol2 = Random.generateRandomNumber((colStart + Math.floor((colEnd-colStart)/2))+1, colEnd);
            let openNode1 = NodeDirective.getId(divider, openCol1);
            const index1 = MazeAlgorithmsImpl.walls.indexOf(openNode1)
            if(index1 > -1) {
                MazeAlgorithmsImpl.walls.splice(index1, 1);
            }

            let openNode2 = NodeDirective.getId(divider, openCol2);
            const index2 = MazeAlgorithmsImpl.walls.indexOf(openNode2)
            if(index2 > -1) {
                MazeAlgorithmsImpl.walls.splice(index2, 1)
            }

            this.recursiveDivisionHorizontal(rowStart, divider-1, colStart, colEnd);
            this.recursiveDivisionHorizontal(divider+1, rowEnd, colStart, colEnd);
        }
    }

    static recursiveDivisionVertical(rowStart:number, rowEnd:number, colStart:number, colEnd:number) {
        if((rowEnd>rowStart+1)&&(colEnd>colStart+1)) {
            let divider = Random.generateEvenRandomNumber(colStart, colEnd);
            for(let i = rowStart; i<=rowEnd; i++){
                let current = NodeDirective.getId(i, divider);
                MazeAlgorithmsImpl.walls.push(current)
            }

            let openCol1 = Random.generateRandomNumber(rowStart, rowStart + Math.floor((rowEnd-rowStart)/2));
            let openCol2 = Random.generateRandomNumber((rowStart + Math.floor((rowEnd-rowStart)/2))+1, rowEnd);
            let openNode1 = NodeDirective.getId(openCol1, divider);
            const index1 = MazeAlgorithmsImpl.walls.indexOf(openNode1)
            if(index1 > -1) {
                MazeAlgorithmsImpl.walls.splice(index1, 1);
            }

            let openNode2 = NodeDirective.getId(openCol2, divider);
            const index2 = MazeAlgorithmsImpl.walls.indexOf(openNode2)
            if(index2 > -1) {
                MazeAlgorithmsImpl.walls.splice(index2, 1)
            }

            this.recursiveDivisionVertical(rowStart, rowEnd, colStart, divider-1);
            this.recursiveDivisionVertical(rowStart, rowEnd, divider+1, colEnd);
        }
    }

    static recursiveDivisionMaze(graph: Graph, col:number, row:number, source:number, destination:number): Array<number> {
        MazeAlgorithmsImpl.walls = new Array<number>()

        MazeAlgorithmsImpl.buildBorder(col, row, source, destination)
        MazeAlgorithmsImpl.recursiveDivision(1, 1, graph.colLen-2, graph.rowLen-2)

        return MazeAlgorithmsImpl.walls
    }

    static recursiveDivisionHorizontalMaze(graph: Graph, col:number, row:number, source:number, destination:number): Array<number> {
        MazeAlgorithmsImpl.walls = new Array<number>()

        MazeAlgorithmsImpl.buildBorder(col, row, source, destination)
        MazeAlgorithmsImpl.recursiveDivisionHorizontal(1, graph.rowLen-2, 1, graph.colLen-2)

        return MazeAlgorithmsImpl.walls;
    }

    static recursiveDivisionVerticalMaze(graph: Graph, col:number, row:number, source:number, destination:number): Array<number> {
        MazeAlgorithmsImpl.walls = new Array<number>()

        MazeAlgorithmsImpl.buildBorder(col, row, source, destination)
        MazeAlgorithmsImpl.recursiveDivisionVertical(1, graph.rowLen-2, 1, graph.colLen-2)

        return MazeAlgorithmsImpl.walls;
    }
}