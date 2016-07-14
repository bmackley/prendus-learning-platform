import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "course-homepage",
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
    console.log('courses', e.detail.state)
  },
  addCourse: function(e){
    addCourseDialog.open();
  },
  addCourseFormDone: function(e){
    e.preventDefault();
    if(this.$.courseFormName.value){
      //close the dialog form if there has already been an input
      addCourseDialog.close();
      let newCourse = {
        title: this.$.courseFormName.value,
        creator: this.uid,
      }
      Actions.addCourse.execute(this, newCourse);
      console.log(this.courses)
    }
  },
  properties: {
  },
  ready: function(e){
    console.log('course homepage')
    //Check for authentication first in order to have the uid.
    Actions.getCoursesByUser.execute(this)
  }
});
