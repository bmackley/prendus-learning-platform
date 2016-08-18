/// <reference path="../../node_modules/prendus-services/typings/polymer/polymer.d.ts" />
/// <reference path="../../node_modules/prendus-services/typings/custom.d.ts" />

import {rootReducer} from '../../redux/reducers.ts';
import {State} from '../../interfaces/state.interface.ts';
import {Action} from '../../interfaces/action.interface.ts';

export class AppComponent {
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
    this.rootReducer = rootReducer;
  }
}
Polymer(AppComponent);
