import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

class QuizRouterComponent {
    public is: string;
    public selected: number;
    public jwt: string;
    public currentEditQuestionId: string;

    beforeRegister() {
        this.is = 'prendus-quiz-router';
        this.properties = {
            conceptId: {
                type: String
            },
            quizId: {
                type: String
            }
        };
    }

    async ready() {
        this.selected = 0;
        const user = await FirebaseService.getLoggedInUser();
        this.jwt = await user.getToken();
    }

    routeToEditQuestion() {
        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
        const editProblemComponent = this.querySelector('#editProblemComponent');
        editProblemComponent.initialLoad = false;
        editProblemComponent.init();
        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes

        this.selected = 1;
    }

    viewQuizEditor() {
        this.selected = 0;
    }

    mapStateToThis(e) {
        const state = e.detail.state;

        this.currentEditQuestionId = state.currentEditQuestionId;
    }
}

Polymer(QuizRouterComponent);
