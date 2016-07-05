import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "course-homepage-element",
  listeners: {
  },
  mapStateToThis: function(e) {
    console.log('map state in course-homepage-element working')
    console.log(e.detail.state.currentUser)
    this.username = e.detail.state.currentUser.email;
  },
  properties: {
    },
  ready: function(e){

  }
});
