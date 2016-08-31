/// <reference path="../../node_modules/prendus-services/typings/polymer/polymer.d.ts" />
/// <reference path="../../node_modules/prendus-services/typings/custom.d.ts" />

import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {rootReducer} from '../../redux/reducers.ts';
import {State} from '../../interfaces/state.interface.ts';
import {Action} from '../../interfaces/action.interface.ts';

class PrendusApp {
  public is: string;
  public username: string;
  public rootReducer: (state: State, action: Action) => State;

  beforeRegister() {
    this.is = 'prendus-app';
  }

  mapStateToThis(e) {
    const state = e.detail.state
    this.username = state.currentUser.email;
  }

  ready(){
      if (window.PRENDUS_ENV === 'production') {
          FirebaseService.init('AIzaSyANTSoOA6LZZDxM7vqIlAl37B7IqWL-6MY', 'prendus.firebaseapp.com', 'https://prendus.firebaseio.com', 'prendus.appspot.com', 'Prendus');
      }
      else {
          FirebaseService.init('AIzaSyANTSoOA6LZZDxM7vqIlAl37B7IqWL-6MY', 'prendus.firebaseapp.com', 'https://prendus.firebaseio.com', 'prendus.appspot.com', 'Prendus');
      }

    this.rootReducer = rootReducer;
  }
}
addEventListener('WebComponentsReady', function() {
  Polymer(PrendusApp);
})
