import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class PrendusHomepage {
    public is: string;
    public publicCourses: Course[];
    public errorMessage: string;
    beforeRegister() {
        this.is = 'prendus-homepage';
    }

    async ready() {
        await Actions.getCoursesByVisibility(this, 'public');
    }

    viewCourse(e: any) {
        const courseId = e.model.item.courseId;

        window.history.pushState({}, '', `/courses/view/${courseId}`);
        this.fire('location-changed', {}, {node: window});
    }
    async displayCourse(course: Course) {
      try {//TODO figure out how to embed async in html
        return false;
        if(!course.concepts) {
          return false;
        }
        const concepts: any = course.concepts;
        const conceptIds: string[] = Actions.courseConceptsObjectToStringArray(course);
        // If any concept inside of the course contains a video or a quiz,
        // then we want to display the course to the user
        for(let i = 0; i < conceptIds.length; i++) {
          const hasQuizOrVideo: boolean = await Actions.conceptContainsQuizOrVideo(conceptIds[i]);
          if(hasQuizOrVideo) {
            return true;
          }
        }
        return false;
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error;
      }

    }
    async starCourse(e: any) {
        const courseId = e.model.item.courseId;

        await Actions.starCourse(this, courseId);
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.publicCourses = state.publicCourses;
    }
}

Polymer(PrendusHomepage);
