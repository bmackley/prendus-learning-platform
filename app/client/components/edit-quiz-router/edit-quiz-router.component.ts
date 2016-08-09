import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {Actions} from '../../redux/actions.ts';

class EditQuizRouterComponent {
    public is: string;
    public selected: number;
    public jwt: string;
    public currentEditQuestionId: string;
    public conceptId: string;
    public quizId: string;
    public properties: any;

    beforeRegister() {
        this.is = 'prendus-edit-quiz-router';
    }

    async ready() {
        this.selected = 0;
        const user = await FirebaseService.getLoggedInUser();
        this.jwt = await user.getToken();
    }

    routeToEditQuestion() {
        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
        const editProblemComponent = document.getElementById('#editProblemComponent');
        editProblemComponent.initialLoad = false;
        editProblemComponent.init();
        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes

        window.history.pushState({}, '', `courses/edit-question/course/${this.courseId}/video/${id}`);
        this.fire('location-changed', {}, {node: window});
    }

    routeToCreateQuestion() {
        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
        const editProblemComponent = document.getElementById('#editProblemComponent');
        editProblemComponent.originalText = '';
        editProblemComponent.originalCode = '';
        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
    }
}

Polymer(EditQuizRouterComponent);