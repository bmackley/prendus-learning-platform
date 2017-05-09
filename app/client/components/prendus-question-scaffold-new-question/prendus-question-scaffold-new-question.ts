import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';

export class PrendusQuestionScaffoldNewQuestion {
  public is: string;
  public properties: any;
  public selectedIndex: number;
  public myIndex: number;
  public querySelector: any;
  public currentQuestionScaffold: QuestionScaffold;
  public numberOfAnswers: number;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-new-question';
    this.properties = {
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number,
        observer: 'disableNext'
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
    Actions.initCurrentQuestionScaffold(this, this.numberOfAnswers);
  }
  /**
   * Checks if the question and answer have been entered and aren't empty and if
   * the inputs aren't empty.
   */
  disableNext(e: any): void {
    if(this.selectedIndex && this.myIndex && this.selectedIndex === this.myIndex) {
      const question: string = this.querySelector('#question').value;
      const text: string = this.querySelector('#answer').value;
      const isDefined: boolean = UtilitiesService.isDefinedAndNotEmpty([question, text]);
      if(isDefined) {
        Actions.setQuestionScaffold(this, {
          ...this.currentQuestionScaffold,
          answers: {
            ...this.currentQuestionScaffold.answers,
            'question0': {
              ...this.currentQuestionScaffold.answers['question0'],
              text,
              correct: true,
              variableName: 'true'
            }
          },
          question
        });
      }

      Actions.setDisabledNext(this, !isDefined);
    }

  }


	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
	}
}

Polymer(PrendusQuestionScaffoldNewQuestion);
