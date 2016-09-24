import {Actions} from '../../redux/actions.ts';

class PrendusEditQuestionRouter {
    public is: string;
    public jwt: string;
    public conceptId: string;
    public quizId: string;
    public properties: Object;
    public errorMessage: string;
    public successMessage: string;

    beforeRegister() {
        this.is = 'prendus-edit-question-router';
        this.properties = {
            route: {
              type: Object,
              observer: 'setData'
            }
        };
    }
    setData() {
      console.log('setting route', this.route)
      console.log('setting data', this.data)
      this.conceptId = this.data.conceptId;
      this.quizId = this.data.quizId;
    }
    editProblemComponentLoaded(e) {
        Actions.hideMainSpinner(this);
    }

    backToQuiz(){
      //Would like to go to this with the URL, but getting the info
      //window.history.back();
      window.location.href = `courses/edit-quiz/concept/${this.conceptId}/quiz/${this.quizId}`
    }

    mapStateToThis(e) {
      const state = e.detail.state;
      this.jwt = state.jwt;
    }

    async questionSaved() {
        //TODO this is evil, figure out another way to manually reload the questions without a DOM search
        this.successMessage = ""
        this.successMessage = "Question saved successfully"
        const quizEditorComponent = document.getElementById('quizEditorComponent');
        quizEditorComponent.manuallyReloadQuestions();
        this.backToQuiz;
        //TODO this is evil, figure out another way to manually reload the questions without a DOM search

    }
}

Polymer(PrendusEditQuestionRouter);
