import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {CourseConceptData} from '../../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {Tag} from '../../node_modules/prendus-services/interfaces/tag.interface.ts';
import {Concept} from '../../node_modules/prendus-services/interfaces/concept.interface.ts';
class PrendusConceptNewConcept {
  public is: string;
  public properties: any;
  public conceptFormName: string;
  public tags: string[];
  private conceptId: string;
  private conceptHeader: string;
  beforeRegister() {
    this.is = 'prendus-concept-new-concept';
    this.properties = {
    }
  }
  open() {
    this.querySelector('#dialog').open();
    this.conceptHeader = 'Add a Concept to the Course'; 
    this.conceptFormName = '';
    this.tags = [];
  }
  clearValues() {
    this.conceptId = null;
  }
  async edit(conceptId: string) {
    this.conceptHeader = 'Edit concept';
    this.conceptId = conceptId;
    try {
      const obj: any = await Actions.getConceptAndTagNamesById(this.conceptId);
      const concept: Concept = obj.concept;
      const tagNames: string[] = obj.tagNames;
      this.conceptFormName = concept.title;
      this.tags = tagNames ? tagNames : []; 
    } catch(error) {
      this.domHost.errorMessage = '';
      this.domHost.errorMessage = error.message;
    }
    this.querySelector('#dialog').open();
  }
  async editConcept() {
    try {
      await Actions.updateConceptTitle(this.conceptId, this.conceptFormName);
      await Actions.updateConceptTags(this.conceptId, this.tags);
      this.querySelector('#dialog').close();
      
      this.domHost.successMessage = '';
      this.domHost.successMessage = 'Editing!!!';
      this.tags = [];
      this.conceptFormName = '';
      
    } catch(error) {
      this.domHost.errorMessage = '';
      this.domHost.errorMessage = error.message;
    }
    
  }
  async addConceptFormDone(e: any) {
    e.preventDefault();
    if(this.conceptId) {
      this.editConcept();
      return;
    }
    if(this.conceptFormName) {
      this.querySelector('#dialog').close();
      const newConcept: any = {
        uid: this.uid,
        title: this.conceptFormName
      };
      //this.domHost calls parent
      try {
        await Actions.addConcept(this.domHost, this.courseId, newConcept, this.courseConcepts.length, this.tags);
        await Actions.getCourseEditCourseById(this.domHost, this.courseId);
        this.domHost.successMessage = '';
        this.domHost.successMessage = 'Concept added successfully';
        Actions.loadEditCourseConcepts(this.domHost, this.courseId);
      } catch(error) {
        this.domHost.errorMessage = '';
        this.domHost.errorMessage = error.message;
      }
    }
  }
}

Polymer(PrendusConceptNewConcept);
