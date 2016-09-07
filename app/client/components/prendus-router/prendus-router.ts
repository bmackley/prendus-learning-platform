import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class PrendusRouter {
  public is: string;
  public username: string;
  public loggedIn: string;
  public mainViewToShow: 'routes' | 'spinner';

  beforeRegister() {
    this.is =  "prendus-router";
  }

  mapStateToThis(e: StatechangeEvent) {
      const state = e.detail.state;
      this.username = state.currentUser.metaData.email;
      this.loggedIn = this.username ? "true" : "false";
      this.mainViewToShow = state.mainViewToShow;
  }
}

Polymer(PrendusRouter);
