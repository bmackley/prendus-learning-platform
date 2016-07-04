import {InitialState} from './initial-state.ts';
import {Actions} from './actions.ts';

export function rootReducer(state = InitialState, action) {
    switch(action.type) {
        case Actions.setCurrentUser.type: {
            const newState = Object.assign({}, state);
            newState.currentUser.email = action.email;
            return newState;
        }
        case Actions.checkUserAuth.type: {
          console.log('Reducer action user auth', action)
          const newState = Object.assign({}, state);
          newState.currentUser.email = action.email;
          newState.currentUser.firstName = action.firstName;
          newState.currentUser.lastName = action.lastName;
          return newState;
        }
        case Actions.addConcept.type: {
          console.log('reducers add concept', action)
          const newState = Object.assign({}, state);
          console.log('new state', state)
          newState.concepts[action.key] = action;
          console.log("reducers add concept new state1 ", newState)
          newState.newConcept = newState.concepts[action.key];
          console.log("reducers add concept new state 2", newState)
          return newState;
        }
        case Actions.setConcepts.type: {
            const newState = Object.assign({}, state);
            newState.concepts = {
                // uid: action.uid,
                title: action.title,
                // pos: action.pos,
                // creator: action.creator
            };
            return newState;
        }
        case Actions.getConcepts.type: {
            const newState = Object.assign({}, state);
            newState.concepts = action.concepts;
            return newState;
        }
        case Actions.deleteConcept.type: {
          const newState = Object.assign({}, state);
          console.log('key', action.key)
          console.log('concepts', state )
          delete newState.concepts[action.conceptKey];
          newState.deletedConcept = action.conceptKey;
          console.log('Delete old State', state)
          console.log('Delete new State', newState)
          return newState;
        }
        case Actions.logOutUser.type: {
          const newState = Object.assign({}, state);
          console.log('user has been logged out actions')
          newState.currentUser = {uid: '', username: '', permissions: ''};
          return newState;
        }
        case Actions.updateUser.type: {
          const newState = Object.assign({}, state);
          newState.currentUser = {firstName: action.firstName, lastname: action.lastName, username: action.email};
          return newState;
        }
        case Actions.displayError.type: {
          const newState = Object.assign({}, state);
          newState.error.message = action.error.message;
          return newState;
        }
        default: {
            return state;
        }
    }
}
