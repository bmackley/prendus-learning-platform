import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';

export class PrendusPayment {
  public is: string;


  beforeRegister(): void {
    this.is = 'prendus-payment';
  }

	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusPayment);
