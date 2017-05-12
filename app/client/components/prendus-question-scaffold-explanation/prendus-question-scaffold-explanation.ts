import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {Action} from '../../typings/action';

class PrendusQuestionScaffoldExplanation {
  public is: string;
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;
  public querySelector: any;
  public currentQuestionScaffold: QuestionScaffold;
  public answers: QuestionScaffoldAnswer[];
  public action: Action;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-explanation';
    this.properties = {
      myIndex: {
        type: Number
      },
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      }
    };
  }

  disableNext(): void {
    this.action = Actions.updateCurrentQuestionScaffoldExplanation(this.myIndex, this.selectedIndex, this.currentQuestionScaffold, this.querySelector('#explanation') ? this.querySelector('#explanation').value : null);
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
    this.answers = state.questionScaffoldAnswers;
	}
}

Polymer(PrendusQuestionScaffoldExplanation);
