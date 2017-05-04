import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

export class PrendusQuestionScaffoldFinishedQuestion {
  public is: string;
  public myIndex: number;
  public selectedIndex: number;
  public properties: any;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-finished-question';
    this.properties = {
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
      Actions.setDisplayNext(this, true);
    }
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;

	}
}

Polymer(PrendusQuestionScaffoldFinishedQuestion);
