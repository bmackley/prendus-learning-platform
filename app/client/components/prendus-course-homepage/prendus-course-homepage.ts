import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class PrendusCourseHomepage {
  public is: string;
  public properties: any;
  public courses: string[];
  public newCourse: Course;
  private uid: string;
  public username: string;
  public formTitle: string;
  public courseDescription: string;
  public userCourses: Course[];
  public sharedCourses: Course[];
  public starredCourses: Course[];
  public collaborators: {
    [uid: string]: string[];
  }
  public errorMessage: string;
  public tags: string;

  beforeRegister() {
    this.is = 'prendus-course-homepage';
    this.properties = {
      tags: {
        type: String,
        observer: 'updateTags'
      },
    }
  }

  async ready() {
      try{
          const user = await FirebaseService.getLoggedInUser();
          Actions.getCoursesByUser.execute(this);
          Actions.getStarredCoursesByUser(this, user.uid);
          Actions.getSharedCoursesByUser(this, user.uid);
      }catch(error){
          this.errorMessage = '';
          this.errorMessage = error.message;
      }
  }

  updateTags(e){
    console.log('updating tags', e)
    console.log('updating tags tags value', this.tags)
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
      try{
        Actions.addCourse.execute(this, newCourse);
      }catch(error){
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
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
