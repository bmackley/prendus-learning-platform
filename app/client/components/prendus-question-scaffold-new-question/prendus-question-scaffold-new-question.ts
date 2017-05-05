import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

export class PrendusQuestionScaffoldNewQuestion {
  public is: string;
  public properties: any;
  public question: string;
  public answer: string;
  public selectedIndex: number;
  public myIndex: number;
  public querySelector: any;
  public observers: string[];
  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-new-question';
    this.properties = {

      selectedIndex: {
        type: Number
      },
      myIndex: {
        type: Number
      }
    };
    this.observers = [
      'disableNext(question, answer, selectedIndex, myIndex)'
    ];
  }

  /**
   * Checks if the question and answer have been entered and aren't empty and if
   * the inputs aren't empty.
   */
  disableNext(question: string, answer: string, selectedIndex: number, myIndex: number): void {
    console.log('change');
    if(this.selectedIndex === this.myIndex) {
      const question: string = this.querySelector('#question').value;

      const answer: string = this.querySelector('#answer').value;
      console.log('question ', question, ' answer ', answer);
      Actions.setDisabledNext(this, !UtilitiesService.isDefinedAndNotEmpty([this.querySelector('#question').value, this.querySelector('#answer').value]));
    }

  }
	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;

	}
}

Polymer(PrendusQuestionScaffoldNewQuestion);
