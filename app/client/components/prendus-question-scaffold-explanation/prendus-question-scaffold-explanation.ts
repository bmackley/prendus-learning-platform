import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';

export class PrendusQuestionScaffoldExplanation {
  public is: string;
  public explanation: string;
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;
  public currentQuestionScaffold: QuestionScaffold;
  public querySelector: any;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-explanation';
    this.properties = {
      myIndex: {
        type: Number
      },
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      }
    };
  }

  ready(): void {
    //TODO delete me
    this.explanation = 'ExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanationExplanation';
  }

  disableNext(): void {
    if(!!(this.myIndex && this.selectedIndex) && this.myIndex === this.selectedIndex) {
      //TODO decide on calling this twice
      Actions.setDisabledNext(this, !UtilitiesService.isDefinedAndNotEmpty(this.querySelector('#explanation').value));
      if(UtilitiesService.isDefinedAndNotEmpty(this.querySelector('#explanation').value)) {
        Actions.setQuestionScaffold(this, {
          ...this.currentQuestionScaffold,
          explanation: this.querySelector('#explanation').value
        });
      }
    }
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
	}
}

Polymer(PrendusQuestionScaffoldExplanation);
