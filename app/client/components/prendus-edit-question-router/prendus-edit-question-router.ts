import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {QuizSession} from '../../node_modules/prendus-services/typings/quiz-session';

class PrendusEditQuestionRouter {
    public is: string;
    public jwt: string;
    public conceptId: string;
    public quizId: string;
    public properties: Object;
    public errorMessage: string;
    public successMessage: string;
    public querySelector: any;
    public quizSession: QuizSession;

    private endpointDomain: string;

    beforeRegister() {
        this.is = 'prendus-edit-question-router';
        this.properties = {
            route: {
              type: Object,
              observer: 'setData'
            }
        };
    }

    async ready() {
        this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();

        const user = await FirebaseService.getLoggedInUser();
        const jwt = await user.getToken();

        //TODO this is horrible and should be removed once the view problem component can be initialized without a quiz session being handed to it
        const startQuizSessionAjax = this.querySelector(`#startQuizSessionAjax`)
        startQuizSessionAjax.body = {
            quizId: 'NO_QUIZ',
            jwt
        };

        const request = startQuizSessionAjax.generateRequest();
        await request.completes;

        const quizSession: QuizSession = request.response.quizSession;
        this.quizSession = quizSession;
        //TODO this is horrible and should be removed once the view problem component can be initialized without a quiz session being handed to it
    }

    setData() {
      // if(this.data) {
        // this.conceptId = this.data.conceptId;
        console.log(`this.concept: ${this.conceptId}`);
        // this.quizId = this.data.quizId;
        console.log(`this.quizId: ${this.quizId}`);
      // }

    }

    editProblemComponentLoaded(e) {
        Actions.hideMainSpinner(this);
    }

    backToQuiz() {
      window.history.back();
    }

    mapStateToThis(e: StatechangeEvent) {
      const state = e.detail.state;
      this.jwt = state.jwt;
    }

    async questionSaved() {
        //TODO this is evil, figure out another way to manually reload the questions without a DOM search
        this.successMessage = ""
        this.successMessage = "Question saved successfully"
        const quizEditorComponent = document.getElementById('quizEditorComponent');
        quizEditorComponent.manuallyReloadQuestions();
        this.backToQuiz();
        //TODO this is evil, figure out another way to manually reload the questions without a DOM search

    }
}

Polymer(PrendusEditQuestionRouter);
