import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class CourseHomepageComponent {
  public is: string;
  public courses: string[];
  public newCourse: Course;
  private uid: string;
  public username: string;
  public formTitle: string;

  beforeRegister() {
    this.is = 'course-homepage';
  }
  editCourse(e: any){
    const location = `/courses/edit/${e.target.id}`
    window.history.pushState({}, '', location);
    this.fire('location-changed', {}, {node: window});
  }
  viewCourse(e: any){
    try{
      const location = `/courses/view/${e.target.id}`
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    }catch(error){
      alert(error);
    }
  }
  addCourse(e){
    addCourseDialog.open();
  }
  addCourseFormDone(e){
    e.preventDefault();
    if(this.querySelector('#courseFormName').value){
      this.querySelector('#addCourseDialog').close();
      this.formTitle = this.querySelector('#courseFormName').value
      const newCourse = {
        private: false,
        title: this.formTitle,
        uid: this.uid,
      }
      Actions.addCourse.execute(this, newCourse);
    }
  }
  mapStateToThis(e: StatechangeEvent) {
    console.log('homepage state', e.detail.state)
    const state = e.detail.state;
    this.courses = state.courses;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
  }
  ready() {
    Actions.getCoursesByUser.execute(this)
  }
}

Polymer(CourseHomepageComponent);
