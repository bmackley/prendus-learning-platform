import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {Action} from '../../typings/action';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {Question} from '../../node_modules/prendus-services/typings/question';

class PrendusQuestionScaffold extends Polymer.Element {
  public selectedIndex: number;
  public querySelector: any;
  public disableNext: boolean;
  public numberOfAnswers: number;
  public exampleQuestionScaffold: QuestionScaffold;
  public exampleQuestionScaffoldAnswers: QuestionScaffoldAnswer[];
  public questionScaffold: QuestionScaffold;
  public questionScaffoldAnswers: QuestionScaffoldAnswer[];
  public action: Action;
  public questionScaffoldsToRate: QuestionScaffold[];
  public questionScaffoldQuizId: string;
  public courseId: string;
  public quizId: string;
  public assignmentId: string;

  static get is() { return 'prendus-question-scaffold'; }
  static get properties() {
      return {
        courseId: {
          type: String
        },
        assignmentId: {
          type: String
        },
        quizId: {
          type: String
        }
      };
  }

  async connectedCallback() {
      super.connectedCallback();

      this.selectedIndex = 0;
      this.numberOfAnswers = 4;

      this.action = await Actions.initializeQuestionScaffoldQuiz(this.quizId, 5);
      this.action = await Actions.initializeQuestionScaffoldsToRate(this.quizId, 3);
  }

  calculateRateIndex(index: number): number {
    return index + 6;
  }

  calculateTakeIndex(index: number): number {
    return index + 9;
  }

  plusOne(index: number): number {
    return index + 1;
  }

  /**
   * Called when you press back
   */
  back(): void {
    --this.selectedIndex;
    this.action = Actions.setDisabledNext(false);
  }

  /**
   * Called when you press next
   */
  next(): void {
    ++this.selectedIndex;
    if(this.selectedIndex === this.querySelector('#iron-pages').items.length - 1) {
      // Reached the limit.
      this.action = Actions.setDisabledNext(true);
    }
  }

	mapStateToThis(e: CustomEvent): void {
		const state: State = e.detail.state;
    this.disableNext = state.disableNext;
    this.exampleQuestionScaffold = state.currentQuestionScaffoldExample;
    this.questionScaffold = state.currentQuestionScaffold;
    this.questionScaffoldQuizId = state.questionScaffoldQuiz ? state.questionScaffoldQuiz.id : this.questionScaffoldQuizId;
    this.questionScaffoldsToRate = state.questionScaffoldsToRate;
	}
}

window.customElements.define(PrendusQuestionScaffold.is, PrendusQuestionScaffold);
