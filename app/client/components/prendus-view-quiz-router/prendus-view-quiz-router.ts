import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UserModel} from '../../node_modules/prendus-services/models/user-model';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {LTIState} from '../../node_modules/prendus-services/typings/lti-state';
import {Action} from '../../typings/action';
import {QuizOrigin} from '../../node_modules/prendus-services/typings/quiz-origin';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

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

      this.quizOrigin = data.quizOrigin;

      await Actions.checkUserAuth(this);
      if(this.quizOrigin === 'LTI') {

        const ltiState: LTIState = {
          consumerKey: data.consumerKey,
          courseId: data.courseId,
          lessonId: data.lessonId,
          quizId: data.quizId,
          quizOrigin: data.quizOrigin,
          userEmail: data.userEmail,
          userFullName: data.userFullName,
          userId: data.userId
        };

        const loggedInUser = await FirebaseService.getLoggedInUser();
        if(!loggedInUser) {
          this.querySelector('#sign-up-sign-in-dialog').open();
        }
        this.userId = data.userId;
        this.consumerKey = data.consumerKey;
        this.action = Actions.setLtiState(ltiState);
        const body: any = {
          courseId: data.courseId,
          jwt: this.jwt
        };
        console.log('this.userId' , this.userId);
        await fetch(`${UtilitiesService.getPrendusServerEndpointDomain()}/api/payment/has-user-paid`, {
          method: 'post',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: UtilitiesService.prepareUrl(body, false)
        }).then((response) => {
          return response.json();
        }).then((data: any) => {
          console.log('data ', data);
        }).catch((error: any) => {
          console.error('something went wrong with seeing if the user paid ', error);
        })

      }
      const quiz: Quiz = await Actions.getQuiz(data.quizId);
			this.hasEditAccess = this.uid === quiz.uid;
      this.userEmail = data.userEmail;
			// put this back once collaborators work again
			// this.hasEditAccess = this.uid in quiz.collaborators;
		}

    quizSubmissionStarted(): void {
        Actions.showMainSpinner(this);
    }

    quizSubmissionFinished(): void {
        Actions.hideMainSpinner(this);
    }

    mapStateToThis(e: StatechangeEvent): void {
      const state = e.detail.state;
			this.uid = state.currentUser.metaData.uid;
      this.userFullName = `${state.currentUser.metaData.firstName} ${state.currentUser.metaData.lastName}`;
      this.userEmail = state.currentUser.metaData.email;
      this.jwt = state.jwt;
      this.ltiState = state.ltiState;
    }
}

Polymer(PrendusViewQuizRouter);
