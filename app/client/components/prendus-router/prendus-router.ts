import {StatechangeEvent} from '../../typings/statechange-event';
import {Actions} from '../../redux/actions';

class PrendusRouter {
  public is: string;
  public username: string;
  public loggedIn: string;
  public mainViewToShow: 'routes' | 'spinner';
  public observers: string[];
  public querySelector: any;

  beforeRegister() {
    this.is =  "prendus-router";

    this.observers = [
      '_routeChanged(route.*)'
    ];

  }
  _routeChanged(routeObject: any): void {
    if(!this.username || !this.loggedIn) {
      // Call default action to determine if the user is logged in, since
      // this route change function is called before the first mapStateToThis.
      Actions.defaultAction(this);
    }
    const route: string = routeObject.value.path;
    switch(route) {

      case '/': {
        this.importElement('components/prendus-landing/prendus-landing.html', 'landing');
        this.importElement('components/prendus-homepage/prendus-homepage.html', 'homepage');
        break;
      }

      case '/login': {
        console.log('login');
        this.importElement('components/prendus-login/prendus-login.html', 'login');
        break;
      }

      case '/signup': {
        this.importElement('components/prendus-create-account/prendus-create-account.html', 'create-account');
        break;
      }

      case '/profile': {
        this.importElement('components/prendus-profile/prendus-profile.html', 'profile');
        break;
      }

      case '/privacy-policy': {
        this.importElement('components/prendus-privacy-policy/prendus-privacy-policy.html', 'privacy-policy');
        break;
      }

      case '/terms-of-service': {
        this.importElement('components/prendus-terms-of-service/prendus-terms-of-service.html', 'terms-of-service');
        break;
      }

      default: break;
    }

  }

  importElement(path: string, id: string): void {
    if(!Polymer.isInstance(this.querySelector(`#${id}`))) {
      Polymer.Base.importHref(
        path,
        () => {
          //success
        }, () => {
          //failure
          throw new Error('Importing element failed');
        });

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
