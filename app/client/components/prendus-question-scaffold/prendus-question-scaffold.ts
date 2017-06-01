import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {Action} from '../../typings/action';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {Question} from '../../node_modules/prendus-services/typings/question';

class PrendusQuestionScaffold {
  public is: string;
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
  public properties: any;
  public courseId: string;
  public quizId: string;
  public assignmentId: string;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold';
    this.properties = {
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

  async ready(): Promise<void> {
    this.selectedIndex = 0;
    this.numberOfAnswers = 4;

    this.action = await Actions.initializeQuestionScaffoldQuiz(this.quizId, 5);
    this.action = await Actions.initializeQuestionScaffoldsToRate(this.quizId, 3);

  }

  calculateRateIndex(index: number): number {
    return index + 7;
  }

  calculateTakeIndex(index: number): number {
    return index + 10;
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

Polymer(PrendusQuestionScaffold);
