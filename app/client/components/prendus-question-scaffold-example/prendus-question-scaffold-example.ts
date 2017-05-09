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
  public questionScaffold: QuestionScaffold;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-example' ;
    this.properties = {
      selectedIndex: {
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      },
      questionScaffold: {
        type: Object,
        observer: 'change'
      }
    };
  }
  change(): void {
    this.answers = Object.keys(this.questionScaffold.answers || {}).map((key) => {
        return Object.assign({}, this.questionScaffold.answers[key], {
            id: key
        });
    });
  }
  
  ready(): void {
    if(!this.questionScaffold) {
      const correct: boolean = true;
      const incorrect: boolean = false;
      const answers: {
        [questionScaffoldAnswerId: string]: QuestionScaffoldAnswer;
      } = { 'question0': {
        text: '2.7 * 10 ^ 6 electrons',
        comment: 'Correct',
        correct,
        variableName: correct.toString()
      }, 'question1': {
        text: '3.6 * 10 ^ 6 electrons',
        comment: 'You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...You forgot to divide by 32 grams/mol because...',
        correct: incorrect,
        variableName: incorrect.toString()
      }, 'question2': {
        text: '4.5 * 10 ^ 6 electrons',
        comment: 'You forgot to multiply by 2 to get the number of...',
        correct: incorrect,
        variableName: incorrect.toString()
      },'question3': {
        text: '9 * 10 ^ 6 electrons',
        comment: 'You used protons instead of neutrons You used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutronsYou used protons instead of neutrons',
        correct: incorrect,
        variableName: incorrect.toString()
      }};

      const temp: QuestionScaffold = {
        answers,
        explanation: 'To solve this problem, remember that Oxygen is diatomic as a gas, meaning it is found as O2, not O. This means we need to use 32 grams/mol to convert grams to moles. Then, multiply by the number of neutrons in an oxygen atom and multiply by 2 to get the number of neutrons in 45 grams of oxygen gas.',
        question: 'How many neutrons are in 45 grams of Oxygen gas?'
      };
      //TODO take this out and have one from db
      // Actions.setQuestionScaffoldExample(this, temp);
      this.questionScaffold = temp;
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
