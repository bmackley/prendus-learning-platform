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

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-comments';
    this.properties = {
      commentOne: {
        observer: 'displayNext'
      },
      commentTwo: {
        observer: 'displayNext'
      },
      commentThree: {
        observer: 'displayNext'
      },
      commentFour: {
        observer: 'displayNext'
      }
    }
  }

  displayNext(): void {
    Actions.setDisplayNext(this,
      UtilitiesService.isDefinedAndNotEmpty([this.commentOne, this.commentTwo, this.commentThree, this.commentFour]));
  }
	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusQuestionScaffoldComments);
