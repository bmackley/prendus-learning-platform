import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {QuizSession} from '../../node_modules/prendus-services/typings/quiz-session';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {Action} from '../../typings/action';

class PrendusQuestionScaffold {
  public is: string;
  public selectedIndex: number;
  public querySelector: any;
  public disableNext: boolean;
  public properties: any;
  public minHeight: number;
  public questionScaffold: QuestionScaffold;
  public numberOfAnswers: number;
  public exampleQuestionScaffold: QuestionScaffold;
  public questionScaffoldAnswers: QuestionScaffoldAnswer[];
  public exampleQuestionScaffoldAnswers: QuestionScaffoldAnswer[];

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold';
  }

  async ready(): Promise<void> {
    this.selectedIndex = 0;
    this.minHeight = 0;
    this.numberOfAnswers = 4;
    Actions.setDisabledNext(this, false);

    //TODO take this out and have one from db
    const answers: { [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer; } = {
      'question0': {
      text: '2.7 * 10 ^ 6 electrons',
      comment: 'Correct',
      correct: true,
      variableName: 'true'
    }, 'question1': {
      text: '3.6 * 10 ^ 6 electrons',
      comment: 'You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...',
      correct: false,
      variableName: 'false'
    }, 'question2': {
      text: '4.5 * 10 ^ 6 electrons',
      comment: 'You forgot to multiply by 2 to get the number of...',
      correct: false,
      variableName: 'false'
    }, 'question3': {
      text: '9 * 10 ^ 6 electrons',
      comment: 'You used protons instead of neutrons You used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutrons',
      correct: false,
      variableName: 'false'
    }};

    const temp: QuestionScaffold = {
      answers,
      explanation: 'To solve this problem, remember that Oxygen is diatomic as a gas, meaning it is found as O2, not O. This means we need to use 32 grams/mol to convert grams to moles. Then, multiply by the number of neutrons in an oxygen atom and multiply by 2 to get the number of neutrons in 45 grams of oxygen gas.',
      question: 'How many neutrons are in 45 grams of Oxygen gas?'
    };

    Actions.setQuestionScaffoldExample(this, temp);
  }

  /**
   * Called when you press back
   */
  back(): void {
    this.setHeight();
    --this.selectedIndex;
  }

  /**
   * Called when you press next
   */
  next(): void {
    this.setHeight();
    ++this.selectedIndex;
    if(this.selectedIndex === this.querySelector('#iron-pages').items.length - 1) {
      // Reached the limit.
      Actions.setDisabledNext(this, true);
    }
  }

  //TODO decide on whether or not to keep height the same and how we should do it..
  setHeight(): void {
    const height: number = this.querySelector('.page').clientHeight;
    if(height > this.minHeight) {
      this.minHeight = height;
    }
    // this.querySelector('.page').style.minHeight = this.minHeight + 'px';
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.disableNext = state.disableNext;
    this.questionScaffold = state.currentQuestionScaffold;
    this.questionScaffoldAnswers = state.questionScaffoldAnswers;
    this.exampleQuestionScaffold = state.currentQuestionScaffoldExample;
    this.exampleQuestionScaffoldAnswers = state.exampleQuestionScaffoldAnswers;
	}
}

Polymer(PrendusQuestionScaffold);
