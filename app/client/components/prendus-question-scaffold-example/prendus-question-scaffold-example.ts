import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';

class PrendusQuestionScaffoldExample {
  public is: string;
  public questionStem: string;
  public answers: string[];
  public comments: string[];
  public explanation: string;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-example';
  }

  ready(): void {
    this.questionStem = 'How many neutrons are in 45 grams of Oxygen gas?';
    this.explanation = 'To solve this problem, remember that Oxygen is diatomic as a gas, meaning it is found as O2, not O. This means we need to use 32 grams/mol to convert grams to moles. Then, multiply by the number of neutrons in an oxygen atom and multiply by 2 to get the number of neutrons in 45 grams of oxygen gas.';
    this.answers = ['answer 1', 'answer 2', 'answer 3', 'answer 4'];
    this.comments = ['comment 1', 'comment 2', 'comment 3', 'comment 4'];
  }
  
	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;

	}
}

Polymer(PrendusQuestionScaffoldExample);
