import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {Action} from '../../typings/action';

class PrendusQuestionScaffoldExplanation {
  public is: string;
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;
  public querySelector: any;
  public currentQuestionScaffold: QuestionScaffold;
  public answers: QuestionScaffoldAnswer[];
  public action: Action;

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

  disableNext(): void {
    try {
      if(this.myIndex !== undefined && this.selectedIndex !== undefined && this.myIndex === this.selectedIndex) {
        this.action = Actions.setDisabledNext(!UtilitiesService.isDefinedAndNotEmpty(this.querySelector('#explanation') ? this.querySelector('#explanation').value : null));
        this.action = Actions.updateCurrentQuestionScaffold(null, null, null, this.querySelector('#explanation') ? this.querySelector('#explanation').value : null);
      }
    } catch(error) {
      console.error(error);
    }
  }

	mapStateToThis(e: CustomEvent): void {
		const state: State = e.detail.state;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
    this.answers = state.currentQuestionScaffold ? UtilitiesService.getQuestionScaffoldAnswers(state.currentQuestionScaffold) : this.answers;
	}
}

Polymer(PrendusQuestionScaffoldExplanation);
