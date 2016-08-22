import {State} from './state.ts';

export interface StatechangeEvent extends Event {
    detail: {
        state: State,
        [propName: string]: any
    }
}
