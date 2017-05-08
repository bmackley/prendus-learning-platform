import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';

export class PrendusQuestionScaffoldNewQuestion {
  public is: string;
  public properties: any;
  public question: string;
  public answer: string;
  public selectedIndex: number;
  public myIndex: number;
  public querySelector: any;
  public currentQuestionScaffold: QuestionScaffold;

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
      }
    };
  }
  ready(): void {
    //TODO take this out and let user make a question obviously.. 
    this.question = 'What is the derivative of 24x?';
    this.answer = '24';
  }
  /**
   * Checks if the question and answer have been entered and aren't empty and if
   * the inputs aren't empty.
   */
  disableNext(e: any): void {
    if(!!(this.selectedIndex && this.myIndex) && this.selectedIndex === this.myIndex) {
      const question: string = this.querySelector('#question').value;
      const answer: string = this.querySelector('#answer').value;
      if(UtilitiesService.isDefinedAndNotEmpty([question, answer])) {
        Actions.setQuestionScaffold(this, {
          ...this.currentQuestionScaffold,
          answers: [{ // only do first answer
              answer,
              comment: 'correct' // the first answer will always be correct
            }
          ],
          question
        });
      }
      //TODO decide on calling this twice...
      Actions.setDisabledNext(this, !UtilitiesService.isDefinedAndNotEmpty([this.querySelector('#question').value, this.querySelector('#answer').value]));
    }

  }


	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
	}
}

Polymer(PrendusQuestionScaffoldNewQuestion);
