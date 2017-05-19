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
  public querySelector: any;

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
      }
    };
  }

  ready(): void {
    this.maxSliderValue = 10;
    this.minSliderValue = 1;
    this.quality = 0;
    this.difficulty = 0;
    this.accuracy = 0;
  }

  disableNext(e: any): void {
    if(this.selectedIndex !== undefined && this.myIndex !== undefined && this.selectedIndex === this.myIndex) {
      this.action = Actions.setDisabledNext(true);
    }
  }

  submit(): void {
    try {
      // TODO Submit values
      const quality: number = this.querySelector('#quality').value;
      const difficulty: number = this.querySelector('#difficulty').value;
      const accuracy: number = this.querySelector('#accuracy').value;
      console.log('quality ', quality, ' difficulty ', difficulty, ' accuracy ', accuracy);
      this.action = Actions.setDisabledNext(false);
      Actions.showNotification(this, 'success', 'Ratings submitted');
    } catch(error) {
      console.error(error);
    }
  }


	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusQuestionScaffoldRateQuestion);
