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
        await CourseModel.getNext(3);
    }

    viewCourse(e: any): void {
        const courseId: string = e.model.item.courseId;
        window.history.pushState({}, '', `/courses/view/${courseId}`);
        this.fire('location-changed', {}, {node: window});
    }

    async next(e: any): Promise<void> {
      // console.log(this.courseIds);
      // const keyword: string = 'hello';
      // for(let i: number = 0; i < 100; i++) {
      //     this.words = this.words ? [...this.words, `${keyword} ${this.words.length + 1}`] : [`${keyword} ${1}`];
      // }
      const ids: string[] = await CourseModel.getNext(3);
      const courses: Course[] = await CourseModel.resolveCourseIds(ids);
      const newCourses: Course[] = this.publicCourses.concat(courses);
      await Actions.reloadPublicCourses(this, courses);

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

    mapStateToThis(e: StatechangeEvent): void {
        const state = e.detail.state;
        this.publicCourses = state.publicCourses;
    }
}

Polymer(PrendusHomepage);
