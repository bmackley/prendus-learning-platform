import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
class PrendusQuestionScaffoldComments {
  public is: string;
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;
  public questionStem: string;
  public currentQuestionScaffold: QuestionScaffold;
  public querySelector: any;
  public answers: QuestionScaffoldAnswer[];

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
      if(this.myIndex != null && this.selectedIndex != null && this.myIndex === this.selectedIndex) {
        // Get all the inputs
        const arr: string[] = Object.keys(this.currentQuestionScaffold.answers || {}).map((key: string, index: number) => {
          return this.querySelector(`#comment${index}`).value;
        });
        const isDefined: boolean = UtilitiesService.isDefinedAndNotEmpty(arr);
        Actions.setDisabledNext(this, !isDefined);
        if(isDefined) {
          const answers: { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer } = Object.keys(this.currentQuestionScaffold.answers || {})
          // update comments
          .map((key: string, index: number) => {
            return {
              ...this.currentQuestionScaffold.answers[key],
              comment: this.querySelector(`#comment${index}`).value
            };
          })
          // convert back to object
          .reduce((result: { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer } , current: QuestionScaffoldAnswer, index: number) => {
            result[`question${index}`] = current;
            return result;
          }, {});

          Actions.setQuestionScaffold(this, {
            ...this.currentQuestionScaffold,
            answers
          });
        }
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
    this.answers = state.questionScaffoldAnswers;
	}
}

Polymer(PrendusQuestionScaffoldComments);
