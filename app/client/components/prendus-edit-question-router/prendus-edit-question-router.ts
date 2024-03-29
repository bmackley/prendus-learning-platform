import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {QuizSession} from '../../node_modules/prendus-services/typings/quiz-session';

class PrendusEditQuestionRouter {
    public is: string;
    public jwt: string;
    public lessonId: string;
    public quizId: string;
    public properties: any;
    public querySelector: any;
    public quizSession: QuizSession;
    public observers: string[];
		public data: any;
		public fire: any;

    private endpointDomain: string;

    beforeRegister(): void {
        this.is = 'prendus-edit-question-router';
        this.properties = {

        };
        this.observers = [
        	'_routeChanged(route.*)'
        ];
    }

    async ready(): Promise<void> {
        Actions.showMainSpinner(this);
        Actions.defaultAction(this);
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

        Actions.hideMainSpinner(this);
    }

    _routeChanged(routeObject: any): void {
      const route: string = routeObject.value.path;
      if(!route) {
        return;
      }
      const baseRoute: string = route.split('/')[1];
      switch(baseRoute) {
        case 'edit-question': {
          break;
        }

        default:  {
          //TODO this is bad and horrible, we need to change this and hope that polymer 2 will fire change events when we set something...
          this.data = null;
          break;
        }
      }

    }
    setData(): void {
      if(this.data) {
        this.lessonId = this.data.lessonId;
        this.quizId = this.data.quizId;
      }
			// QUESTION: do we still need this function?

      // const route: string = routeObject.value.path;
      // if(!route) {
      //   return;
      // }
      // const baseRoute: string = route.split('/')[1];
      // switch(baseRoute) {
      //   case 'edit-question': {
      //     break;
      //   }
			//
      //   default:  {
      //     //TODO this is bad and horrible, we need to change this and hope that polymer 2 will fire change events when we set something...
      //     this.data = null;
      //     break;
      //   }
      // }
    }

    editProblemComponentLoaded(e: any) {
        Actions.hideMainSpinner(this);
    }

    mapStateToThis(e: StatechangeEvent): void {
      const state = e.detail.state;
      this.jwt = state.jwt;
    }

    async questionSaved(e: any): Promise<void> {
				// navigate to the saved question
				// replace history so the back button goes to the quiz and not a new question
				window.history.replaceState({}, '', `/courses/edit-question/question/${e.target.externalQuestionId}/`);
				this.fire('location-changed', {}, {node: window});
				Actions.showNotification(this, 'success', 'Question saved successfully.');
        const editQuizComponent: any = document.querySelector('#edit-quiz');
				// TODO this is evil, figure out another way to manually reload the questions without a DOM search
        if(typeof editQuizComponent.manuallyReloadQuestions === 'function') {
          editQuizComponent.manuallyReloadQuestions();
        }
    }
}

Polymer(PrendusEditQuestionRouter);
