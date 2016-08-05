import {Actions} from '../../redux/actions.ts';
import {rootReducer} from '../../redux/reducers.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

Polymer({
  is: "navbar-element",
  listeners: {
  },
  mapStateToThis: function(e) {
    console.log('navbar', e.detail.state)
    this.username = e.detail.state.currentUser.email;
  },
  changeURL: function(e){
    let location = e.target.id
    window.history.pushState({}, '', location);
    this.fire('location-changed', {}, {node: window});
  },
  openDropdown: function(e){
    const btn = document.querySelector("iron-dropdown");
    btn.open()
  },
  logOutUser: function(e){
    Actions.logOutUser.execute(this);
  },
  properties: {
      username: {
        type: String,
        value: ''
      }
    },
  ready: function(e){
    Actions.checkUserAuth.execute(this);
  }
});
