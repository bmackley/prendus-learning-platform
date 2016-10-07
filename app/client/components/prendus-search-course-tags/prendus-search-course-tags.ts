import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class PrendusSearchCourseTags {
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
    this.is = 'prendus-search-course-tags';
    this.properties = {
    };
  }

  async ready() {
      try {
          const user = await FirebaseService.getLoggedInUser();
      } catch(error) {
          this.errorMessage = '';
          this.errorMessage = error.message;
      }
  }
  //looks through course tags in database for matching tags  
  async searchTagsInDB(e) {
    e.preventDefault();
    const tagList = this.querySelector('#searchTags').tags;
    try {
      const courses = await Actions.lookupTags(tagList);
      console.log(courses);
      //TODO show resulting courses
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }
  
  clearTags(e) {
    this.querySelector('#searchTags').tags = [];
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

Polymer(PrendusSearchCourseTags);
