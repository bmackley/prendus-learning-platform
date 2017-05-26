import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {Action} from '../../typings/action';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

class PrendusQuestionScaffoldExample extends Polymer.Element {
  public answers: QuestionScaffoldAnswer[];
  public myIndex: number;
  public selectedIndex: number;
  public questionScaffold: QuestionScaffold;
  public action: Action;

  static get is() { return 'prendus-question-scaffold-example'; }
  static get properties() {
      return {
        selectedIndex: {
          type: Number,
          observer: 'disableNext'
        },
        myIndex: {
          type: Number
        },
        questionScaffold: {
          type: Object
        }
      };
  }

  disableNext(): void {
    if(this.myIndex !== undefined && this.selectedIndex !== undefined && this.myIndex === this.selectedIndex) {
      this.action = Actions.setDisabledNext(false);
    }
  }

	mapStateToThis(e: CustomEvent): void {
		const state: State = e.detail.state;
    this.answers = this.questionScaffold ? UtilitiesService.getQuestionScaffoldAnswers(this.questionScaffold) : this.answers;
	}
}

window.customElements.define(PrendusQuestionScaffoldExample.is, PrendusQuestionScaffoldExample);
