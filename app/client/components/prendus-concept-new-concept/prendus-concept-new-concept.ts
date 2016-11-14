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
  private conceptId: string;
  private conceptHeader: string;
  public querySelector: any;
  public errorMessage: string;
  public successMessage: string;
  public uid: string;
  public courseId: string;
  public courseConcepts: Concept[];
  beforeRegister() {
    this.is = 'prendus-concept-new-concept';
    this.properties = {
    };
  }
  open() {
    this.querySelector('#dialog').open();
    this.conceptHeader = 'Add a Concept to the Course';
    this.conceptFormName = '';
    this.querySelector('#tags').tags = [];
  }

  clearValues() {
    this.conceptId = null;
  }

  async edit(conceptId: string) {
    this.conceptHeader = 'Edit concept';
    this.conceptId = conceptId;
    try {
      const conceptAndTagNames: any = await Actions.getConceptAndTagNamesById(this.conceptId);
      const concept: Concept = conceptAndTagNames.concept;
      const tagNames: string[] = conceptAndTagNames.tagNames;
      this.conceptFormName = concept.title;
      this.querySelector('#tags').tags = tagNames ? tagNames : [];
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
    this.querySelector('#dialog').open();
  }
  async editConcept() {
    try {
      const tags: string[] = this.querySelector('#tags').tags;
      await Actions.updateConceptTitle(this.conceptId, this.conceptFormName);
      await Actions.updateConceptTags(this.conceptId, tags);
      this.querySelector('#dialog').close();
      this.successMessage = '';
      this.successMessage = `${this.conceptFormName} successfully edited.`;
      this.querySelector('#tags').tags = [];
      this.conceptFormName = '';
      this.conceptId = '';
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }

  }
  async addConceptFormDone(e: any) {
    e.preventDefault();
    this.conceptFormName = this.querySelector('#conceptFormName').value;
    if(this.conceptFormName && this.conceptId) {
      this.editConcept();
      return;
    }
    if(this.conceptFormName) {
      this.querySelector('#dialog').close();
      const newConcept: any = {
        uid: this.uid,
        title: this.conceptFormName
      };
      try {
        const tags: string[] = this.querySelector('#tags').tags;
        await Actions.addConcept(this, this.courseId, newConcept, this.courseConcepts.length, tags);
        await Actions.getCourseEditCourseById(this, this.courseId);
        this.successMessage = '';
        this.successMessage = 'Concept added successfully';
        Actions.loadEditCourseConcepts(this, this.courseId);
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }
  }
}

Polymer(PrendusConceptNewConcept);
