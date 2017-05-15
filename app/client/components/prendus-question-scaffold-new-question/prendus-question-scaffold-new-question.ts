import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {Action} from '../../typings/action';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';

class PrendusQuestionScaffoldNewQuestion {
  public is: string;
  public properties: any;
  public selectedIndex: number;
  public myIndex: number;
  public querySelector: any;
  public currentQuestionScaffold: QuestionScaffold;
  public numberOfAnswers: number;
  public action: Action;
  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-new-question';
    this.properties = {
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      },
      numberOfAnswers: {
        type: Number,
        observer: 'initCurrentQuestionScaffold'
      }
    };
  }

  /**
   * Called when numberOfAnswers is set
   */
  initCurrentQuestionScaffold(): void {
    this.action = Actions.initCurrentQuestionScaffold(this.numberOfAnswers);
  }
  /**
   * Checks if the question and answer have been entered and aren't empty and if
   * the inputs aren't empty.
   */
  disableNext(e: any): void {
    try {
      if(this.myIndex !== undefined && this.selectedIndex !== undefined && this.myIndex === this.selectedIndex) {
        const question: string = this.querySelector('#question') ? this.querySelector('#question').value : null;
        const answer: string = this.querySelector('#answer') ? this.querySelector('#answer').value : null;
        const answers: string[] = getAnswers(this, answer);

        this.action = Actions.setDisabledNext(!UtilitiesService.isDefinedAndNotEmpty([question, answer]));
        this.action = Actions.updateCurrentQuestionScaffold(question, null, answers, this.currentQuestionScaffold, null);
      }
    } catch(error) {
      console.error(error);
    }

    function getAnswers(context: PrendusQuestionScaffoldNewQuestion, text: string): string[] {
      const newAnswers: { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer } = {
        ...(context.currentQuestionScaffold ? context.currentQuestionScaffold.answers : {}),
        'question0': {
          ...context.currentQuestionScaffold.answers['question0'],
          text,
          correct: true,
          id: 'true'
        }
      };

      return Object.keys(newAnswers || {}).map((key: string, index: number) => {
        return newAnswers[key].text;
      });
    }
  }


	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
	}
}

Polymer(PrendusQuestionScaffoldNewQuestion);
