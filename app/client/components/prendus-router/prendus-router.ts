import {StatechangeEvent} from '../../typings/statechange-event';

class PrendusRouter {
  public is: string;
  public username: string;
  public loggedIn: string;
  public mainViewToShow: 'routes' | 'spinner';
  public observers: string[];
  public $: any;

  beforeRegister() {
    this.is =  "prendus-router";
    this.observers = [
      '_routeChanged(route.*)'
    ];
  }

  _routeChanged(routeObject: any): void {
    const route: string = routeObject.value.path;
    if(route === '/profile') {
      if(!Polymer.isInstance(this.$.profile)) {
        Polymer.Base.importHref(
          'components/prendus-profile/prendus-profile.html',
          () => {
            // success
          }, () => {
            // error
          });
      }
    }
  }

  mapStateToThis(e: StatechangeEvent) {
      const state = e.detail.state;
      this.username = state.currentUser.metaData.email;
      this.loggedIn = this.username ? "true" : "false";
      this.mainViewToShow = state.mainViewToShow;
  }
}

Polymer(PrendusRouter);
