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
    public currentPage: string;

    beforeRegister(): void {
        this.is = 'prendus-homepage';
        this.numCoursesLoadOnScroll = 12;
    }

    async ready(): Promise<void> {
        await Actions.getCoursesByVisibility(this, 'public', this.numCoursesLoadOnScroll);
        // For some reason I can't figure out how to loadMoreData
        // and have the public courses display. So I display the
        // courses by visibility, and when the user scrolls down
        // to the bottom, the next courses will load right away.
        // TODO: make this work for master or develop.
        this.baseRef = new Firebase('https://prendus-development.firebaseio.com/courses');
        this.scrollRef = new Firebase.util.Scroll(this.baseRef, 'public');
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
        if(!this.scrollRef) {
          return;
        }
        // If we're on the homepage.
        if(this.currentPage === "") {
          const scrollRefAndCourses: { scrollRef: any, courses: Course[] } = await CourseModel.getNextCourses(this.scrollRef, this.numCoursesLoadOnScroll);
          const courses: Course[] = scrollRefAndCourses.courses;
          this.scrollRef = scrollRefAndCourses.scrollRef;
          // const courses: Course[] = await CourseModel.getNext(this.numCoursesLoadOnScroll);
          // Do this check here so that the firebase util won't query firebase again.
          if(this.publicCourses.length < courses.length || courses.length === this.numCoursesLoadOnScroll) {
              await Actions.reloadPublicCourses(this, courses);
          }
        }
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
      const threshold: any = this.querySelector('#scroll-threshold');
      threshold.clearTriggers();
    }

    mapStateToThis(e: StatechangeEvent): void {
        const state = e.detail.state;
        this.publicCourses = state.publicCourses;
    }
}

Polymer(PrendusHomepage);
