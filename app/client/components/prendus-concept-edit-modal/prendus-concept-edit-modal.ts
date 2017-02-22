import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {CourseConceptData} from '../../node_modules/prendus-services/typings/course-concept-data';
import {StatechangeEvent} from '../../typings/statechange-event';
import {Tag} from '../../node_modules/prendus-services/typings/tag';
import {Concept} from '../../node_modules/prendus-services/typings/concept';

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
	public fire: any;
  beforeRegister() {
    this.is = 'prendus-concept-edit-modal';
    this.properties = {
    };
  }
  mapStateToThis(e: StatechangeEvent) {
    //this needs to be here so the actions will fire (this does not have a context unless the mapStateToThis function is here)
  }
  open() {
    this.querySelector('#dialog').open();
    this.conceptHeader = 'Add a Concept to the Course';
    this.conceptFormName = '';
    this.querySelector('#concept-tags').tags = [];
  }
  onRemove(e: any) {
    this.conceptTagNames = this.conceptTagNames.filter((tagName: string, index) => e.detail.index !== index);
  }
  onAdd(e: any) {
    if(!this.conceptTagNames) {
      this.conceptTagNames = [];
    }
    this.conceptTagNames = [...this.conceptTagNames, e.detail.tag];
  }
  clearValues() {
    this.conceptId = null;
  }
  async edit(conceptId: string) {
    this.conceptHeader = 'Edit concept';
    this.conceptId = conceptId;
    try {
      const conceptAndTagNames: { concept: Concept, tagNames: string[] } = await Actions.getConceptAndTagNamesById(this.conceptId);
      const concept: Concept = conceptAndTagNames.concept;
      const tagNames: string[] = conceptAndTagNames.tagNames;
      this.conceptFormName = concept.title;
      this.conceptTagNames = tagNames ? tagNames : [];
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
    this.querySelector('#dialog').open();
  }
  async editConcept() {
    try {
      await Actions.updateConceptTitle(this.conceptId, this.conceptFormName);
      await Actions.updateConceptTags(this.conceptId, this.conceptTagNames);
			this.fire('finish-edit-concept', { conceptId: this.conceptId });
      this.querySelector('#dialog').close();
      this.successMessage = '';
      this.successMessage = `${this.conceptFormName} successfully edited.`;
      this.querySelector('#concept-tags').tags = [];
      this.conceptFormName = '';
      this.conceptId = '';
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }

  }

	updateConceptIfEnter(e: any): void {
		if(e.keyCode === 13) this.updateConcept(e);
	}

  async updateConcept(e: any) {
    e.preventDefault();
    this.conceptFormName = this.querySelector('#concept-name').value;
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
        await Actions.addConcept(this, this.courseId, newConcept, this.courseConcepts.length, this.conceptTagNames);
        await Actions.loadViewCourseConcepts(this, this.courseId);
        this.successMessage = '';
        this.successMessage = 'Concept added successfully';
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }
  }
}

Polymer(PrendusConceptNewConcept);
