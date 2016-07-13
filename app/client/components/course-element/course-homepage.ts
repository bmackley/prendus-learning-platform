import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "course-homepage",
  listeners: {
  },
  mapStateToThis: function(e) {
    this.username = e.detail.state.currentUser.email;
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
        creator: this.username,
      }
      Actions.addCourse.execute(this, newCourse, this.concepts);
    }
  },
  properties: {
  },
  ready: function(e){
    console.log('course homepage')
    //Check for authentication first in order to have the uid.
    //Actions.getCourses.execute(this)
  }
});
