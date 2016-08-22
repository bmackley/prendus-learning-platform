import {RootReducer} from './redux/reducers.ts';
import {StatechangeEvent} from './interfaces/statechange-event.ts';
import {State} from './interfaces/state.ts';
import {Action} from './interfaces/action.ts';

class ViewQuizComponent {
    public is: string;
    public properties: any;
    public quizId: string;
    public jwt: string;
    public quizSessionId: string;
    public userFullName: string;
    public userEmail: string;
    public courseId: string;
    public selected: number;
    public rootReducer: (state: State, action: Action) => State;

    beforeRegister() {
        this.is = 'prendus-view-quiz';
        this.properties = {
            quizId: {
                type: String
            },
            jwt: {
                type: String
            },
            quizSessionId: {
                type: String
            },
            userFullName: {
                type: String
            },
            userEmail: {
                type: String
            },
            courseId: {
                type: String
            }
        };
    }

    ready() {
        this.rootReducer = RootReducer;
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.selected = state.selected;
    }
}

Polymer(ViewQuizComponent);
