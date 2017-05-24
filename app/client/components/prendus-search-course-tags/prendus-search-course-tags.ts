import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {StatechangeEvent} from '../../typings/statechange-event';

class PrendusSearchCourseTags extends Polymer.Element {
  public resultingCourses: Course[];
  public querySelector: any;
  public courseTagNames: string[];

  static get is() { return 'prendus-search-course-tags'; }

  //looks through course tags in database for matching tags
  async searchTagsInDB(e: any) {
    try {
      const tag: string = this.querySelector('#tag').value;
      await Actions.lookUpCourseTags(this, tag);
    } catch(error) {
			Actions.showNotification(this, 'error', 'Error searching for tags.');
			console.error(error);
    }
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

  mapStateToThis(e: StatechangeEvent) {
      const state = e.detail.state;
      this.resultingCourses = state.resultingCourses;
  }
}

window.customElements.define(PrendusSearchCourseTags.is, PrendusSearchCourseTags);
