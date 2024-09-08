import { createReducer, on } from "@ngrx/store"
import { pathfinder, reset, sortingVisualiser } from "./menuoptions.actions"
import { BFS, DFS } from "src/core/common/Constants";

export interface MenuOptions {
    algorithms: string[]
    mazePattern: string[]
}


export const initialState = {
    algorithms: [''],
    mazePattern: ['']
};

export const menuOptionReducer = createReducer(
    initialState,
    on(reset, (state) => ({algorithms: [], mazePattern: []})),
    on(pathfinder, (state) => ({algorithms: [BFS, DFS, 'Djikstra Algorithm'], 'mazePattern': ['Recursive division', 'Recursive division (vertical)', 'Recursive division (horizontal)', 'Random walls', 'Random weights'], 'clear': 'Clear Board' }))
)