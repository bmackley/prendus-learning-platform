import {Actions} from '../../redux/actions.ts';
import {rootReducer} from '../../redux/reducers.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

export class PrendusNavbar {
  public is: string;
  public username: string;

  beforeRegister() {
    this.is = 'prendus-navbar';
  }

  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state
    this.username = state.currentUser.metaData.email;
  }

  toggleMenu(e: any){
    document.querySelector("#menu-items").toggle();
  }

  logOutUser(e: any){
    Actions.logOutUser.execute(this);
  }

  ready(){
    Actions.checkUserAuth.execute(this);
  }
}

Polymer(PrendusNavbar);
