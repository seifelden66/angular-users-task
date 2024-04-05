import { createReducer, on } from "@ngrx/store"
import { decrement, increment } from "./counter.actions"

export interface CounterState {
    count:number
}
export const initialCounterState:CounterState = {
    count: 1
}

export const counterReducer = createReducer(
    initialCounterState,
    on(increment, state=>({...state, count:2})),
    on(decrement, state=>({...state, count:1})),
    

)