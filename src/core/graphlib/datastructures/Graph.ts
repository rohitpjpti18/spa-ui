import { ElementRef } from "@angular/core"
import { GraphNode } from "./GraphNode"
import { GraphUndirectedEdge } from "./GraphUndirectedEdge"
import { ColorNode } from "src/core/animate/ColorNode"
import Queue from "./Queue"

export class Graph {
    inProgress:boolean
    colLen: number
    rowLen: number
    nodes: Array<GraphNode>
    edges: GraphUndirectedEdge[]
    source: GraphNode
    destination: GraphNode

    constructor(nodes: Array<GraphNode>, edges: GraphUndirectedEdge[]) {
        this.edges = edges
        this.nodes = nodes
        this.inProgress = false
        this.colLen = 0
        this.rowLen = 0
        this.source = new GraphNode(-1, -1, false, false, null, [], 1, null)
        this.destination = new GraphNode(-1, -1, false, false, null, [], 1, null)
    }

    public computeNeighbours() {
        let directions = [[-1, 0], [1, 0], [0, 1], [0, -1]]
        
        for(let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].neighbours = new Array<GraphNode>()
            if(i>=this.colLen && !this.nodes[i-this.colLen].isWall) this.nodes[i].neighbours.push(this.nodes[i-this.colLen]);
            if(i < this.nodes.length - this.colLen && !this.nodes[i+this.colLen].isWall) this.nodes[i].neighbours.push(this.nodes[i+this.colLen]);
            if(i%this.colLen != 0 && !this.nodes[i-1].isWall) this.nodes[i].neighbours.push(this.nodes[i-1]);
            if((i == 0 || (i+1)%this.colLen != 0) && !this.nodes[i+1].isWall) this.nodes[i].neighbours.push(this.nodes[i+1]);
        }
    }

    public computePath(tail: GraphNode|null, pathNodes: Array<GraphNode>) {
        
        let currentNode: GraphNode|null = tail

        if(currentNode == null || currentNode.parent == null) return

        while(currentNode != null) {
            pathNodes.push(currentNode)
            currentNode.path = true
            currentNode = currentNode.parent
        }
    }

    public breadthFirstSearch(visitedNodes: Array<GraphNode>) {
        if(this.source && this.destination) {
            let q:Queue<GraphNode> = new Queue()
            this.source.visited = true
            
            q.enqueue(this.source)
    
            while(!q.isEmpty()){
                let currentNode = q.dequeue()
    
                if(currentNode != null) {
                    visitedNodes.push(currentNode)
                    for(let i = 0; i<currentNode.neighbours.length; i++) {
                        let neighbourNode = currentNode.neighbours[i]
        
                        if(!neighbourNode.visited) {
                            neighbourNode.visited = true
                            neighbourNode.parent = currentNode
                            q.enqueue(neighbourNode)    
        
                            if(neighbourNode == this.destination) {
                                while(!q.isEmpty()) {
                                    let remainingNodeInQueue = q.dequeue()
                                    remainingNodeInQueue != null ? visitedNodes.push(remainingNodeInQueue) : ``
                                }
                                return
                            }
                        }
                    }
                }
            }
        }
    }


    public depthFirstSearch(visitedNodes: Array<GraphNode>, currentNode: GraphNode) {
        if(!currentNode.visited) {
            currentNode.visited = true
            visitedNodes.push(currentNode)
        }

        if(currentNode == this.destination) {
            return
        }

        for(let i = 0; i<currentNode.neighbours.length; i++) {
            let neighbourNode = currentNode.neighbours[i]

            if(!neighbourNode.visited){
                neighbourNode.parent = currentNode
                this.depthFirstSearch(visitedNodes, neighbourNode)
            }

            if(this.destination.visited) return
        }
    }
}