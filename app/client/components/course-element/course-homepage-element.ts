import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "course-homepage-element",
  listeners: {
  },
  mapStateToThis: function(e) {
    this.username = e.detail.state.currentUser.email;
  },
  properties: {
    },
  ready: function(e){

  }
});
