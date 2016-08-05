import {Actions} from '../../redux/actions.ts';

class CourseRouter {
  public is: string;
  public selected: number;
  public courseId: string;
  public properties: any;

  beforeRegister() {
      this.is = 'course-router';
  }
  async ready() {

  }
}
Polymer(CourseRouter);
