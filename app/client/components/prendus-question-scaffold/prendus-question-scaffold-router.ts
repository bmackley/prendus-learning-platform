import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {UserModel} from '../../node_modules/prendus-services/models/user-model';
import {Action} from '../../typings/action';
import {QuizOrigin} from '../../node_modules/prendus-services/typings/quiz-origin';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {State} from '../../typings/state';
import {Assignment} from '../../node_modules/prendus-services/typings/assignment';
import {Lesson} from '../../node_modules/prendus-services/typings/lesson';
import {LessonModel} from '../../node_modules/prendus-services/models/lesson-model';

class PrendusQuestionScaffoldRouter extends Polymer.Element {
		public uid: string;
		public courseId: string;
		public lessonId: string;
		public quizId: string;
		public hasEditAccess: boolean;
    public userFullName: string;
    public userEmail: string;
    public jwt: string;
    public querySelector: any;
    public ltiState: string;
    public action: Action;
    public quizOrigin: QuizOrigin;
    public properties: any;
    public ltiJwt: string;
    public data: any;

    static get is() { return 'prendus-question-scaffold-router'; }
    static get observers() {
        return [
            'init(data)'
        ];
    }

    connectedCallback() {
        super.connectedCallback();

        Actions.defaultAction(this);
    }

		async init(data: any) {
      try {
        if(data.assignmentId) {
          const assignment: Assignment = await FirebaseService.get(`assignments/${data.assignmentId}`);

          const lesson: Lesson = await LessonModel.getById(assignment.lessonId);
          const courseId: string = lesson.courseId;
          this.courseId = courseId;
          this.quizId = assignment.quizId;
          this.action = Actions.initLtiJwt();
          const queryParams: any = UtilitiesService.getQueryParams();
          await Actions.checkUserAuth(this);
          if(this.ltiJwt) {
            this.action = Actions.initializeQuestionScaffoldLtiState(data.assignmentId);
          }
          const loggedInUser = await FirebaseService.getLoggedInUser();
          if(!loggedInUser) {
            this.querySelector('#sign-up-sign-in-dialog').open();
          } else if(this.ltiJwt) {

            const hasUserPaid: boolean = await didUserPay(courseId, this.jwt);
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

window.customElements.define(PrendusQuestionScaffoldRouter.is, PrendusQuestionScaffoldRouter);
