import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "course-router",
  listeners: {
  },
  mapStateToThis: function(e) {
    this.courses = []
    if(e.detail.state.courses){
      for(let key in e.detail.state.courses){
        this.push('courses', e.detail.state.courses[key])
      }
    }
    this.username = e.detail.state.currentUser.email;
    this.uid = e.detail.state.currentUser.uid;
    this.courses = e.detail.state.courses
  },

  ready: function(e){
    // Actions.getCoursesByUser.execute(this)
    setTimeout(() => {
      console.log('course homepage route', this.route)
      console.log('course homepage data', this.data)
      console.log('course homepage data', this.id)
    }, 6000);
  }
});
