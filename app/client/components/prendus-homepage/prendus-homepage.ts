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

    async beforeRegister(): Promise<void> {
        this.is = 'prendus-homepage';
    }

    viewCourse(e: any): void {
        const courseId: string = e.model.item.courseId;
        window.history.pushState({}, '', `/courses/view/${courseId}`);
        this.fire('location-changed', {}, {node: window});
    }

    async next(e: any): Promise<void> {
      // let threshold: any = this.querySelector('#scrollThreshold');
      // console.log(threshold.lowerTriggered);
      // const word: string = 'hello';
      // for(let i: number = 0; i < 100; i++) {
      //   this.words = this.words ? [...this.words, `${word} ${this.words.length + 1}`] : [`${word} 1`];
      // }
      const amt: number = 6;
      const courses: Course[] = await CourseModel.getNext(amt);
      await Actions.reloadPublicCourses(this, courses);


    }
    async starCourse(e: any): Promise<void> {
        const courseId: string = e.model.item.courseId;
        await Actions.starCourse(this, courseId);
    }

    loadMoreData(e: any): void {
      console.log('loadMoreData');
      let threshold: any = this.querySelector('#scrollThreshold');
      this.next(new Event("hello!"));
      threshold.clearTriggers();

        // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        //   console.log('bottom');
        // }
    }

    mapStateToThis(e: StatechangeEvent): void {
        const state = e.detail.state;
        this.publicCourses = state.publicCourses;
    }
}

Polymer(PrendusHomepage);
