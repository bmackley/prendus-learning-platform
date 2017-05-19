import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {Action} from '../../typings/action';

class PrendusQuestionScaffold {
  public is: string;
  public selectedIndex: number;
  public querySelector: any;
  public disableNext: boolean;
  public numberOfAnswers: number;
  public exampleQuestionScaffold: QuestionScaffold;
  public exampleQuestionScaffoldAnswers: QuestionScaffoldAnswer[];
  public questionScaffold: QuestionScaffold;
  public questionScaffoldAnswers: QuestionScaffoldAnswer[];
  public action: Action;
  public questionScaffoldsToRate: QuestionScaffold[];
  public questionScaffoldIdsToTake: string[];

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold';
  }

  async ready(): Promise<void> {
    this.selectedIndex = 0;
    this.numberOfAnswers = 4;

    //TODO take this out and have one from db
    const answers: { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer; } = {
      'question0': {
      text: '2.7 * 10 ^ 6 electrons',
      comment: 'Correct',
      correct: true,
      id: 'true'
    }, 'question1': {
      text: '3.6 * 10 ^ 6 electrons',
      comment: 'You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...',
      correct: false,
      id: 'false'
    }, 'question2': {
      text: '4.5 * 10 ^ 6 electrons',
      comment: 'You forgot to multiply by 2 to get the number of...',
      correct: false,
      id: 'false'
    }, 'question3': {
      text: '9 * 10 ^ 6 electrons',
      comment: 'You used protons instead of neutrons You used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutrons',
      correct: false,
      id: 'false'
    }};

    const temp: QuestionScaffold = {
      answers,
      explanation: 'To solve this problem, remember that Oxygen is diatomic as a gas, meaning it is found as O2, not O. This means we need to use 32 grams/mol to convert grams to moles. Then, multiply by the number of neutrons in an oxygen atom and multiply by 2 to get the number of neutrons in 45 grams of oxygen gas.',
      question: 'How many neutrons are in 45 grams of Oxygen gas?'
    };
    //TODO generate these dynamically.
    this.questionScaffoldsToRate = [
      temp, temp, temp
    ];

    //TODO generate these dynamically
    this.questionScaffoldIdsToTake = [
      '-KjJ6K_D96n3SBUxhUJ6', '-KjJ6K_D96n3SBUxhUJ6', '-KjJ6K_D96n3SBUxhUJ6', '-KjJ6K_D96n3SBUxhUJ6', '-KjJ6K_D96n3SBUxhUJ6'
    ];
    this.action = Actions.setQuestionScaffoldExample(temp);
  }

  calculateRateIndex(index: number): number {
    return index + 6;
  }

  calculateTakeIndex(index: number): number {
    //TODO SWITCH BACK TO 9
    return index + 1;
  }

  plusOne(index: number): number {
    return index + 1;
  }

  /**
   * Called when you press back
   */
  back(): void {
    --this.selectedIndex;
    this.action = Actions.setDisabledNext(false);
  }

  /**
   * Called when you press next
   */
  next(): void {
    ++this.selectedIndex;
    if(this.selectedIndex === this.querySelector('#iron-pages').items.length - 1) {
      // Reached the limit.
      this.action = Actions.setDisabledNext(true);
    }
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.disableNext = state.disableNext;
    this.exampleQuestionScaffold = state.currentQuestionScaffoldExample;
    this.questionScaffold = state.currentQuestionScaffold;
	}
}

Polymer(PrendusQuestionScaffold);
