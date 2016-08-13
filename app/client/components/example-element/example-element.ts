import {Actions} from '../../redux/actions.ts';

class ExampleComponent {
  public is: string;
  public username: string;

  beforeRegister() {
    this.is = 'example-element';
  }
  mapStateToThis(e) {
    const state = e.detail.state
    this.username = state.currentUser.email;
  }
}
Polymer(ExampleComponent);
