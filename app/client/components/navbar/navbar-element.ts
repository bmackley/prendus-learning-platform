import {Actions} from '../../redux/actions.ts';
import {rootReducer} from '../../redux/reducers.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

Polymer({
  is: "navbar-element",
  listeners: {
  },
  mapStateToThis: function(e) {
    console.log('map state in navbar working')
    console.log(e.detail.state.currentUser)
    this.username = e.detail.state.currentUser.email;
  },
  changeURL: function(e){
    console.log(e.target.id)
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
    FirebaseService.init("AIzaSyANTSoOA6LZZDxM7vqIlAl37B7IqWL-6MY", "prendus.firebaseapp.com", "https://prendus.firebaseio.com", "prendus.appspot.com", "Prendus");
    Actions.checkUserAuth.execute(this);
    console.log('navbar Element')
  }
});
