import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';

class PrendusQuestionScaffoldDistractors {
  public is: string;
  public properties: any;
  public selectedIndex: number;
  public myIndex: number;
  public querySelector: any;
  public currentQuestionScaffold: QuestionScaffold;
  public answer: string;
  public numberOfAnswers: number;
  public distractors: any[];

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-distractors';
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
        observer: 'numberOfAnswersSet'
      }
    };
  }

  /**
   * Called when numberOfAnswers is set.
   */
  numberOfAnswersSet(): void {
    // - 1 because there are numberOfAnswers - 1 amount of distractors.
    // This array determines how many distractors will be in the html
    this.distractors = Array(this.numberOfAnswers - 1);
  }

  disableNext(): void {
    try {
      if(this.myIndex !== undefined && this.selectedIndex !== undefined && this.selectedIndex === this.myIndex) {
        const distractors: string[] = Object.keys(this.currentQuestionScaffold.answers || {}).map((key: string, index: number) => {
          return this.querySelector(`#distractor${index}`).value;
        });
        const isDefined: boolean = UtilitiesService.isDefinedAndNotEmpty(distractors);

        if(isDefined) {
          Actions.updateCurrentQuestionScaffoldAnswers(this, distractors, this.currentQuestionScaffold);
        }
        Actions.setDisabledNext(this, !isDefined);
      }
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Called from the dom so that the distractors are indexed correctly after 0
   */
  plusOne(index: number): number {
    return index + 1;
  }
	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
    this.answer = state.currentQuestionScaffold && state.currentQuestionScaffold.answers && state.currentQuestionScaffold.answers['question0'] ? state.currentQuestionScaffold.answers['question0'].text : this.answer;
  }
}

Polymer(PrendusQuestionScaffoldDistractors);
