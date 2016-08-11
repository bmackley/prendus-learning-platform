import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

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
    addCourseDialog.open();
  }
  addCourseFormDone(e){
    e.preventDefault();
    console.log('number one ', this.querySelector('#courseFormName').value)
    if(this.querySelector('#courseFormName').value){
      this.querySelector('#addCourseDialog').close();
      this.formTitle = this.querySelector('#courseFormName').value
      console.log('formTitle', this.formTitle)
      let newCourse = {
        private: false,
        title: this.formTitle,
        uid: this.uid,
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
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
  }
  ready() {
    Actions.getCoursesByUser.execute(this)
  }
}

Polymer(CourseHomepageComponent);
