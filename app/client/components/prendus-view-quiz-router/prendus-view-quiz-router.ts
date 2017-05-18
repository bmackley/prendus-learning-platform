import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UserModel} from '../../node_modules/prendus-services/models/user-model';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {LTIState} from '../../node_modules/prendus-services/typings/lti-state';
import {Action} from '../../typings/action';
import {QuizOrigin} from '../../node_modules/prendus-services/typings/quiz-origin';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {State} from '../../typings/state';

class PrendusViewQuizRouter {
    public is: string;
		public uid: string;
		public courseId: string;
		public lessonId: string;
		public quizId: string;
		public observers: any;
		public hasEditAccess: boolean;
    public userFullName: string;
    public userEmail: string;
    public jwt: string;
    public fire: any;
    public data: any;
    public querySelector: any;
    public ltiState: LTIState;
    public action: Action;
    public quizOrigin: QuizOrigin;
    public userId: string;
    public consumerKey: string;
    public displayLink: boolean;
    public properties: any;
    public ltiJwt: string;

    ready(): void {
      Actions.defaultAction(this);
    }

    beforeRegister(): void {
      this.is = 'prendus-view-quiz-router';
			this.observers = [
				'updateEditAccess(data)'
			];
      this.properties = {
        quizOrigin: {
          type: Object,
          observer: 'quizOriginChange'
        }
      };
    }

    quizOriginChange(): void {
      this.displayLink = this.quizOrigin === 'LEARNING_PLATFORM';
    }

		async updateEditAccess(data: any) {
      try {
        this.quizOrigin = data.quizOrigin;

        await Actions.checkUserAuth(this);
        if(this.quizOrigin === 'LTI') {
          const ltiJwt: string = UtilitiesService.getCookie('jwt');

          const ltiState: LTIState = {
            consumerKey: data.consumerKey,
            courseId: data.courseId,
            lessonId: data.lessonId,
            quizId: data.quizId,
            quizOrigin: data.quizOrigin,
            userEmail: data.userEmail,
            userFullName: data.userFullName,
            userId: data.userId,
            ltiJwt
          };

          const loggedInUser = await FirebaseService.getLoggedInUser();
          this.action = Actions.setLtiState(ltiState);
          if(!loggedInUser) {
            this.querySelector('#sign-up-sign-in-dialog').open();
          } else {

            this.userId = data.userId;
            this.consumerKey = data.consumerKey;

            const body: any = {
              courseId: data.courseId,
              jwt: this.jwt
            };
            const response = await fetch(`${UtilitiesService.getPrendusServerEndpointDomain()}/api/payment/has-user-paid`, {
              method: 'POST',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded'
              },
              body: UtilitiesService.prepareUrl(body, false)
            });

            const responseBody = await response.json();
            if(!responseBody.hasUserPaid) {
              Actions.showNotification(this, 'info', 'Please pay for this course before taking a quiz.');
              this.querySelector('#payment').open();
            }
          }
        }

        const quiz: Quiz = await Actions.getQuiz(data.quizId);
        this.hasEditAccess = this.uid === quiz.uid;
        this.userEmail = data.userEmail;
        // put this back once collaborators work again
        // this.hasEditAccess = this.uid in quiz.collaborators;
      } catch(error) {
        console.error(error);
      }
		}

    quizSubmissionStarted(): void {
        Actions.showMainSpinner(this);
    }

    quizSubmissionFinished(): void {
        Actions.hideMainSpinner(this);
    }

    mapStateToThis(e: StatechangeEvent): void {
      const state: State = e.detail.state;
			this.uid = state.currentUser.metaData.uid;
      this.userFullName = `${state.currentUser.metaData.firstName} ${state.currentUser.metaData.lastName}`;
      this.userEmail = state.currentUser.metaData.email;
      this.jwt = state.jwt;
      this.ltiState = state.ltiState;
      this.ltiJwt = state.ltiState ? state.ltiState.ltiJwt : this.ltiJwt;
    }
}

Polymer(PrendusViewQuizRouter);
