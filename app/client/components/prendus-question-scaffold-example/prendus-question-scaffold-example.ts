import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
export class PrendusQuestionScaffoldExample {
  public is: string;
  public questionStem: string;
  public answers: QuestionScaffoldAnswer[];
  public comments: string[];
  public explanation: string;
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;
  public querySelector: any;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-example' ;
    this.properties = {
      selectedIndex: {
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      }
    };
  }

  ready(): void {

    const temp: QuestionScaffold = {
      answers: [ { answer: '2.7 * 10 ^ 6 electrons', comment: 'Correct'},
      { answer: '3.6 * 10 ^ 6 electrons', comment: 'You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...'},
      { answer: '4.5 * 10 ^ 6 electrons', comment: 'You forgot to multiply by 2 to get the number of...'},
      { answer: '9 * 10 ^ 6 electrons', comment: 'You used protons instead of neutrons You used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutrons'}],
      explanation: 'To solve this problem, remember that Oxygen is diatomic as a gas, meaning it is found as O2, not O. This means we need to use 32 grams/mol to convert grams to moles. Then, multiply by the number of neutrons in an oxygen atom and multiply by 2 to get the number of neutrons in 45 grams of oxygen gas.',
      question: 'How many neutrons are in 45 grams of Oxygen gas?'
    };
    //TODO take this out and have one from db
    Actions.setQuestionScaffoldExample(this, temp);
  }

  disableNext(): void {
    if(this.myIndex === this.selectedIndex) {
      Actions.setDisabledNext(this, false);
    }
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.questionStem = state.currentQuestionScaffoldExample ? state.currentQuestionScaffoldExample.question : this.questionStem;
    this.answers = state.currentQuestionScaffoldExample ? state.currentQuestionScaffoldExample.answers : this.answers;
    this.explanation = state.currentQuestionScaffoldExample ? state.currentQuestionScaffoldExample.explanation : this.explanation;
	}
}

Polymer(PrendusQuestionScaffoldExample);
