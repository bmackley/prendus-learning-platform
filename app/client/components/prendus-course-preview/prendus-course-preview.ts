import {Course} from '../../node_modules/prendus-services/typings/course';
import {StatechangeEvent} from '../../typings/statechange-event';
import {User} from '../../node_modules/prendus-services/typings/user';
import {Actions} from '../../redux/actions';

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

    beforeRegister(): void {
        this.is = 'prendus-course-preview';
        this.properties = {
            course: {
                type: Object,
                observer: 'init'
            }
        };
    }

    async init(course: Course) {
      try{
        await Actions.checkUserAuth(this);
        this.numStars = Object.keys(this.course.userStars || {}).length;
        if(this.user){
          if(course.uid === this.uid){
            this.hasEditAccess = true;
          }else if(course.collaborators){
            this.hasEditAccess = this.checkCollaboratorStatus(course.collaborators, this.uid);
          }
        }
      }catch(error){
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }

    checkCollaboratorStatus(collaborators: {  [uid: string]: string}, uid: string){
      if (collaborators[uid]){
        return true;
      }else{
        return false;
      }
    }

    async starClick(e: any) {
      e.stopPropagation();
			e.preventDefault();
      try{
        await Actions.checkUserAuth(this);
        if (this.user && this.user.metaData.uid) {
            if (this.user.starredCourses) {
                if (this.user.starredCourses[this.course.id]) {
                    await Actions.unstarCourse(this, this.course.id);
                }
                else {
                    await Actions.starCourse(this, this.course.id);
                }
            }
            else {
                await Actions.starCourse(this, this.course.id);
            }
            Actions.getCoursesByVisibility(this, 'public');
            Actions.getCoursesByUser(this);
            Actions.getSharedCoursesByUser(this, this.user.metaData.uid);
            Actions.getStarredCoursesByUser(this, this.user.metaData.uid);
        }else {
          this.errorMessage = '';
          this.errorMessage = 'You must be logged in to star a course';
        }
      }catch(error){
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }

    openDeleteModal(e: any) {
      e.stopPropagation();
			e.preventDefault();
			// hack to prevent stacking error
			this.style.zIndex = 1;
      this.querySelector('#confirm-delete-modal').open();
    }

		closeDeleteModal(e: any) {
			// hack to prevent stacking error
			this.style.zIndex = 0;
		}

    async deleteCourse(e: any) {
      this.querySelector('#confirm-delete-modal').close();
			// hack to prevent stacking error
			this.style.zIndex = 0;
      try {
        await Actions.deleteCourse(this, this.course);
        this.successMessage = '';
        this.successMessage = 'Course successfully deleted';
      } catch (error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;
        this.user = state.currentUser;
        this.uid = state.currentUser.metaData.uid;
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
