import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {CourseConceptData} from '../../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {Tag} from '../../node_modules/prendus-services/interfaces/tag.interface.ts';
class PrendusConceptNewConcept {
  public is: string;
  public properties: any;

  beforeRegister() {
    this.is = 'prendus-concept-new-concept';
    this.properties = {
    }
  }
  open() {
    this.querySelector('#dialog').open();
  }
  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
  }
  tagAdded(e: any) {
    try {

    } catch(error) {
      this.errorMessage = error.message;
    }
  }
  tagRemoved(e: any) {
    try {

    } catch(error) {
      this.errorMessage = error.message;
    }
  }
}

Polymer(PrendusConceptNewConcept);
