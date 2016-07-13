import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "course-homepage",
  listeners: {
  },
  mapStateToThis: function(e) {
    console.log('map state in course-homepage-element working')
    console.log(e.detail.state.currentUser)
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
