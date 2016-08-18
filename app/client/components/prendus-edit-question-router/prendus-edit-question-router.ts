import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

class EditQuestionRouterComponent {
    public is: string;
    public jwt: string;

    beforeRegister() {
        this.is = 'prendus-edit-question-router';
    }

    mapStateToThis(e) {
      const state = e.detail.state;
      this.jwt = state.jwt;
    }

    async questionSaved() {
        //TODO this is evil, figure out another way to manually reload the questions without a DOM search
        const quizEditorComponent = document.getElementById('quizEditorComponent');
        quizEditorComponent.manuallyReloadQuestions();
        //TODO this is evil, figure out another way to manually reload the questions without a DOM search
    }
}

Polymer(EditQuestionRouterComponent);
