import {Actions} from '../../redux/actions';

class PrendusCourseRouter {
  public is: string;
  public selected: number;
  public courseId: string;
  public properties: any;

  beforeRegister() {
      this.is = 'prendus-course-router';
  }
  async ready() {
  }
}

Polymer(PrendusCourseRouter);
