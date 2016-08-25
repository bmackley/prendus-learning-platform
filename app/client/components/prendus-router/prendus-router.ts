import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class PrendusRouter {
  public is: string;
  public mainViewToShow: 'routes' | 'spinner';

  beforeRegister() {
    this.is =  "prendus-router";
  }

  mapStateToThis(e: StatechangeEvent) {
      const state = e.detail.state;

      this.mainViewToShow = state.mainViewToShow;
  }
}

Polymer(PrendusRouter);
