import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class PrendusCourseHomepage {
  public is: string;
  public courses: string[];
  public newCourse: Course;
  private uid: string;
  public username: string;
  public formTitle: string;
  public courseDescription: string;

  beforeRegister() {
    this.is = 'prendus-course-homepage';
  }

  async ready() {
      const user = await FirebaseService.getLoggedInUser();
      Actions.getCoursesByUser.execute(this);
      Actions.getStarredCoursesByUser(this, user.uid);
      Actions.getSharedCoursesByUser(this, user.uid);
  }

  editCourse(e: any) {
    const location = `/courses/edit/${e.target.id}`
    window.history.pushState({}, '', location);
    this.fire('location-changed', {}, {node: window});
  }

  viewCourse(e: any) {
    try{
      const location = `/courses/view/${e.target.id}`
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    }catch(error){
      alert(error);
    }
  }

  addCourse(e) {
    this.querySelector('#addCourseDialog').open();
  }

  addCourseFormDone(e) {
    e.preventDefault();
    if(this.querySelector('#courseFormName').value){
      this.querySelector('#addCourseDialog').close();
      this.formTitle = this.querySelector('#courseFormName').value;
      this.courseDescription = this.querySelector('#courseDescription').value;
      const newCourse = {
        visibility: 'public',
        title: this.formTitle,
        description: this.courseDescription,
        uid: this.uid
      }
      Actions.addCourse.execute(this, newCourse);
      this.querySelector('#courseFormName').value = '';
    }
  }

  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.userCourses = state.courses;
    this.starredCourses = state.starredCourses;
    this.sharedCourses = state.sharedCourses;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
  }
}

Polymer(PrendusCourseHomepage);
