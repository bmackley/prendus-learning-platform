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
      const amt: number = 3;
      const ids: string[] = await CourseModel.getNext(amt);
      const courseIds: string[] = this.publicCourses.map((course) => course.id);
      const renderIds: string[] = ids.length === amt ? ids : ids.filter((id) => {
        if(courseIds.indexOf(id) === -1) {
          return id;
        }
      });
      const courses: Course[] = await CourseModel.resolveCourseIds(renderIds);
      const newCourses: Course[] = this.publicCourses.concat(courses);
      await Actions.reloadPublicCourses(this, newCourses);

    }
    async starCourse(e: any): Promise<void> {
        const courseId: string = e.model.item.courseId;
        await Actions.starCourse(this, courseId);
    }

    isLast(word: string, words: string[]): boolean {
      const value: boolean = word === words[words.length - 1];
      if(value) {
        console.log(word);
      }
      return value;
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
