import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {CourseConceptData} from '../../node_modules/prendus-services/typings/course-concept-data';
import {StatechangeEvent} from '../../typings/statechange-event';
import {Concept} from '../../node_modules/prendus-services/typings/concept';
import {State} from '../../typings/state';
import {ConceptModel} from '../../node_modules/prendus-services/models/concept-model';

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
  public conceptTagNames: string[];
  public subtopics: string[];

  beforeRegister(): void {
    this.is = 'prendus-concept-new-concept';
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.subtopics = state.subtopics;
  }

  async open(): Promise<void> {
    this.querySelector('#dialog').open();
    this.conceptHeader = 'Add a Concept to the Course';
    this.conceptFormName = '';
    await Actions.initSubTopics(this, this.courseId);
  }

  clearValues(): void {
    this.conceptId = null;
  }

  async edit(conceptId: string): Promise<void> {
    this.conceptHeader = 'Edit concept';
    this.conceptId = conceptId;
    try {
      const concept: Concept = await ConceptModel.getById(this.conceptId);
      this.conceptFormName = concept.title;
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
    this.querySelector('#dialog').open();
  }

  async editConcept(): Promise<void> {
    try {
      await ConceptModel.updateTitle(this.conceptId, this.conceptFormName);
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

  async addConceptFormDone(e: any): Promise<void> {
    try {
      this.conceptFormName = this.querySelector('#conceptFormName').value;
      if(this.conceptFormName && this.conceptId) {
        this.editConcept();
        return;
      }

      if(this.conceptFormName) {
        this.querySelector('#dialog').close();
        const newConcept: Concept = {
          uid: this.uid,
          title: this.conceptFormName
        };

        await Actions.addConcept(this, this.courseId, newConcept, this.courseConcepts.length);
        await Actions.getCourseViewCourseById(this, this.courseId);
        await Actions.loadViewCourseConcepts(this, this.courseId);
        this.successMessage = '';
        this.successMessage = 'Concept added successfully';
      }
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }
}

Polymer(PrendusConceptNewConcept);
