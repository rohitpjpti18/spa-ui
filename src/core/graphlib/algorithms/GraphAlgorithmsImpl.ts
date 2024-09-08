import { Graph } from "../datastructures/Graph";
import { GraphNode } from "../datastructures/GraphNode";
import Queue from "../datastructures/Queue";

export class GraphAlgorithmsImpl{ 
    /*
    public static breadthFirstSearch(graph: Graph) {
        let q:Queue<GraphNode> = new Queue()
        graph.source.visited = true
        
        q.enqueue(graph.source)

        while(!q.isEmpty()){
            let currentNode = q.dequeue();
            
             
            if(currentNode != null ) {
                graph.visitedNodes.push(currentNode)
                for(let i = 0; i<currentNode.neighbours.length; i++){
                    let neighbourNode = currentNode.neighbours[i];
    
                    if(!neighbourNode.visited){
                        neighbourNode.visited = true;
                        neighbourNode.parent = currentNode;
                        q.enqueue(neighbourNode);    
    
                        if(neighbourNode == graph.destination) return;
                    }
                }
            }
        }
    }*/

    static dfs(graph: Graph) {

    }

    static dijkstras(graph: Graph) {

    }

    static astar(graph: Graph) {
        
    }
}

export default GraphAlgorithmsImpl;