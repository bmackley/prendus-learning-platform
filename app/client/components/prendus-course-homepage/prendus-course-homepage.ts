import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {StatechangeEvent} from '../../typings/statechange-event';
import {CourseVisibility} from '../../node_modules/prendus-services/typings/course-visibility';

class PrendusCourseHomepage {
  public is: string;
  public properties: any;
  public courses: string[];
  public newCourse: Course;
	public courseTitle: string;
	public courseDescription: string;
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

  beforeRegister(): void {
    this.is = 'prendus-course-homepage';
    this.properties = {
    };
  }

  async ready(): Promise<void> {
      try {
          Actions.showMainSpinner(this);
          const user = await FirebaseService.getLoggedInUser();
          // Since this is the course page, the first thing they see is their own courses.
          // So it is wise to await here.
          await Actions.getCoursesByUser(this);
          Actions.getStarredCoursesByUser(this, user.uid);
          Actions.getSharedCoursesByUser(this, user.uid);
					Actions.getCoursesByVisibility(this, 'public', 6);
          Actions.hideMainSpinner(this);
      } catch(error) {
          this.errorMessage = '';
          this.errorMessage = error.message;
      }
  }

  openAddCourseDialog(e: any): void {
    this.querySelector('#add-course-dialog').open();
  }

	canAddCourse(courseTitle: string, courseDescription: string): boolean {
		return !!(courseTitle.length && courseDescription.length);
	}

  onRemove(e: any): void {
    this.courseTagNames = this.courseTagNames.filter((tagName: string, index) => e.detail.index !== index);
  }

  onAdd(e: any): void {
    if(!this.courseTagNames) {
      this.courseTagNames = [];
    }
    this.courseTagNames = [...this.courseTagNames, e.detail.tag];
  }

  // Adds course to database
  async addCourse(e: any): Promise<void> {
    this.querySelector('#add-course-dialog').close();
    const visibility: CourseVisibility = 'public';
    const newCourse: Course = {
      id: '',
      concepts: null,
      tags: null,
      collaborators: null,
			dueDate: 0,
      userStars: null,
      visibility,
      title: this.courseTitle,
      description: this.courseDescription,
      uid: this.uid
    };
    try {
      await Actions.addCourse(this, newCourse, this.courseTagNames);
      await Actions.getCoursesByUser(this);
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
    this.courseTitle = '';
    this.courseDescription = '';
		this.querySelector('#edit-course-name').invalid = false;
		this.querySelector('#edit-course-description').invalid = false;
  }

  mapStateToThis(e: StatechangeEvent): void {
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
