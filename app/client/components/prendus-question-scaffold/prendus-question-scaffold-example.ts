import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {Action} from '../../typings/action';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

class PrendusQuestionScaffoldExample {
  public is: string;
  public answers: QuestionScaffoldAnswer[];
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;
  /**
   * Passed in as a property
   */
  public questionScaffold: QuestionScaffold;
  public action: Action;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-example' ;
    this.properties = {
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      },
      questionScaffold: {
        type: Object,
        observer: 'questionScaffoldSet'
      },
      answers: {
        type: Object
      }
    };
  }

  questionScaffoldSet() {
    this.answers = UtilitiesService.getQuestionScaffoldAnswers(this.questionScaffold);
  }

  disableNext(): void {
    if(this.myIndex !== undefined && this.selectedIndex !== undefined && this.myIndex === this.selectedIndex) {
      this.action = Actions.setDisabledNext(false);
    }
  }

	mapStateToThis(e: CustomEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusQuestionScaffoldExample);
