import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
export class PrendusQuestionScaffoldDistractors {
  public is: string;
  public properties: any;
  public selectedIndex: number;
  public myIndex: number;
  public querySelector: any;
  public currentQuestionScaffold: QuestionScaffold;
  public answer: string;
  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-distractors';
    this.properties = {
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      }
    };
  }

  disableNext(): void {
    if(!!(this.selectedIndex && this.myIndex) && this.selectedIndex === this.myIndex) {
      const isDefined: boolean = UtilitiesService.isDefinedAndNotEmpty([this.querySelector('#one').value, this.querySelector('#two').value, this.querySelector('#three').value]);
      if(isDefined) {
        const one: string = this.querySelector('#one').value;
        const two: string = this.querySelector('#two').value;
        const three: string = this.querySelector('#three').value;
        Actions.setQuestionScaffold(this, {
          ...this.currentQuestionScaffold,
          answers: [
            this.currentQuestionScaffold.answers[0], {
              answer: one,
              comment: ''
            }, {
              answer: two,
              comment: ''
            }, {
              answer: three,
              comment: ''
            }
          ]
        });
      }

      // Not it because if they are defined, then we should not disable next, if they aren't defined, then disable next.
      Actions.setDisabledNext(this, !isDefined);
    }

  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
    this.answer = state.currentQuestionScaffold && state.currentQuestionScaffold.answers ? state.currentQuestionScaffold.answers[0].answer : this.answer;
	}
}

Polymer(PrendusQuestionScaffoldDistractors);
