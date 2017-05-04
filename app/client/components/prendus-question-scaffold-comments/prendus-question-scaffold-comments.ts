import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

export class PrendusQuestionScaffoldComments {
  public is: string;
  public commentOne: string;
  public commentTwo: string;
  public commentThree: string;
  public commentFour: string;
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-comments';
    this.properties = {
      commentOne: {
        type: String,
        observer: 'displayNext',
        value: 'Correct'
      },
      commentTwo: {
        type: String,
        observer: 'displayNext'
      },
      commentThree: {
        type: String,
        observer: 'displayNext'
      },
      commentFour: {
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
    }
  }

  displayNext(): void {
    if(this.myIndex === this.selectedIndex) {
      Actions.setDisplayNext(this, UtilitiesService.isDefinedAndNotEmpty([this.commentOne, this.commentTwo, this.commentThree, this.commentFour]));
    }

  }
	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusQuestionScaffoldComments);
