import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {Action} from '../../typings/action';

class PrendusQuestionScaffoldComments {
  public is: string;
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;
  public questionStem: string;
  public currentQuestionScaffold: QuestionScaffold;
  public querySelector: any;
  public answers: QuestionScaffoldAnswer[];
  public action: Action;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-comments';
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
      const comments: string[] = getComments.bind(this)();
      this.action = Actions.updateCurrentQuestionScaffoldComments(comments, this.currentQuestionScaffold, this.myIndex, this.selectedIndex);
    } catch(error) {
      console.error(error);
    }

    function getComments(): string[] {
      return Object.keys(this.currentQuestionScaffold ? this.currentQuestionScaffold.answers : {}).map((key: string, index: number) => {
        return this.querySelector(`#comment${index}`) ? this.querySelector(`#comment${index}`).value : null;
      });
    }
  }

  plusOne(index: number): number {
    return index + 1;
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
    this.answers = state.questionScaffoldAnswers;
	}
}

Polymer(PrendusQuestionScaffoldComments);
