import {Actions} from '../../redux/actions.ts';

class CourseRouter {
  public is: string;
  public selected: number;
  public courseId: string;
  public properties: any;

  beforeRegister() {
      this.is = 'prendus-course-router';
  }
  async ready() {
    console.log('course router')
  }
}
Polymer(CourseRouter);
