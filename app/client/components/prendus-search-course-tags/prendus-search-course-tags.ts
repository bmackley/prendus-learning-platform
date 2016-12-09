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
      const tags: string[] = this.querySelector('#tags').tags;
      await Actions.lookupCourseTags(this, tags);
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }
  onRemove(e: any) {
    this.courseTagNames = this.courseTagNames.filter((tagName: string, index) => e.detail.index !== index);
  }
  onAdd(e: any) {
    if(!this.courseTagNames) {
      this.courseTagNames = [];
    }
    this.courseTagNames = [...this.courseTagNames, e.detail.tag];
  }
  clearTags(e: any) {
    this.courseTagNames = [];
  }
  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.resultingCourses = state.resultingCourses;
  }
}

Polymer(PrendusSearchCourseTags);
