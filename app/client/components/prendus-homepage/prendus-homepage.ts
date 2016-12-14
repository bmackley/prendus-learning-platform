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
    public currentCourseId: string;
    async beforeRegister(): Promise<void> {
        this.is = 'prendus-homepage';
        this.baseRef = new Firebase('https://prendus-development.firebaseio.com/courses');
        this.scrollRef = new Firebase.util.Scroll(this.baseRef, 'public');
        this.currentCourseId = 'hello!';
        this.scrollRef.on('child_added', async function(snap: any) {
          try {
            console.log(this);
            console.log(snap.key());
            const course: Course = await CourseModel.getById(snap.key());
            console.log(course);
            this.publicCourses = this.publicCourses ? [...this.publicCourses, course] : [course];
            console.log(this.publicCourses);
            await Actions.reloadPublicCourses(this, this.publicCourses);
          } catch(error) {
            console.log(error.message);
          }


        }.bind(this));
    }

    viewCourse(e: any): void {
        const courseId: string = e.model.item.courseId;
        window.history.pushState({}, '', `/courses/view/${courseId}`);
        this.fire('location-changed', {}, {node: window});
    }

    async next(e: any): Promise<void> {
      console.log(this);
      console.log(this.publicCourses);
      this.scrollRef.scroll.next(2);
    }
    async starCourse(e: any): Promise<void> {
        const courseId: string = e.model.item.courseId;
        await Actions.starCourse(this, courseId);
    }

    mapStateToThis(e: StatechangeEvent): void {
        const state = e.detail.state;
        this.publicCourses = state.publicCourses;
        // console.log(this.publicCourses);
    }
}

Polymer(PrendusHomepage);
