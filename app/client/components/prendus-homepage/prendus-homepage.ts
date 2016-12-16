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
    public amt: number;
    beforeRegister(): void {
        this.is = 'prendus-homepage';
        this.amt = 9;
    }
    
    async ready(): Promise<void> {
        await Actions.getCoursesByVisibility(this, 'public', this.amt);
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
        const amt: number = 9;
        const courses: Course[] = await CourseModel.getNext(amt);
        await Actions.reloadPublicCourses(this, courses);
        let threshold: any = this.querySelector('#scrollThreshold');
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
