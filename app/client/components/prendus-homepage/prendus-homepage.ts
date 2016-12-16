import {Course} from '../../node_modules/prendus-services/typings/course';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {CourseModel} from '../../node_modules/prendus-services/models/course-model';
class PrendusHomepage {
    public is: string;
    public publicCourses: Course[];
    public errorMessage: string;
    public successMessage: string;
    public fire: any;
    public scrollRef: any;
    public baseRef: any;
    public properties: any;
    public observers: string[];
    public courseIds: string[];
    public words: string[];
    public querySelector: any;
    public numCoursesLoadOnScroll: number;
    beforeRegister(): void {
        this.is = 'prendus-homepage';
        this.numCoursesLoadOnScroll = 9;
    }

    async ready(): Promise<void> {
        await Actions.getCoursesByVisibility(this, 'public', this.numCoursesLoadOnScroll);
        // For some reason I can't figure out how to loadMoreData
        // and have the public courses display. So I display the
        // courses by visibility, and when the user scrolls down
        // to the bottom, the next courses will load right away.
        await this.loadMoreData(null);
    }

    viewCourse(e: any): void {
        const courseId: string = e.model.item.courseId;
        window.history.pushState({}, '', `/courses/view/${courseId}`);
        this.fire('location-changed', {}, {node: window});
    }

    async starCourse(e: any): Promise<void> {
        const courseId: string = e.model.item.courseId;
        await Actions.starCourse(this, courseId);
    }

    async loadMoreData(e: any): Promise<void> {
      try {
        //TODO this always gets loaded no matter the page you're on.
        const courses: Course[] = await CourseModel.getNext(this.numCoursesLoadOnScroll);
        await Actions.reloadPublicCourses(this, courses);
        let threshold: any = this.querySelector('#scroll-threshold');
        threshold.clearTriggers();
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }


    }

    mapStateToThis(e: StatechangeEvent): void {
        const state = e.detail.state;
        this.publicCourses = state.publicCourses;
    }
}

Polymer(PrendusHomepage);
