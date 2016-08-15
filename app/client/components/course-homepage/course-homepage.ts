import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

Polymer({
  is: "course-homepage",
  listeners: {
  },
  mapStateToThis: function(e) {

    this.userCourses = [];
    if(e.detail.state.courses){
      for(let key in e.detail.state.courses){
        this.push('userCourses', e.detail.state.courses[key])
      }
    }

    this.starredCourses = e.detail.state.starredCourses;
    this.sharedCourses = e.detail.state.sharedCourses;
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
      let location = `/courses/view/${e.target.id}`
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
  ready: async function(e) {
      const user = await FirebaseService.getLoggedInUser();

    Actions.getCoursesByUser.execute(this);
    Actions.getStarredCoursesByUser(this, user.uid);
    Actions.getSharedCoursesByUser(this, user.uid);
  }
});
