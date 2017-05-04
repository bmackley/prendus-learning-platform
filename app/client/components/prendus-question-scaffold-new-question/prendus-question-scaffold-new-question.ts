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
  
  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-new-question';
    this.properties = {
      question: {
        type: String,
        observer: 'displayNext'
      },
      answer: {
        type: String,
        observer: 'displayNext'
      },
      selectedIndex: {
        type: Number,
        observer: 'displayNext'
      },
      myIndex: {
        type: Number
      }
    };
  }

  /**
   * Checks if the question and answer have been entered and aren't empty and if
   * the inputs aren't empty.
   */
  displayNext(): void {
    if(this.selectedIndex === this.myIndex) {
      Actions.setDisplayNext(this, UtilitiesService.isDefinedAndNotEmpty([this.question, this.answer]));
    }

  }
	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;

	}
}

Polymer(PrendusQuestionScaffoldNewQuestion);
