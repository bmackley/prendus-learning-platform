import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {CourseConceptData} from '../../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {Tag} from '../../node_modules/prendus-services/interfaces/tag.interface.ts';
class PrendusConceptNewConcept {
  public is: string;
  public properties: any;
  public conceptFormName: string;
  public tags: string[];
  beforeRegister() {
    this.is = 'prendus-concept-new-concept';
    this.properties = {
    }
  }
  open() {
    this.querySelector('#dialog').open();
  }
  async addConceptFormDone(e: any) {
    e.preventDefault();
    if(this.conceptFormName) {
      this.querySelector('#dialog').close();
      const newConcept = {
        uid: this.uid,
        title: this.conceptFormName
      };
      //this.domHost calls parent
      try {
        await Actions.addConcept(this.domHost, this.courseId, newConcept, this.courseConcepts.length, this.tags);
        await Actions.getCourseEditCourseById(this.domHost, this.courseId);
        this.domHost.successMessage = 'Concept added successfully';
        Actions.loadEditCourseConcepts(this.domHost, this.courseId);
      } catch(error) {
        this.domHost.errorMessage = error.message;
      }
      this.tags = [];
      this.conceptFormName = '';
    }
  }
}

Polymer(PrendusConceptNewConcept);
