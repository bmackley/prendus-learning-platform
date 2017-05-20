import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UserModel} from '../../node_modules/prendus-services/models/user-model';
import {Action} from '../../typings/action';
import {QuizOrigin} from '../../node_modules/prendus-services/typings/quiz-origin';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {State} from '../../typings/state';

class PrendusQuestionScaffoldRouter {
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
    public querySelector: any;
    public ltiState: string;
    public action: Action;
    public quizOrigin: QuizOrigin;
    public properties: any;
    public ltiJwt: string;
    public data: any;

    ready(): void {
      Actions.defaultAction(this);
    }

    beforeRegister(): void {
      this.is = 'prendus-question-scaffold-router';
			this.observers = [
				'init(data)'
			];
    }

		async init(data: any) {
      try {
        if(data.courseId && data.assignmentId) {
          this.action = Actions.initLtiJwt();
          const queryParams: any = UtilitiesService.getQueryParams();
          await Actions.checkUserAuth(this);
          this.action = Actions.initializeQuestionScaffoldLtiState(data.courseId, data.assignmentId);
          const loggedInUser = await FirebaseService.getLoggedInUser();
          if(!loggedInUser) {
            this.querySelector('#sign-up-sign-in-dialog').open();
          } else {
            const hasUserPaid: boolean = await didUserPay(data.courseId, this.jwt);
            if(!hasUserPaid) {
              this.querySelector('#payment').open();
            }
        }
        }

      } catch(error) {
        console.error(error);
      }

      async function didUserPay(courseId: string, jwt: string): Promise<boolean> {
        const body: any = {
          courseId,
          jwt
        };
        const response = await fetch(`${UtilitiesService.getPrendusServerEndpointDomain()}/api/payment/has-user-paid`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          body: UtilitiesService.prepareUrl(body, false)
        });

        const responseBody = await response.json();
        return responseBody.hasUserPaid;
      }


		}

    quizSubmissionStarted(): void {
        Actions.showMainSpinner(this);
    }

    quizSubmissionFinished(): void {
        Actions.hideMainSpinner(this);
    }

    mapStateToThis(e: CustomEvent): void {
      const state: State = e.detail.state;
			this.uid = state.currentUser.metaData.uid;
      this.userFullName = `${state.currentUser.metaData.firstName} ${state.currentUser.metaData.lastName}`;
      this.userEmail = state.currentUser && state.currentUser.metaData ? state.currentUser.metaData.email : this.userEmail;
      this.jwt = state.jwt;
      this.ltiState = state.ltiState;
      this.ltiJwt = state.ltiJwt;
    }
}
Polymer(PrendusQuestionScaffoldRouter);