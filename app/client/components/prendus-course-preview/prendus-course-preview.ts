import {Course} from '../../node_modules/prendus-services/typings/course';
import {StatechangeEvent} from '../../typings/statechange-event';
import {User} from '../../node_modules/prendus-services/typings/user';
import {Actions} from '../../redux/actions';
import {State} from '../../typings/state';

class PrendusCoursePreview {
    public is: string;
    public properties: any;
    public course: Course;
    public starIcon: string;
    public user: User;
    public numStars: number;
    public uid: string;
    public hasEditAccess: boolean;
    public successMessage: string;
    public errorMessage: string;
		public querySelector: any;
		public style: any;
    public numberOfPublicCoursesLoaded: number;

    beforeRegister(): void {
        this.is = 'prendus-course-preview';
        this.properties = {
            course: {
                type: Object,
                observer: 'init'
            }
        };
    }

    async init(course: Course): Promise<void> {
      try {
        await Actions.checkUserAuth(this);
        this.numStars = Object.keys(course.userStars || {}).length;
				this.hasEditAccess = this.uid === course.uid;
				// put this back once collaborators work again
				// this.hasEditAccess = course.collaborators && this.uid in course.collaborators;
      } catch(error) {
				console.error(error);
      }
    }

    async starClick(e: any): Promise<void> {
      e.stopPropagation();
			e.preventDefault();
      try {
        await Actions.checkUserAuth(this);
        if (this.user && this.user.metaData.uid) {
            if (this.user.starredCourses) {
                if (this.user.starredCourses[this.course.id]) {
                    await Actions.unstarCourse(this, this.course.id);
                } else {
                    await Actions.starCourse(this, this.course.id);
                }
            } else {
                await Actions.starCourse(this, this.course.id);
            }
            Actions.getCoursesByVisibility(this, 'public', this.numberOfPublicCoursesLoaded);
            Actions.getCoursesByUser(this);
            Actions.getSharedCoursesByUser(this, this.user.metaData.uid);
            Actions.getStarredCoursesByUser(this, this.user.metaData.uid);
        } else {
          this.errorMessage = '';
          this.errorMessage = 'You must be logged in to star a course';
        }
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }

    openDeleteModal(e: any): void {
      e.stopPropagation();
			e.preventDefault();
			// this dialog does not have a backdrop for now because of issues with the
			// paper-dialog element (see https://github.com/PolymerElements/paper-dialog/issues/7)
			// this is a hack to prevent stacking errors
			this.style.zIndex = 1;
			this.querySelector('#confirm-delete-modal').open();
		}

		closeDeleteModal(e: any) {
			// hack to prevent stacking errors
			this.style.zIndex = 0;
		}

    async deleteCourse(e: any): Promise<void> {
      this.querySelector('#confirm-delete-modal').close();
			this.closeDeleteModal(e);

      try {
        await Actions.deleteCourse(this, this.course);
        await Actions.getCoursesByVisibility(this, 'public', this.numberOfPublicCoursesLoaded);
        this.successMessage = '';
        this.successMessage = 'Course successfully deleted';
      } catch (error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }

    mapStateToThis(e: StatechangeEvent): void {
        const state: State = e.detail.state;
        this.user = state.currentUser;
        this.uid = state.currentUser.metaData.uid;
        this.numberOfPublicCoursesLoaded = state.publicCourses ? state.publicCourses.length : 0;
        this.numStars = Object.keys(this.course.userStars || {}).length;
        if (this.user && this.user.starredCourses && this.course) {
            if (this.user.starredCourses[this.course.id]) {
                this.starIcon = 'icons:star';
            }
            else {
                this.starIcon = 'icons:star-border';
            }
        }
        else {
            this.starIcon = `icons:star-border`;
        }
    }
}

Polymer(PrendusCoursePreview);
