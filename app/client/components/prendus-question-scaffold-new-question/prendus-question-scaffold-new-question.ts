import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';

export class PrendusQuestionScaffoldNewQuestion {
  public is: string;
  public properties: any;
  public question: string;
  public answer: string;
  public selectedIndex: number;
  public myIndex: number;
  public querySelector: any;
  public currentScaffoldQuestion: QuestionScaffold;
  
  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-new-question';
    this.properties = {
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number,
        observer: 'disableNext'
      }
    };
  }

  /**
   * Checks if the question and answer have been entered and aren't empty and if
   * the inputs aren't empty.
   */
  disableNext(e: any): void {
    if(!!(this.selectedIndex && this.myIndex) && this.selectedIndex === this.myIndex) {
      const question: string = this.querySelector('#question').value;
      const answer: string = this.querySelector('#answer').value;
      Actions.setDisabledNext(this, !UtilitiesService.isDefinedAndNotEmpty([this.querySelector('#question').value, this.querySelector('#answer').value]));
    }
  }


	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;

	}
}

Polymer(PrendusQuestionScaffoldNewQuestion);
