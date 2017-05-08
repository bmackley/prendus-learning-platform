import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';

export class PrendusQuestionScaffoldDistractors {
  public is: string;
  public one: string;
  public two: string;
  public three: string;
  public properties: any;
  public selectedIndex: number;
  public myIndex: number;
  public querySelector: any;
  public currentQuestionScaffold: QuestionScaffold;
  public question: string;
  public answer: string;
  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-distractors';
    this.properties = {
      selectedIndex: {
        type: Number,
      },
      myIndex: {
        type: Number
      }
    };
  }

  disableNext(): void {
    if(!!(this.selectedIndex && this.myIndex) && this.selectedIndex === this.myIndex) {
      if(UtilitiesService.isDefinedAndNotEmpty([this.querySelector('#one').value, this.querySelector('#two').value, this.querySelector('#three').value])) {
        const one: string = this.querySelector('#one').value;
        const two: string = this.querySelector('#two').value;
        const three: string = this.querySelector('#three').value;
        Actions.setQuestionScaffold(this, {
          ...this.currentQuestionScaffold,
          answers: [
            this.currentQuestionScaffold.answers[0], { answer: one, comment: ''}, { answer: two, comment: ''}, { answer: three, comment: ''}
          ]
        });
      }

      //TODO decide on calling this one twice
      Actions.setDisabledNext(this, !UtilitiesService.isDefinedAndNotEmpty([this.querySelector('#one').value, this.querySelector('#two').value, this.querySelector('#three').value]));
    }

  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.question = state.currentQuestionScaffold ? state.currentQuestionScaffold.question : this.question;
    this.answer = state.currentQuestionScaffold ? state.currentQuestionScaffold.answers[0].answer : this.answer;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
	}
}

Polymer(PrendusQuestionScaffoldDistractors);
