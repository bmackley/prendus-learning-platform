import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {rootReducer} from '../../redux/reducers';
import {State} from '../../typings/state';
import {StatechangeEvent} from '../../typings/statechange-event';
import {Action} from '../../typings/action';

class PrendusApp extends Polymer.Element {
  public username: string;
  public rootReducer: (state: State, action: Action) => State;

  static get is() { return 'prendus-app'; }

  constructor() {
      super();

      if (window.PRENDUS_ENV === 'production') {
          FirebaseService.init('AIzaSyAKxLCb9pQdng5_1qi6SGnv4YVdkuO_iG4', 'prendus-production.firebaseapp.com', 'https://prendus-production.firebaseio.com', 'prendus-production.appspot.com', 'prendus-production');
      }
      else {
          FirebaseService.init('AIzaSyBv1mFan0M_QmBhQ7Hkgd0McMidMJtNFRg', 'prendus-development.firebaseapp.com', 'https://prendus-development.firebaseio.com', 'prendus-development.appspot.com', 'prendus-development');
      }
  }

  connectedCallback(){
      super.connectedCallback();
    this.rootReducer = rootReducer;
  }

  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state
    this.username = state.currentUser.email;
  }

}

window.customElements.define(PrendusApp.is, PrendusApp);
