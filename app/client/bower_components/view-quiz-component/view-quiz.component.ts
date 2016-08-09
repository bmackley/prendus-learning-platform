import {RootReducer} from './redux/reducers.ts';

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
    public rootReducer;

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
                type: String,
            }
        };
    }
    ready() {
        this.rootReducer = RootReducer;
    }

    mapStateToThis(e) {
        const state = e.detail.state;

        this.selected = state.selected;
    }
}

Polymer(ViewQuizComponent);
