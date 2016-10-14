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
  public userCourses: Course[];
  public sharedCourses: Course[];
  public starredCourses: Course[];
  public publicCourses: Course[];
  public userCoursesLength: number;
  public sharedCoursesLength: number;
  public starredCoursesLength: number;
  public collaborators: {
    [uid: string]: string[];
  };
  public errorMessage: string;
  beforeRegister() {
    this.is = 'prendus-course-homepage';
    this.properties = {
    };
  }

  async ready() {
      try {
          const user = await FirebaseService.getLoggedInUser();
          Actions.getCoursesByUser(this);
          Actions.getStarredCoursesByUser(this, user.uid);
          Actions.getSharedCoursesByUser(this, user.uid);
      } catch(error) {
          this.errorMessage = '';
          this.errorMessage = error.message;
      }
  }

  //Opens new course dialog
  addCourse(e) {
    this.querySelector('#add-course-dialog').open();
  }

  //Adds course to database
  addCourseFormDone(e) {
    e.preventDefault();
    if(this.querySelector('#courseFormName').value){
      this.querySelector('#add-course-dialog').close();
      const formTitle = this.querySelector('#courseFormName').value;
      const courseDescription = this.querySelector('#courseDescription').value;
      const tags = this.querySelector('#tags').tags;
      const newCourse = {
        visibility: 'public',
        title: formTitle,
        description: courseDescription,
        uid: this.uid
      }; 
      try { 
        Actions.addCourse(this, newCourse, tags);
      } catch(error) { 
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
    this.publicCourses = state.publicCourses;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
  }
}

Polymer(PrendusCourseHomepage);
