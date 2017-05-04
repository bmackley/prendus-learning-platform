import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

export class PrendusQuestionScaffoldNewQuestion {
  public is: string;
  public properties: any;
  public question: string;
  public answer: string;

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
      }
    }
  }

  /**
   * Checks if the question and answer have been entered and aren't empty and if
   * the inputs aren't empty.
   */
  displayNext(): void {
    Actions.setDisplayNext(this, UtilitiesService.isDefinedAndNotEmpty([this.question, this.answer]));
  }
	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;

	}
}

Polymer(PrendusQuestionScaffoldNewQuestion);
