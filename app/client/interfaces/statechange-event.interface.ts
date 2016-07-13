import {State} from './state.interface.ts';

export interface StatechangeEvent extends Event {
    detail: {
        state: State,
        [propName: string]: any
    }
}
