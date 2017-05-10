import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
export class PrendusQuestionScaffoldExample {
  public is: string;
  /**
   * Passed in as a property
   */
  public answers: QuestionScaffoldAnswer[];
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;
  /**
   * Passed in as a property
   */
  public questionScaffold: QuestionScaffold;
  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-example' ;
    this.properties = {
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      },
      questionScaffold: {
        type: Object
      },
      answers: {
        type: Object
      }
    };
  }

  disableNext(): void {
    if(this.myIndex != null && this.selectedIndex != null && this.myIndex === this.selectedIndex) {
      Actions.setDisabledNext(this, false);
    }
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusQuestionScaffoldExample);
