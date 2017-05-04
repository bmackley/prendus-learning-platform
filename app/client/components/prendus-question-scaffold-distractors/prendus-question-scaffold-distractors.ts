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
  public selectedIndex: number;
  public myIndex: number;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-distractors';
    this.properties = {
      one: {
        type: String,
        observer: 'disableNext'
      },
      two: {
        type: String,
        observer: 'disableNext'
      },
      three: {
        type: String,
        observer: 'disableNext'
      },
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      }
    };
  }

  disableNext(): void {
    if(this.selectedIndex === this.myIndex) {
      Actions.setDisabledNext(this, !UtilitiesService.isDefinedAndNotEmpty([this.one, this.two, this.three]));
    }

  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	 }
}

Polymer(PrendusQuestionScaffoldDistractors);
