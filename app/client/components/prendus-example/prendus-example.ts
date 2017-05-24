import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';

class PrendusExample extends Polymer.Element {
  public username: string;

  static get is() { return 'prendus-example'; }

  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state
    this.username = state.currentUser.metaData.email;
  }
}

window.customElements.define(PrendusExample.is, PrendusExample);
