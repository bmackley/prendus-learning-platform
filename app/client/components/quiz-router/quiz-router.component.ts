import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {Actions} from '../../redux/actions.ts';

class QuizRouterComponent {
    public is: string;
    public selected: number;
    public jwt: string;
    public currentEditQuestionId: string;
    public conceptId: string;
    public quizId: string;
    public properties: any;

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

    routeToCreateQuestion() {
        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
        const editProblemComponent = this.querySelector('#editProblemComponent');
        editProblemComponent.originalText = '';
        editProblemComponent.originalCode = '';
        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes

        this.selected = 1;
    }

    async questionSaved() {
        const quizEditorComponent = this.querySelector('#quizEditorComponent');
        quizEditorComponent.manuallyReloadQuestions();
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
