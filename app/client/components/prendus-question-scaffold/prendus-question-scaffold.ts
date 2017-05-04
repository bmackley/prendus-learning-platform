import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {QuizSession} from '../../node_modules/prendus-services/typings/quiz-session';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {Action} from '../../typings/action';
import {PrendusQuestionScaffoldNewQuestion} from '../prendus-question-scaffold-new-question/prendus-question-scaffold-new-question';
import {PrendusQuestionScaffoldDistractors} from '../prendus-question-scaffold-distractors/prendus-question-scaffold-distractors';
import {PrendusQuestionScaffoldComments} from '../prendus-question-scaffold-comments/prendus-question-scaffold-comments';
import {PrendusQuestionScaffoldExplanation} from '../prendus-question-scaffold-explanation/prendus-question-scaffold-explanation';
import {PrendusQuestionScaffoldFinishedQuestion} from '../prendus-question-scaffold-finished-question/prendus-question-scaffold-finished-question';
import {PrendusQuestionScaffoldExample} from '../prendus-question-scaffold-example/prendus-question-scaffold-example';

class PrendusQuestionScaffold {
  public is: string;
  public selectedIndex: number;
  public querySelector: any;
  public displayNext: boolean;
  public properties: any;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold';
  }

  async ready(): Promise<void> {
    this.selectedIndex = 0;
    Actions.setDisplayNext(this, true);
  }

  /**
   * Called when you press back on the dom
   */
  back(): void {
    this.iterate(-1);
  }

  /**
   * Called when you press next on the dom
   */
  next(): void {
    this.iterate(1);
  }

  iterate(direction: number): void {
    try {
      this.selectedIndex += direction;
      const element: PrendusQuestionScaffoldExample |
                     PrendusQuestionScaffoldNewQuestion |
                     PrendusQuestionScaffoldDistractors |
                     PrendusQuestionScaffoldComments |
                     PrendusQuestionScaffoldExplanation |
                     PrendusQuestionScaffoldFinishedQuestion
                     = this.querySelector('#iron-pages').items[this.selectedIndex];

      element.displayNext();
    } catch(error) {
      console.error('This element should\'ve implemented display next!');
      console.error(this.querySelector('#iron-pages').items[this.selectedIndex]);
      console.error(error);
      Actions.setDisplayNext(this, true);
    }
    if(this.selectedIndex === this.querySelector('#iron-pages').items.length - 1) {
      Actions.setDisplayNext(this, false);
    }
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.displayNext = state.displayNext;
	}
}

Polymer(PrendusQuestionScaffold);
