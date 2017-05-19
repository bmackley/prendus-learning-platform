import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {Action} from '../../typings/action';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {CheckAnswerRequestBody} from '../../node_modules/prendus-services/typings/check-answer-request-body';

class PrendusQuestionScaffoldTakeQuestion {
  public is: string;
  public properties: any;
  public selectedIndex: number;
  public myIndex: number;
  public action: Action;
  public questionId: string;
  public jwt: string;
  public userFullName: string;
  public userEmail: string;
  public userId: string;
  public querySelector: any;
  public renderMe: boolean;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-take-question';
    this.properties = {
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      },
      questionId: {
        type: String
      }
    };
  }
  ready(): void {
    Actions.defaultAction(this);
  }

  disableNext(e: any): void {
    if(this.selectedIndex !== undefined && this.myIndex !== undefined && this.selectedIndex === this.myIndex) {
      this.action = Actions.setDisabledNext(false);
      this.renderMe = true;
    }
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.jwt = state.jwt;
  }
}

Polymer(PrendusQuestionScaffoldTakeQuestion);
