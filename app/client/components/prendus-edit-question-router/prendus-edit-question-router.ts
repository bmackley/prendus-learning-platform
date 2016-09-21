import {Actions} from '../../redux/actions.ts';

class PrendusEditQuestionRouter {
    public is: string;
    public jwt: string;
    public errorMessage: string;
    public successMessage: string;

    beforeRegister() {
        this.is = 'prendus-edit-question-router';
    }

    editProblemComponentLoaded(e) {
        Actions.hideMainSpinner(this);
    }

    backToQuiz(){
      window.history.back();
    }

    mapStateToThis(e) {
      const state = e.detail.state;
      this.jwt = state.jwt;
    }

    async questionSaved() {
        //TODO this is evil, figure out another way to manually reload the questions without a DOM search
        const quizEditorComponent = document.getElementById('quizEditorComponent');
        quizEditorComponent.manuallyReloadQuestions();
        this.successMessage = 'Question saved successfully';
        //TODO this is evil, figure out another way to manually reload the questions without a DOM search

    }
}

Polymer(PrendusEditQuestionRouter);
