import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

export class PrendusQuestionScaffoldExplanation {
  public is: string;
  public explanation: string;
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-explanation';
    this.properties = {
      explanation: {
        type: String,
        observer: 'displayNext'
      },
      myIndex: {
        type: Number
      },
      selectedIndex: {
        type: Number,
        observer: 'displayNext'
      }
    };
  }

  displayNext(): void {
    if(this.myIndex === this.selectedIndex) {
      Actions.setDisplayNext(this, UtilitiesService.isDefinedAndNotEmpty(this.explanation));
    }
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;

	}
}

Polymer(PrendusQuestionScaffoldExplanation);
