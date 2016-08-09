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
  },
  editCourse: function(e){
    let location = `/courses/edit/${e.target.id}`
    window.history.pushState({}, '', location);
    this.fire('location-changed', {}, {node: window});
    //Deprecated as of August 5
    // try{
    //   Actions.getCourseById.execute(this, e.target.id)
    //   let location = '/courses/edit'
    //   window.history.pushState({}, '', location);
    //   this.fire('location-changed', {}, {node: window});
    // }catch(error){
    //   console.log('Course Homepage Error', error)
    // }
  },
  viewCourse: function(e){
    //Deprecated as of August 5
    try{
      let location = `/courses/view-course/${e.target.id}`
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});

      // Actions.getCourseById.execute(this, e.target.id)
      // let location = '/courses/view'
      // window.history.pushState({}, '', location);
      // this.fire('location-changed', {}, {node: window});
    }catch(error){
      alert(error);
    }
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
    }
  },
  properties: {
  },
  ready: function(e){
    Actions.getCoursesByUser.execute(this)
  }
});
