import {Actions} from '../../redux/actions.ts';
import {rootReducer} from '../../redux/reducers.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

export class CourseNavbarComponent {
  public is: string;
  public username: string;

  beforeRegister() {
    this.is = 'navbar-element';
  }
  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state
    this.username = state.currentUser.metaData.email;
  }
  changeURL(e){
    let location = e.target.id
    window.history.pushState({}, '', location);
    this.fire('location-changed', {}, {node: window});
  }
  openDropdown(e){
    const btn = document.querySelector("iron-dropdown");
    btn.open()
  }
  logOutUser(e){
    Actions.logOutUser.execute(this);
  }
  properties: {
    username: {
      type: String,
      value: ''
    }
  };
  ready(e){
    Actions.checkUserAuth.execute(this);
  }
}

Polymer(CourseNavbarComponent);
