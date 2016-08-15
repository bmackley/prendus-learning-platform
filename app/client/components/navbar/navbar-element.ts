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

  changeURL(e: any){
    const location = e.target.id
    window.history.pushState({}, '', location);
    this.fire('location-changed', {}, {node: window});
  }

  openDropdown(e: any){
    const btn = document.querySelector("iron-dropdown");
    btn.open()
  }

  logOutUser(e: any){
    Actions.logOutUser.execute(this);
  }

  ready(){
    Actions.checkUserAuth.execute(this);
  }
}

Polymer(CourseNavbarComponent);
