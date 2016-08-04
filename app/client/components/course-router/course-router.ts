import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "course-router",
  mapStateToThis: function(e) {
  },
  ready: function(e){
    console.log('data', this.data)
    console.log('subroute', this.subroute)
    console.log('page', this.page)

  }
});
