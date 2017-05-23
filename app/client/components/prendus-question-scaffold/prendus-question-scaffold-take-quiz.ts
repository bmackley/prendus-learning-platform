import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {Action} from '../../typings/action';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {CheckAnswerRequestBody} from '../../node_modules/prendus-services/typings/check-answer-request-body';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {RootReducer} from '../../bower_components/prendus-quiz-viewer-component/redux/reducers';
import {QuizOrigin} from '../../node_modules/prendus-services/typings/quiz-origin';

declare let window: any;

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
  public courseId: string;
  public quizOrigin: QuizOrigin;
  public fire: any;

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
      },
      courseId: {
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
      Actions.showMainSpinner(this);
  }

  quizSubmissionFinished() {
      this.dispatchEvent(new CustomEvent('quizsubmissionfinished'), {
          bubbles: false
      });
      Actions.hideMainSpinner(this);
      const time: number = 2000;
      Actions.showNotification(this, 'success', `You have finished this assignment, this tab is going to change in ${time/1000} seconds.`);
      setTimeout(() => {
        const location: string = window.PRENDUS_ENV === 'production' ? 'https://prendus.com' : 'http://localhost:8000';
        if(this.quizOrigin === 'LTI') {
          // homepage
          window.history.pushState({}, '', '');
        } else {
          // back to course
          window.history.pushState({}, '', `/courses/view/${this.courseId}`);
        }
        this.fire('location-changed', {}, {node: window});

      }, time);
  }

	mapStateToThis(e: CustomEvent): void {
		const state: State = e.detail.state;
    this.userEmail = state.currentUser && state.currentUser.metaData ? state.currentUser.metaData.email : this.userEmail;
    this.jwt = state.jwt;
    this.uid = state.currentUser && state.currentUser.metaData ? state.currentUser.metaData.uid : this.uid;
    this.ltiJwt = state.ltiJwt;
    this.quizOrigin = this.ltiJwt ? 'LTI' : 'LEARNING_PLATFORM';
  }
}

Polymer(PrendusQuestionScaffoldTakeQuiz);
