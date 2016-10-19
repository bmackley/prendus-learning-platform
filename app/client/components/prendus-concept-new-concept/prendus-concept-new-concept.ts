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
        title: this.conceptFormName, 
        tags: this.tags
      };
      
      try {
        await Actions.addConcept(this, this.courseId, newConcept, this.courseConcepts.length);
        await Actions.getCourseEditCourseById(this, this.courseId);
        this.domHost.successMessage = 'Concept added successfully';
        Actions.loadEditCourseConcepts(this, this.courseId);
      } catch(error){
        this.domHost.errorMessage = error.message;
      }
      this.conceptFormName = '';
    }
  }
}

Polymer(PrendusConceptNewConcept);
