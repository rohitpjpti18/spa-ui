import { GraphNode } from "./GraphNode";

export class GraphUndirectedEdge {
    edgeList: [GraphNode, GraphNode][]

    constructor(edgeList: [GraphNode, GraphNode][]) {
        this.edgeList = edgeList;
    }
}