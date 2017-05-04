import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {QuizSession} from '../../node_modules/prendus-services/typings/quiz-session';
class PrendusQuestionScaffold {
  public is: string;
  public selectedIndex: number;
  public querySelector: any;
  public displayNext: boolean;
  public properties: any;
  public jwt: string;
  public quizSession: QuizSession;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold';
    this.properties = {
      selectedIndex: {
        type: Number,
        observer: 'shouldDisplayNext'
      }
    };
  }

  async ready(): Promise<void> {
    this.selectedIndex = 0;
    const user = await FirebaseService.getLoggedInUser();
    const jwt = await user.getToken();
    console.log('jwt ', jwt);
    this.jwt = jwt;
    //TODO this is horrible and should be removed once the view problem component can be initialized without a quiz session being handed to it
    const startQuizSessionAjax = this.querySelector(`#startQuizSessionAjax`)
    startQuizSessionAjax.body = {
        quizId: 'NO_QUIZ',
        jwt
    };

    const request = startQuizSessionAjax.generateRequest();
    await request.completes;

    const quizSession: QuizSession = request.response.quizSession;
    this.quizSession = quizSession;
    console.log('this.quizSession ', this.quizSession);
    //TODO this is horrible and should be removed once the view problem component can be initialized without a quiz session being handed to it
  }

  /**
   * Called when you press back on the dom
   */
  back(): void {
    --this.selectedIndex;
  }

  /**
   * Called when you press next on the dom
   */
  next(): void {
    ++this.selectedIndex;
  }

  /**
   * Called everytime this.selectedIndex changes.
   */
  shouldDisplayNext(): void {
    this.displayNext = (this.selectedIndex || 0) < this.querySelector('#iron-pages').items.length - 1;
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.jwt = state.jwt;
	}
}

Polymer(PrendusQuestionScaffold);
