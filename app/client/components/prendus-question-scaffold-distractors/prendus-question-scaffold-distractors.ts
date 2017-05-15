import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {Action} from '../../typings/action';

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
  public action: Action;

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
      if(this.myIndex !== undefined && this.selectedIndex !== undefined && this.myIndex === this.selectedIndex) {
        const distractors: string[] = getDistractors(this);
        this.action = Actions.setDisabledNext(!UtilitiesService.isDefinedAndNotEmpty(distractors));
        this.action = Actions.updateCurrentQuestionScaffold(null, null, distractors, null);
      }

    } catch(error) {
      console.error(error);
    }

    function getDistractors(context: PrendusQuestionScaffoldDistractors): string[] {
      return Object.keys(context.currentQuestionScaffold ? context.currentQuestionScaffold.answers : {}).map((key: string, index: number) => {
        const id: string = `#distractor${index}`;
        return context.querySelector(id) ? context.querySelector(id).value : null;
      });
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
