import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {Action} from '../../typings/action';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {QuestionRating} from '../../node_modules/prendus-services/typings/question-rating';
import {QuestionRatingModel} from '../../node_modules/prendus-services/models/question-rating-model';

class PrendusQuestionScaffoldRateQuestion extends Polymer.Element {
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
  public uid: string;

  static get is() { return 'prendus-question-scaffold-rate-question'; }
  static get properties() {
      return {
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

  constructor() {
      super();

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

  async submit(): Promise<void> {
    try {
      const quality: number = this.querySelector('#quality').value;
      const difficulty: number = this.querySelector('#difficulty').value;
      const accuracy: number = this.querySelector('#accuracy').value;
      const questionRating: QuestionRating = {
        quality,
        difficulty,
        accuracy,
        questionId: this.questionScaffold.convertedQuestion.id,
        uid: this.uid,
        id: null
      };

      await Actions.setQuestionRating(questionRating);
      this.action = Actions.setDisabledNext(false);
      Actions.showNotification(this, 'success', 'Ratings submitted');
    } catch(error) {
      console.error(error);
    }
  }


	mapStateToThis(e: CustomEvent): void {
		const state: State = e.detail.state;
    this.uid = state.currentUser && state.currentUser.metaData ? state.currentUser.metaData.uid : this.uid;
	}
}

window.customElements.define(PrendusQuestionScaffoldRateQuestion.is, PrendusQuestionScaffoldRateQuestion);
