import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface';
import {CourseVisibility} from '../../node_modules/prendus-services/interfaces/course-visibility.type';
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
  public courseTagNames: string[];
  public collaborators: {
    [uid: string]: string[];
  };
  public querySelector: any;
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
  addCourse(e: any) {
    this.querySelector('#add-course-dialog').open();
  }
  onRemove(e: any) {
    this.courseTagNames = this.courseTagNames.filter((tagName: string, index) => e.detail.index !== index);
  }
  onAdd(e: any) {
    if(!this.courseTagNames) {
      this.courseTagNames = [];
    }
    this.courseTagNames = [...this.courseTagNames, e.detail.tag];
  }
  //Adds course to database
  async addCourseFormDone(e: any) {
    e.preventDefault();
    if(this.querySelector('#courseFormName').value){
      this.querySelector('#add-course-dialog').close();
      const formTitle: string = this.querySelector('#courseFormName').value;
      const courseDescription: string = this.querySelector('#courseDescription').value;
      const visibility: CourseVisibility = 'public';
      const newCourse: Course = {
        id: '',
        concepts: null,
        tags: null,
        collaborators: null,
        userStars: null,
        visibility,
        title: formTitle,
        description: courseDescription,
        uid: this.uid
      };
      try {
        await Actions.addCourse(this, newCourse, this.courseTagNames);
        await Actions.getCoursesByUser(this);
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
