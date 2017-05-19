import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {Action} from '../../typings/action';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';

class PrendusQuestionScaffoldRateQuestion {
  public is: string;
  public properties: any;
  public selectedIndex: number;
  public myIndex: number;
  public questionScaffold: QuestionScaffold;
  public action: Action;
  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-rate-question';
    this.properties = {
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      },
      questionScaffold: {
        type: Object
      },
      exampleIndex: {
        type: Number
      }
    };
  }

  disableNext(e: any): void {
    this.action = Actions.setDisabledNext(false);
  }


	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusQuestionScaffoldRateQuestion);
