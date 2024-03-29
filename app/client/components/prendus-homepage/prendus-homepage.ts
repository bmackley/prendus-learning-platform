import {Course} from '../../node_modules/prendus-services/typings/course';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';
import {CourseModel} from '../../node_modules/prendus-services/models/course-model';

// squish TypeScript errors
declare let Firebase: any;
declare let window: any;

class PrendusHomepage {
    public is: string;
    public publicCourses: Course[];
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
    public loading: boolean;
    public $: any;

    beforeRegister(): void {
        this.is = 'prendus-homepage';
        this.numCoursesLoadOnScroll = 36;
    }

    async ready(): Promise<void> {
      try {
        this.loading = true;
        await Actions.getCoursesByVisibility(this, 'public', this.numCoursesLoadOnScroll);
        const courseList: any = this.querySelector('#course-list');
        courseList.fire('resize');
        // For some reason I can't figure out how to loadMoreData
        // and have the public courses display. So I display the
        // courses by visibility, and when the user scrolls down
        // to the bottom, the next courses will load right away.
        this.baseRef = new Firebase(`https://prendus-${window['PRENDUS_ENV']}.firebaseio.com/courses`);
        this.scrollRef = new Firebase.util.Scroll(this.baseRef, 'public');
        await this.loadMoreData(null);
      } catch(error) {
				Actions.showNotification(this, 'error', 'Error loading courses');
				console.error(error);
      }

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
        if(this.currentPage === '') {
          const scrollRefAndCourses: { scrollRef: any, courses: Course[] } = await CourseModel.getNextCourses(this.scrollRef, this.numCoursesLoadOnScroll);
          const courses: Course[] = scrollRefAndCourses.courses;
          this.scrollRef = scrollRefAndCourses.scrollRef;
          // Do this check here so that the firebase util won't query firebase again.
          if(this.publicCourses.length < courses.length || courses.length === this.numCoursesLoadOnScroll) {
              await Actions.reloadPublicCourses(this, courses);
              const courseList: any = this.querySelector('#course-list');
              courseList.fire('resize');
              this.loading = true;
          } else {
            this.loading = false;
          }
        }
      } catch(error) {
				Actions.showNotification(this, 'error', 'Error loading courses');
				console.error(error);
      }
      this.$.threshold.clearTriggers();
    }

    mapStateToThis(e: StatechangeEvent): void {
        const state = e.detail.state;
        this.publicCourses = state.publicCourses;
    }
}

Polymer(PrendusHomepage);
