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
  public maxSliderValue: number;
  public minSliderValue: number;
  public quality: number;
  public difficulty: number;
  public accuracy: number;

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
        type: Object,
        observer: 'init'
      }
    };
  }
  init(): void {
    console.log(this.questionScaffold);
  }
  ready(): void {
    this.maxSliderValue = 10;
    this.minSliderValue = 1;
    this.quality = 0;
    this.difficulty = 0;
    this.accuracy = 0;
  }
  disableNext(e: any): void {
    this.action = Actions.setDisabledNext(false);
  }


	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusQuestionScaffoldRateQuestion);
