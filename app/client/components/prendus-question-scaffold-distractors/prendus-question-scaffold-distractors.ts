import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

export class PrendusQuestionScaffoldDistractors {
  public is: string;
  public one: string;
  public two: string;
  public three: string;
  public properties: any;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-distractors';
    this.properties = {
      one: {
        type: String,
        observer: 'displayNext'
      },
      two: {
        type: String,
        observer: 'displayNext'
      },
      three: {
        type: String,
        observer: 'displayNext'
      }
    };
  }

  displayNext(): void {
   Actions.setDisplayNext(this, UtilitiesService.isDefinedAndNotEmpty([this.one, this.two, this.three]));
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	 }
}

Polymer(PrendusQuestionScaffoldDistractors);
