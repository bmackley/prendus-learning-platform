import {InitialState} from './initial-state.ts';
import {Action} from '../interfaces/action.interface.ts';
import {State} from '../interfaces/state.interface.ts';

export const RootReducer = (state: State = InitialState, action: Action): State => {
    switch(action.type) {
        case 'INITIAL_LOAD_QUESTION': {
            const newState = Object.assign({}, state);

            newState.visibility = action.visibility;
            newState.previewQuestionId = action.previewQuestionId;
            newState.initialLoad = true;

            return newState;
        }
        case 'SET_QUESTION_ID': {
            const newState = Object.assign({}, state);

            newState.questionId = action.questionId;
            newState.initialLoad = true;

            return newState;
        }
        case 'SET_PREVIEW_QUESTION_ID': {
            const newState = Object.assign({}, state);

            newState.previewQuestionId = action.previewQuestionId;
            newState.initialLoad = true;

            return newState;
        }
        default: {
            return state;
        }
    }
};
