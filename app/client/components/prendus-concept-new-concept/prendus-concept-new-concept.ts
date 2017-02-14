import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {CourseConceptData} from '../../node_modules/prendus-services/typings/course-concept-data';
import {StatechangeEvent} from '../../typings/statechange-event';
import {Concept} from '../../node_modules/prendus-services/typings/concept';
import {State} from '../../typings/state';
import {ConceptModel} from '../../node_modules/prendus-services/models/concept-model';

export class PrendusConceptNewConcept {
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
  public chosenSubTopicIndex: number;
  public subtopic: string;

  beforeRegister(): void {
    this.is = 'prendus-concept-new-concept';
  }
  /**
   * This function is called externally
   */
  async open(): Promise<void> {
    try {
      this.conceptHeader = 'Add a Concept to the Course';
      this.conceptFormName = '';
      await Actions.initSubTopics(this, this.courseId);
      await Actions.getConceptById(this, this.conceptId);
      this.querySelector('#dialog').open();
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  /**
   * This function is called externally
   */
  async edit(conceptId: string): Promise<void> {
    try {
      this.conceptHeader = 'Edit concept';
      this.conceptId = conceptId;
      await Actions.initSubTopics(this, this.courseId);
      await Actions.getConceptById(this, this.conceptId);
      this.querySelector('#dialog').open();
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  /**
   * Called when the user presses the cancel button on the dialog.
   */
  clearValues(): void {
    this.conceptId = null;
    this.subtopic = null;
    this.chosenSubTopicIndex = -1;
  }

  /**
   * Called when a user chooses a subtopic
   */
  setSubtopic(e: any): void {
    const subtopic: string = e.model.item;
    this.subtopic = subtopic;
  }

  async addConceptFormDone(e: any): Promise<void> {
    try {
      this.querySelector('#dialog').close();
      this.conceptFormName = this.querySelector('#conceptFormName').value;
      if(this.conceptFormName && this.conceptId) {
        await ConceptModel.updateTitle(this.conceptId, this.conceptFormName);
        await ConceptModel.updateSubtopic(this.conceptId, this.subtopic || '');
        this.successMessage = '';
        this.successMessage = `${this.conceptFormName} successfully edited.`;
      } else if(this.conceptFormName) {
        const newConcept: Concept = {
          uid: this.uid,
          title: this.conceptFormName,
          subtopic: this.subtopic
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

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.subtopics = state.subtopics;
    if(state.currentConcept && this.subtopics) {
      this.conceptFormName = state.currentConcept.title;
      this.chosenSubTopicIndex = this.subtopics.indexOf(state.currentConcept.subtopic);
      console.log('this.conceptFormName ', this.conceptFormName);
      console.log('this.chosenSubTopicIndex ', this.chosenSubTopicIndex);
    } else {
      this.chosenSubTopicIndex = -1;
    }

  }
}

Polymer(PrendusConceptNewConcept);
