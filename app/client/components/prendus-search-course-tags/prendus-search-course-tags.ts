import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

class PrendusSearchCourseTags {
  public is: string;
  public properties: any;
  public resultingCourses: Course[];
  public errorMessage: string;
  public querySelector: any;
  beforeRegister() {
    this.is = 'prendus-search-course-tags';
    this.properties = {
    };
  }

  //looks through course tags in database for matching tags
  async searchTagsInDB(e: any) {
    try {
      const tags: string[] = this.querySelector('#tags').tags;
      await Actions.lookupCourseTags(this, tags);
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  clearTags(e: any) {
    this.querySelector('#tags').tags = [];
  }
  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.resultingCourses = state.resultingCourses;
  }
}

Polymer(PrendusSearchCourseTags);
