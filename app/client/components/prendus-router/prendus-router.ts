import {StatechangeEvent} from '../../typings/statechange-event';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {State} from '../../typings/state';
import {Notification} from '../../node_modules/prendus-services/typings/notification';

class PrendusRouter {
  public is: string;
  public username: string;
  public loggedIn: 'true' | 'false';
	public isAdmin: boolean;
  public mainViewToShow: 'routes' | 'spinner';
  public notificationText: string;
  public notificationType: Notification;
  public observers: string[];
  public querySelector: any;
  public fire: any;

  beforeRegister() {
    this.is =  "prendus-router";

    this.observers = [
      '_routeChanged(route.*)',
			'_showNotification(notificationText, notificationType)'
    ];

  }
  async _routeChanged(routeObject: any): Promise<void> {
		Actions.hideMainSpinner(this);
    if(!this.username || !this.loggedIn) {
      // Call default action to determine if the user is logged in, since
      // this route change function is called before the first mapStateToThis.
      Actions.defaultAction(this);
      await Actions.checkUserAuth(this);
    }
    const route: string = routeObject.value.path;
    switch(route) {

      case '/': {
        if(this.loggedIn === 'true') {
          UtilitiesService.importElement(this, 'components/prendus-homepage/prendus-homepage.html', 'homepage');
        } else {
          UtilitiesService.importElement(this, 'components/prendus-landing/prendus-landing.html', 'landing');
        }

        break;
      }

      case '/login': {
				if(this.loggedIn === 'true') {
					// user doesn't need to log in again so redirect
					window.history.pushState({}, '', '/courses/home');
					this.fire('location-changed', {}, {node: window});
				} else {
					UtilitiesService.importElement(this, 'components/prendus-login/prendus-login.html', 'login');
				}
        break;
      }

      case '/signup': {
				if(this.loggedIn === 'true') {
					// user doesn't need to sign up again so redirect
					window.history.pushState({}, '', '/courses/home');
					this.fire('location-changed', {}, {node: window});
				} else {
					UtilitiesService.importElement(this, 'components/prendus-create-account/prendus-create-account.html', 'create-account');
				}
        break;
      }

      case '/profile': {
        UtilitiesService.importElement(this, 'components/prendus-profile/prendus-profile.html', 'profile');
        break;
      }

      case '/privacy-policy': {
        UtilitiesService.importElement(this, 'components/prendus-privacy-policy/prendus-privacy-policy.html', 'privacy-policy');
        break;
      }

      case '/terms-of-service': {
        UtilitiesService.importElement(this, 'components/prendus-terms-of-service/prendus-terms-of-service.html', 'terms-of-service');
        break;
      }

      case '/learning-structure': {
				if(this.isAdmin) {
					UtilitiesService.importElement(this, 'bower_components/prendus-question-components/components/prendus-learning-structure/prendus-learning-structure.html', 'learning-structure');
				} else {
					// don't allow non-admins to see this page
					window.history.pushState({}, '', '/404');
					this.fire('location-changed', {}, {node: window});
				}
        break;
      }

			case '/teacher-approval': {
				if(this.isAdmin) {
					UtilitiesService.importElement(this, 'components/prendus-teacher-approval/prendus-teacher-approval.html', 'teacher-approval');
				} else {
					// don't allow non-admins to see this page
					window.history.pushState({}, '', '/404');
					this.fire('location-changed', {}, {node: window});
				}
        break;
			}

      default: break;
    }

  }

	_showNotification(notificationType: Notification, notificationText: string): void {
		let _this = this;
		setTimeout(() => {
			this.querySelector('.prendus-notification').show();
		})
	}

  mapStateToThis(e: StatechangeEvent): void {
      const state: State = e.detail.state;
      this.username = state.currentUser.metaData.email;
      this.loggedIn = this.username ? 'true' : 'false';
			this.isAdmin = state.currentUser.userType === 'administrator';
      this.mainViewToShow = state.mainViewToShow;
			this.notificationType = state.notificationType;
			this.notificationText = state.notificationText;
  }
}

Polymer(PrendusRouter);
