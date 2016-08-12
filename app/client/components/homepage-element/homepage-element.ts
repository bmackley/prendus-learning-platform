import {Actions} from '../../redux/actions.ts';

export class HomepageComponent {
  public is: string;
  public username: string;

  beforeRegister() {
    this.is = 'index-element';
  }
  mapStateToThis(e) {
    const state = e.detail.state
    this.username = state.currentUser.email;
  }
}
Polymer(HomepageComponent);
