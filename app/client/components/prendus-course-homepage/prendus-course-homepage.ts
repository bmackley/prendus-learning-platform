import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {StatechangeEvent} from '../../typings/statechange-event';
import {CourseVisibility} from '../../node_modules/prendus-services/typings/course-visibility';
import {Action} from '../../typings/action';

class PrendusCourseHomepage extends Polymer.Element{
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
  public courseTagNames: string[];
  public collaborators: {
    [uid: string]: string[];
  };
  public querySelector: any;
  public errorMessage: string;
  public numberOfPublicCoursesLoaded: number;
  public enrolledCourses: Course[];
  public action: Action;

  static get is() { return 'prendus-course-homepage'; }

  async connectedCallback(): Promise<void> {
      super.connectedCallback();
      try {
          Actions.showMainSpinner(this);
          const user = await FirebaseService.getLoggedInUser();
          // Since this is the course page, the first thing they see is their own courses.
          // So it is wise to await here.
          await Actions.getCoursesByUser(this);
          Actions.getStarredCoursesByUser(this, user.uid);
          Actions.getSharedCoursesByUser(this, user.uid);
					Actions.getCoursesByVisibility(this, 'public', 6);
          this.action = await Actions.setEnrolledCourses();
          Actions.hideMainSpinner(this);

      } catch(error) {
				Actions.hideMainSpinner(this);
				Actions.showNotification(this, 'error', 'Error loading courses.');
				console.error(error);
      }
  }

  openCreateCourseDialog(e: any): void {
    this.shadowRoot.querySelector('#create-course-dialog').open();
  }

	canCreateCourse(courseTitle: string, courseDescription: string): boolean {
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

	createCourseOnEnter(e: any): void {
		if(			e.keyCode === 13
				&&	this.shadowRoot.querySelector('#edit-course-name').validate()
				&&	this.shadowRoot.querySelector('#edit-course-description').validate()) {
			this.createCourse(e);
		}
	}

  // Adds course to database
  async createCourse(e: any): Promise<void> {
    this.shadowRoot.querySelector('#create-course-dialog').close();
    const visibility: CourseVisibility = 'public';
    const newCourse: Course = {
      id: '',
      lessons: null,
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
      // +1 because we added a course!
      await Actions.getCoursesByVisibility(this, 'public', this.numberOfPublicCoursesLoaded + 1);
    } catch(error) {
			Actions.showNotification(this, 'error', 'Could not create course.');
			console.error(error);
    }
    this.courseTitle = '';
    this.courseDescription = '';
		this.shadowRoot.querySelector('#edit-course-name').invalid = false;
		this.shadowRoot.querySelector('#edit-course-description').invalid = false;
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state = e.detail.state;
    this.userCourses = state.courses;
    this.starredCourses = state.starredCourses;
    this.sharedCourses = state.sharedCourses;
    this.publicCourses = state.publicCourses;
    this.numberOfPublicCoursesLoaded = state.publicCourses ? state.publicCourses.length : 0;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
    this.enrolledCourses = state.enrolledCourses;
  }
}
window.customElements.define(PrendusCourseHomepage.is, PrendusCourseHomepage);
