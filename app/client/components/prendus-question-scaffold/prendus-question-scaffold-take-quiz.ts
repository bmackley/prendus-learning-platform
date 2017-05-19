import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {Action} from '../../typings/action';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {CheckAnswerRequestBody} from '../../node_modules/prendus-services/typings/check-answer-request-body';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {RootReducer} from '../../bower_components/prendus-quiz-viewer-component/redux/reducers';

class PrendusQuestionScaffoldTakeQuiz {
  public is: string;
  public properties: any;
  public selectedIndex: number;
  public myIndex: number;
  public action: Action;
  public jwt: string;
  public quizId: string;
  public dispatchEvent: any;
  public quizRootReducer: any;
  public uid: string;
  public ltiJwt: string;
  public userEmail: string;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-take-quiz';
    this.properties = {
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      },
      quizId: {
        type: String
      }
    };
  }


  ready(): void {
    Actions.defaultAction(this);
    this.quizRootReducer = RootReducer;
  }

  disableNext(e: any): void {
    if(this.selectedIndex !== undefined && this.myIndex !== undefined && this.selectedIndex === this.myIndex) {
      this.action = Actions.setDisabledNext(false);
    }
  }

  quizSubmissionStarted() {
      this.dispatchEvent(new CustomEvent('quizsubmissionstarted'), {
          bubbles: false
      });
  }

  quizSubmissionFinished() {
      this.dispatchEvent(new CustomEvent('quizsubmissionfinished'), {
          bubbles: false
      });
  }

	mapStateToThis(e: CustomEvent): void {
		const state: State = e.detail.state;
    this.userEmail = state.currentUser && state.currentUser.metaData ? state.currentUser.metaData.email : this.userEmail;
    this.jwt = state.jwt;
    this.uid = state.currentUser && state.currentUser.metaData ? state.currentUser.metaData.uid : this.uid;
    this.ltiJwt = state.ltiJwt;
  }
}

Polymer(PrendusQuestionScaffoldTakeQuiz);
