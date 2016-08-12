import {rootReducer} from '../../redux/reducers.ts';
import {State} from '../../interfaces/state.interface.ts';
import {Action} from '../../interfaces/action.interface.ts';

export class AppComponent {
  public is: string;
  public username: string;
  public rootReducer: any; //Don't really know how to handle this one here. 

  beforeRegister() {
    this.is = 'app-element';
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
