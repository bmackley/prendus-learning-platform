import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';

export class PrendusQuestionScaffoldDistractors {
  public is: string;
  public properties: any;
  public selectedIndex: number;
  public myIndex: number;
  public querySelector: any;
  public currentQuestionScaffold: QuestionScaffold;
  public answer: string;
  public numberOfAnswers: number;
  public answersFiller: number[];

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

  numberOfAnswersSet(): void {
    // - 1 because there are numberOfAnswers - 1 amount of distractors.
    this.answersFiller = Array(this.numberOfAnswers - 1);
  }
  disableNext(): void {
    try {
      if(this.selectedIndex && this.myIndex && this.selectedIndex === this.myIndex) {
        let arr: string[];
        for(let i: number = 1; i < this.numberOfAnswers; i++) {
          arr = [...(arr || []), this.querySelector(`#distractor${i}`).value];
        }
        const isDefined: boolean = UtilitiesService.isDefinedAndNotEmpty(arr);
        let answers: {
          [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer;
        } = {
          ...( this.currentQuestionScaffold ?
               this.currentQuestionScaffold.answers :
               undefined)
        };

        for(let i: number = 1; i < this.numberOfAnswers; i++) {
          const key: string = `question${i}`;
          answers[key] = {
            ...answers[key],
            text: this.querySelector(`#distractor${i}`).value,
            correct: false,
            variableName: 'false'
          };
        }

        if(isDefined) {
          Actions.setQuestionScaffold(this, {
            ...this.currentQuestionScaffold,
            answers
          });

        }

        Actions.setDisabledNext(this, !isDefined);
      }
    } catch(error) {
      console.error(error);
    }


  }
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
