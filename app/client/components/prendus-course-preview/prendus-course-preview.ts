import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {User} from '../../node_modules/prendus-services/interfaces/user.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

class PrendusCoursePreview {
    public is: string;
    public properties: any;
    public course: Course;
    public starIcon: string;
    public user: User;
    public numStars: number;
    public uid: string;
    public hasEditAccess: boolean;
    public errorMessage: string;

    beforeRegister() {
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
        const user = await FirebaseService.getLoggedInUser();
        this.numStars = Object.keys(this.course.userStars || {}).length;
        if(user){
          this.uid = user.uid
          if(course.uid === this.uid){
            this.hasEditAccess = true;
          }else if(course.collaborators){
            this.hasEditAccess = this.checkCollaboratorStatus(course.collaborators, this.uid);
          }
        }else{
          this.starIcon = `icons:star-border`;
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
      try{
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
              await Actions.checkUserAuth.execute(this);
              Actions.getCoursesByVisibility(this, 'public');
              Actions.getCoursesByUser.execute(this);
              Actions.getStarredCoursesByUser(this, this.user.metaData.uid);
              Actions.getSharedCoursesByUser(this, this.user.metaData.uid);
        }else {
          this.errorMessage = '';
          this.errorMessage = 'You must be logged in to star a course';
        }
      }catch(error){
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }

    editCourse(e: any) {
        const location = `/courses/edit/${this.course.id}`
        window.history.pushState({}, '', location);
        this.fire('location-changed', {}, {node: window});
    }

    viewCourse(e: any) {
        const location = `/courses/view/${this.course.id}`
        window.history.pushState({}, '', location);
        this.fire('location-changed', {}, {node: window});
    }
    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.user = state.currentUser;
        this.uid = state.currentUser.metaData.uid;
        this.numStars = Object.keys(this.course.userStars || {}).length;
        if (this.user && this.course) {
            if (this.user.starredCourses) {
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
        else {
            this.starIcon = `icons:star-border`;
        }
    }
}

Polymer(PrendusCoursePreview);
