import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class PrendusExample {
  public is: string;
  public username: string;

  beforeRegister() {
    this.is = 'prendus-example';
  }
  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state
    this.username = state.currentUser.email;
  }
}

Polymer(PrendusExample);
