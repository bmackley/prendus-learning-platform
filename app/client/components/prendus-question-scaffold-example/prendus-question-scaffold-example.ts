import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';

// TODO temporary
interface Answer {
  answer: string;
  comment: string;
}
export class PrendusQuestionScaffoldExample {
  public is: string;
  public questionStem: string;
  public answers: Answer[];
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
  /**
   * Called from dom
   */
  calculateIndex(index: number): number {
    console.log('index ', index);
    return index + 3;
  }
  ready(): void {
    this.questionStem = 'How many neutrons are in 45 grams of Oxygen gas?';
    this.explanation = 'To solve this problem, remember that Oxygen is diatomic as a gas, meaning it is found as O2, not O. This means we need to use 32 grams/mol to convert grams to moles. Then, multiply by the number of neutrons in an oxygen atom and multiply by 2 to get the number of neutrons in 45 grams of oxygen gas.';
    this.answers = [ { answer: '2.7 * 10 ^ 6 electrons', comment: 'Correct'},
    { answer: '3.6 * 10 ^ 6 electrons', comment: 'You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...'},
    { answer: '4.5 * 10 ^ 6 electrons', comment: 'You forgot to multiply by 2 to get the number of...'},
    { answer: '9 * 10 ^ 6 electrons', comment: 'You used protons instead of neutrons You used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutrons'}];
  }

  disableNext(): void {
    if(this.myIndex === this.selectedIndex) {
      Actions.setDisabledNext(this, false);
    }
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;

	}
}

Polymer(PrendusQuestionScaffoldExample);
