import {InitialState} from './initial-state.ts';

export const RootReducer = (state: State = InitialState, action) => {
    switch (action.type) {
        case 'LOAD_QUIZ_SESSION': {
            const newState = Object.assign({}, state);

            newState.quizSessionId = action.quizSessionId;

            return newState;
        }
        case 'LOAD_QUESTIONS': {
            const newState = Object.assign({}, state);

            newState.questions = action.questions;

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
