import {Actions} from '../../redux/actions.ts';

class PrendusEditQuestionRouter {
    public is: string;
    public jwt: string;
    public observers: Array;

    beforeRegister() {
        this.is = 'prendus-edit-question-router';
        this.observers = [
          '_routeChanged(route.*)'
        ]
    }

    _routeChanged(route) {
      if(!route.data) {
        this.originalText = '';
        this.originalCode = '';
      }
    }

    editProblemComponentLoaded(e) {
        Actions.hideMainSpinner(this);
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

Polymer(PrendusEditQuestionRouter);
