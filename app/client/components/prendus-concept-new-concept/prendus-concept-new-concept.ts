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
  private conceptHeader: 'Add a Concept to the Course' | 'Edit concept';
  public querySelector: any;
  public errorMessage: string;
  public successMessage: string;
  public uid: string;
  public courseId: string;
  public courseConcepts: Concept[];
  public subtopics: string[];

  beforeRegister(): void {
    this.is = 'prendus-concept-new-concept';
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

    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }

  }

  async addConceptFormDone(e: any): Promise<void> {
    try {
      this.conceptFormName = this.querySelector('#conceptFormName').value;
      if(this.conceptFormName && this.conceptId) {
        await ConceptModel.updateTitle(this.conceptId, this.conceptFormName);
        this.successMessage = '';
        this.successMessage = `${this.conceptFormName} successfully edited.`;
        this.conceptFormName = '';
        this.conceptId = '';
      } else if(this.conceptFormName) {
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
      this.querySelector('#dialog').close();
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.subtopics = state.subtopics;
  }
}

Polymer(PrendusConceptNewConcept);
