import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';

export class CourseHomepageComponent {
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
    let location = `/courses/edit/${e.target.id}`
    window.history.pushState({}, '', location);
    this.fire('location-changed', {}, {node: window});
  }
  viewCourse(e: any){
    try{
      let location = `/courses/view/${e.target.id}`
      window.history.pushState({}, '', location);
      this.fire('location-changed', {}, {node: window});
    }catch(error){
      alert(error);
    }
  }
  addCourse(e){
    this.querySelector('#addCourseDialog'.open());
  }
  addCourseFormDone(e){
    e.preventDefault();
    if(this.querySelector('#courseFormName').value){

      this.querySelector('#addCourseDialog').close();
      this.formTitle = this.querySelector('#courseFormName').value
      let newCourse = {
        private: false,
        title: this.formTitle,
        creator: this.uid,
      }
      Actions.addCourse.execute(this, newCourse);
    }
  }
  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.courses = []
    if(state.courses){
      for(let key in state.courses){
        this.push('courses', state.courses[key])
      }
    }
    this.username = state.currentUser.email;
    this.uid = state.currentUser.uid;
  }
  ready() {
    Actions.getCoursesByUser.execute(this)
  }
}

Polymer(CourseHomepageComponent);
