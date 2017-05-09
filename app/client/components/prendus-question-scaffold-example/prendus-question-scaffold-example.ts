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
