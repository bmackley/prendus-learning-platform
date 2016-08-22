import {InitialState} from './initial-state.ts';
import {State} from '../interfaces/state.ts';
import {Action} from '../interfaces/action.ts';

export const RootReducer = (state: State = InitialState, action: Action) => {
    switch (action.type) {
        case 'LOAD_QUIZ_SESSION': {
            const newState = Object.assign({}, state);

            newState.quizSessionId = action.quizSessionId;

            return newState;
        }
        case 'LOAD_QUESTION_IDS': {
            const newState = Object.assign({}, state);

            newState.questionIds = action.questionIds;

            return newState;
        }
        case 'CLEAR_QUESTIONS': {
            const newState = Object.assign({}, state);

            newState.questionIds = [];

            return newState;
        }
        case 'END_QUIZ_SESSION': {
            const newState = Object.assign({}, state);

            newState.selected = 1;
            newState.finalGrade = action.finalGrade;
            newState.answerDetails = action.answerDetails;

            return newState;
        }
        default: {
            return state;
        }
    }
};
