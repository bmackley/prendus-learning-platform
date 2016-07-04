import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "example-element",
  listeners: {
  },
  mapStateToThis: function(e) {
    console.log('map state in navbar working')
    console.log(e.detail.state.currentUser)
    this.username = e.detail.state.currentUser.email;
  },
  properties: {
    },
  ready: function(e){

  }
});
