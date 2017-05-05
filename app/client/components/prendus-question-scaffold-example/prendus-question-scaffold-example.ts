import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';

export class PrendusQuestionScaffoldExample {
  public is: string;
  public questionStem: string;
  public answers: string[];
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
    window.addEventListener('resize', this.resize);
  }

  ready(): void {
    this.questionStem = 'How many neutrons are in 45 grams of Oxygen gas?';
    this.explanation = 'To solve this problem, remember that Oxygen is diatomic as a gas, meaning it is found as O2, not O. This means we need to use 32 grams/mol to convert grams to moles. Then, multiply by the number of neutrons in an oxygen atom and multiply by 2 to get the number of neutrons in 45 grams of oxygen gas.';
    this.answers = ['2.7 * 10 ^ 6 electrons', '3.6 * 10 ^ 6 electrons', '4.5 * 10 ^ 6 electrons', '9 * 10 ^ 6 electrons'];
    this.comments = ['Correct', 'You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...', 'You forgot to multiply by 2 to get the number of...', 'You used protons instead of neutrons You used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutrons'];
  }

  resize(): void {
    try {
      let i = 1;
      for(let i = 0; i < 4; i++) {
        const answer = document.querySelector(`#answer${i}`);
        const comment = document.querySelector(`#comment${i}`);
        // console.log('************************************************');
        // console.log(answer.style.height + ' ' + comment.style.height);
        // console.log(answer.clientHeight + ' ' + comment.clientHeight)
        const max: number = Math.max(answer.clientHeight, comment.clientHeight);
        if(answer.clientHeight === max) {
          comment.style.minHeight = `${max - 30}px`;
        } else if(comment.clientHeight === max) {
          answer.style.minHeight = `${max - 30}px`;
        }
        console.log('max ' + max)
        if(answer.style.height !== max) {
          console.error('setting height does not equal max');
        }
        // console.log(answer.style.height + ' ' + comment.style.height);
      }
    } catch(error) {
      console.error(error);
    }

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
