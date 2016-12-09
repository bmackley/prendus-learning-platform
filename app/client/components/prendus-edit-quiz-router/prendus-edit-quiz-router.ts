import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service';
import {Actions} from '../../redux/actions';

class PrendusEditQuizRouter {
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
    }

    mapStateToThis(e: any) {
      const state = e.detail.state;
      this.jwt = state.jwt;
    }

    routeToEditQuestion() {
        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes
        const editProblemComponent = document.getElementById('#editProblemComponent');
        editProblemComponent.initialLoad = false;
        editProblemComponent.init();
        //TODO this is evil, make sure to remove it once edit problem component can reload itself in response to property changes

        window.history.pushState({}, '', `courses/edit-question/course-id/${this.courseId}/video-id/${id}`);
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

Polymer(PrendusEditQuizRouter);
