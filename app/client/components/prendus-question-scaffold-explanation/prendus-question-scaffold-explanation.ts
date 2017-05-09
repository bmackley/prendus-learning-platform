import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';

export class PrendusQuestionScaffoldExplanation {
  public is: string;
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;
  public querySelector: any;
  public currentQuestionScaffold: QuestionScaffold;
  public answers: QuestionScaffoldAnswer[];
  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-explanation';
    this.properties = {
      myIndex: {
        type: Number
      },
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      currentQuestionScaffold: {
        type: Object,
        observer: 'change'
      }
    };
  }

  /**
   * Called everytime the currentQuestionScaffold changes
   */
  change(): void {
    this.answers = Object.keys(this.currentQuestionScaffold.answers || {}).map((key) => {
        return Object.assign({}, this.currentQuestionScaffold.answers[key], {
            id: key
        });
    });
  }

  disableNext(): void {
    if(this.myIndex && this.selectedIndex && this.myIndex === this.selectedIndex) {
      const explanation: string = this.querySelector('#explanation').value;
      const isDefined: boolean = UtilitiesService.isDefinedAndNotEmpty(explanation);
      Actions.setDisabledNext(this, !isDefined);
      if(isDefined) {
        Actions.setQuestionScaffold(this, {
          ...this.currentQuestionScaffold,
          explanation
        });
      }
    }
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
	}
}

Polymer(PrendusQuestionScaffoldExplanation);
