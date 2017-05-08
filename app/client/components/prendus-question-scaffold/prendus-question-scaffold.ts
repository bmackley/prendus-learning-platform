import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {QuizSession} from '../../node_modules/prendus-services/typings/quiz-session';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {Action} from '../../typings/action';

class PrendusQuestionScaffold {
  public is: string;
  public selectedIndex: number;
  public querySelector: any;
  public disableNext: boolean;
  public properties: any;
  public minHeight: number;
  public questionScaffold: QuestionScaffold;
  beforeRegister(): void {
    this.is = 'prendus-question-scaffold';
  }

  async ready(): Promise<void> {
    this.selectedIndex = 0;
    this.minHeight = 0;
    Actions.setDisabledNext(this, false);
  }

  /**
   * Called when you press back on the dom
   */
  back(): void {
    this.setHeight();
    --this.selectedIndex;
  }

  /**
   * Called when you press next on the dom
   */
  next(): void {
    this.setHeight();
    ++this.selectedIndex;
    if(this.selectedIndex === this.querySelector('#iron-pages').items.length - 1) {
      Actions.setDisabledNext(this, true);
    }
  }

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
    if(this.querySelector('#next-button')) {
      this.querySelector('#next-button').disabled = this.disableNext;
    }

	}
}

Polymer(PrendusQuestionScaffold);
