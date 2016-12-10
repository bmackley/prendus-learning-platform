import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface';

class PrendusSearchCourseTags {
  public is: string;
  public properties: any;
  public resultingCourses: Course[];
  public errorMessage: string;
  public querySelector: any;
  public courseTagNames: string[];

  beforeRegister() {
    this.is = 'prendus-search-course-tags';
    this.properties = {
    };
  }

  //looks through course tags in database for matching tags
  async searchTagsInDB(e: any) {
    try {
      const tag: string = this.querySelector('#tag').value;
      await Actions.lookupCourseTags(this, tag);
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.resultingCourses = state.resultingCourses;
  }

  clearTag(e: any) {
    this.querySelector('#tag').value = '';
  }

  checkForEnter(e: KeyboardEvent) {
    const enterKeyCode: number = 13;
    if (e.keyCode === enterKeyCode) {
      // enter pressed
      this.searchTagsInDB(e);
    }
  }
}

Polymer(PrendusSearchCourseTags);
