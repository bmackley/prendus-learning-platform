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
        observer: 'disableNext',
        value: 'Correct'
      },
      commentTwo: {
        type: String,
        observer: 'disableNext'
      },
      commentThree: {
        type: String,
        observer: 'disableNext'
      },
      commentFour: {
        type: String,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      },
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      }
    }
  }

  disableNext(): void {
    if(this.myIndex === this.selectedIndex) {
      Actions.setDisabledNext(this, !UtilitiesService.isDefinedAndNotEmpty([this.commentOne, this.commentTwo, this.commentThree, this.commentFour]));
    }

  }
	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusQuestionScaffoldComments);