import {Actions} from '../../redux/actions';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {StatechangeEvent} from '../../typings/statechange-event';
import {UserMetaData} from '../../node_modules/prendus-services/typings/user-meta-data';
import {State} from '../../typings/state';
import {SubjectModel} from '../../node_modules/prendus-services/models/subject-model';
import {DisciplineModel} from '../../node_modules/prendus-services/models/discipline-model';
import {Discipline} from '../../node_modules/prendus-services/typings/discipline';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {Subject} from '../../node_modules/prendus-services/typings/subject';
import {Concept} from '../../node_modules/prendus-services/typings/concept';

export class PrendusLearningStructure {
  public is: string;
  public querySelector: any;
  public disciplines: Discipline[];
  public chosenDiscipline: Discipline;
  public successMessage: string;
  public errorMessage: string;
  public subjects: Subject[];
  public chosenSubject: Subject;
  public concepts: Concept[];
  public chosenConcept: Concept;
  public uid: string;
  //discipline
    // ?id
    // title
    // subjectid[]
    // ?conceptid[]
  //subject
    // ?id
    // title
    // conceptid[]
    // ?disciplineId
  //concept
    // ?id
    // title
    // ?disciplineid
    // ?subjectid

  beforeRegister(): void {
    this.is = 'prendus-learning-structure';
  }

  async ready(): Promise<void> {
    Actions.getAllDisciplines(this);
  }

  /**
   * Called when the user clicks the pencil
   */
  editDiscipline(): void {
    this.querySelector('#edit-discipline-name').value = this.chosenDiscipline.title;
    this.querySelector('#edit-discipline').open();
  }

  /**
   * Called when the user clicks DONE in the edit-discipline-modal
   */
  async editDisciplineDone(): Promise<void> {
    try {
      if(!UtilitiesService.isDefined(this.chosenDiscipline)) {
        console.error('the user is somehow trying to edit a null discipline');
      } else {
        const title: string = this.querySelector('#edit-discipline-name').value;
        const id: string = this.chosenDiscipline.id;
        const newDiscipline: Discipline = {
          ...this.chosenDiscipline,
          title
        };
        await DisciplineModel.createOrUpdate(id, newDiscipline);
        await Actions.getAllDisciplines(this);
        Actions.setChosenDiscipline(this, newDiscipline);

        // This is a hack so that the selected item will be updated.
        const paperListBox = this.getDisciplinePaperListBox();
        paperListBox.selectPrevious();
        paperListBox.selectNext();

        this.successMessage = '';
        this.successMessage = 'Discipline updated.';
      }

    } catch(error) {
      console.error(error.message);
    }
  }

  /**
   * Called when the user clicks the trashcan next to the discipline.
   */
  async deleteDiscipline(): Promise<void> {
    try {
      if(!UtilitiesService.isDefined(this.chosenDiscipline)) {
        this.errorMessage = '';
        this.errorMessage = 'How the heck did you get here?';
      } else {
        await Actions.deleteDiscipline(this.chosenDiscipline);
        await Actions.getAllDisciplines(this);
        Actions.setChosenDiscipline(this, null);

        this.successMessage = '';
        this.successMessage = 'Discipline deleted.';
      }
    } catch(error) {
      console.error(error.message);
    }
  }
  /**
   * Called when the user changes a discipline in the select list of disciplines.
   */
  disciplineChange(e: any): void {
    const discipline: Discipline = e.model.item;
    // The discipine subjects should already be resolved so we gucci
    Actions.setChosenDiscipline(this, discipline);
    Actions.setChosenSubject(this, null);
    Actions.setChosenConcept(this, null);
  }

  /**
   * Called when the user clicks the button ADD DISCIPLINE
   */
  newDiscipline(): void {
    this.querySelector('#new-discipline-name').value = '';
    this.querySelector('#new-discipline').open();
  }

  /**
   * Called when the user clicks done in the new-discipline modal.
   */
  async newDisciplineDone(): Promise<void> {
    try {
      const title: string = this.querySelector('#new-discipline-name').value;
      const id: string = await DisciplineModel.createOrUpdate(null, {
        title
      });
      await Actions.getAllDisciplines(this);
      this.successMessage = '';
      this.successMessage = 'Discipline added';
      const paperListBox = this.getDisciplinePaperListBox();
      paperListBox.select(this.disciplines.length - 1);
      await Actions.setChosenResolvedDiscipline(this, id);
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Since paperListBox is called multiple times, I decided
   * to create a getter function so that if we change the id,
   * you only have to change it in one spot in the TS.
   * I specifically chose not to put a type because there is no
   * paper-listbox type.
   */
  private getDisciplinePaperListBox() {
    const paperListBox = this.querySelector('#discipline-paper-listbox');
    return paperListBox;
  }

  /**
   * Called when the user clicks ADD SUBJECT
   */
  newSubject(): void {
    this.querySelector('#new-subject-name').value = '';
    this.querySelector('#new-subject').open();
  }

  /**
   * Called when the user clicks DONE in the
   * new subject modal.
   */
  async newSubjectDone(): Promise<void> {
    try {
      if(!UtilitiesService.isDefined(this.chosenDiscipline)) {
        console.error('The user is somehow adding a subject when the chosen discipline is not defined....');
      } else {
        const title: string = this.querySelector('#new-subject-name').value;
        const newSubject: Subject = {
          title,
          disciplineId: this.chosenDiscipline.id
        }
        const subjectId: string = await Actions.createSubject(this, this.chosenDiscipline.id, newSubject);
        await Actions.getAllDisciplines(this);
        //This will update the list of subjects
        await Actions.setChosenResolvedDiscipline(this, this.chosenDiscipline.id);
        await Actions.setChosenResolvedSubject(this, subjectId);
        const paperListBox = this.getSubjectPaperListBox();
        paperListBox.select(this.subjects.length - 1);
        this.successMessage = '';
        this.successMessage = 'Subject set.';
      }

    } catch(error) {
      console.error(error.message);
    }


  }

  /**
   * Called when the user clicks DONE in the
   * edit subject modal
   */
  async editSubjectDone(): Promise<void> {
    try {
      if(!UtilitiesService.isDefined(this.chosenSubject)) {
        console.error('somehow the user is trying to edit an undefined subject');
      } else {
        const title: string = this.querySelector('#edit-subject-name').value;
        const newSubject: Subject = {
          ...this.chosenSubject,
          title
        }

        await SubjectModel.createOrUpdate(newSubject.id, newSubject);
        await Actions.setChosenResolvedDiscipline(this, this.chosenDiscipline.id);
        Actions.setChosenResolvedSubject(this, newSubject.id);
        // This is a hack so that the selected item will be updated.
        const paperListBox = this.getSubjectPaperListBox();
        paperListBox.selectPrevious();
        paperListBox.selectNext();

        this.successMessage = '';
        this.successMessage = 'Subject updated';
      }

    } catch(error) {
      console.error(error.message);
    }
  }

  /**
   * Called when the user clicks the pencil
   * right next to a chosen subject.
   */
  editSubject(): void {
    if(!UtilitiesService.isDefined(this.chosenSubject)) {
      console.error('The user is somehow editing a subject when it isn\'t defined..');
    } else {
      this.querySelector('#edit-subject-name').value = this.chosenSubject.title;
      this.querySelector('#edit-subject').open();
    }

  }

  /**
   * Called when the user clicks the trashcan
   * right next to a chosen subject
   */
  async deleteSubject(): Promise<void> {
    try {
      if(!UtilitiesService.isDefined(this.chosenSubject) || !UtilitiesService.isDefined(this.chosenDiscipline)) {
        console.error('the user is somehow deleting a subject they don\'t have access to');
      } else {
        await Actions.deleteSubject(this.chosenSubject);
        // This will update the select list of subjects
        await Actions.setChosenResolvedDiscipline(this, this.chosenDiscipline.id);
        Actions.setChosenSubject(this, null);

        this.successMessage = '';
        this.successMessage = 'Subject deleted';
      }
    } catch(error) {
      console.error(error.message);
    }
  }

  /**
   * Called when the user chooses a subject in the dom.
   */
  subjectChange(e: any): void {
    if(!UtilitiesService.isDefined(this.chosenDiscipline)) {
      console.error('the user is somehow choosing a subject when there is no discipline');
    } else {
      const subject: Subject = e.model.item;
      Actions.setChosenSubject(this, subject);
    }

  }

  private getSubjectPaperListBox() {
    const subjectListBox = this.querySelector('#subject-paper-listbox');
    return subjectListBox;
  }

  /**
   * Called when the user clicks ADD CONCEPT
   */
  newConcept(): void {
    this.querySelector('#new-concept-name').value = '';
    this.querySelector('#new-concept').open();
  }

  /**
   * Called when the user clicks DONE in the
   * new concept modal.
   */
  async newConceptDone(): Promise<void> {
    try {
      if(!UtilitiesService.isDefined(this.chosenDiscipline)
      || !UtilitiesService.isDefined(this.chosenSubject)) {
        console.error('The user is somehow adding a concept when the chosen discipline is not defined....');
      } else {
        const title: string = this.querySelector('#new-concept-name').value;
        const newConcept: Concept = {
          title,
          subjectId: this.chosenSubject.id,
          uid: this.uid //TODO this is temporary!!!!!!!!!!!! Delete this once concepts are fully moved over to lessons!!!!
        };
        const conceptId: string = await Actions.createConcept(this, newConcept);
        await Actions.getAllDisciplines(this);
        //This will update the list of concepts
        await Actions.setChosenResolvedDiscipline(this, this.chosenDiscipline.id);
        await Actions.setChosenResolvedSubject(this, this.chosenSubject.id);
        const paperListBox = this.getConceptPaperListBox();
        paperListBox.select(this.concepts.length - 1);
        this.successMessage = '';
        this.successMessage = 'Concept set.';
      }

    } catch(error) {
      console.error(error.message);
    }
  }


  /**
   * Called when the user clicks DONE in the
   * edit concept modal
   */
  async editConceptDone(): Promise<void> {
    try {
      if(!UtilitiesService.isDefined(this.chosenSubject)) {
        console.error('somehow the user is trying to edit an undefined concept');
      } else {
      }

    } catch(error) {
      console.error(error.message);
    }
  }

  /**
   * Called when the user clicks the pencil
   * right next to a chosen concept.
   */
  editConcept(): void {
    if(!UtilitiesService.isDefined(this.chosenSubject)) {
      console.error('The user is somehow editing a concept when it isn\'t defined..');
    } else {
      this.querySelector('#edit-concept-name').value = this.chosenSubject.title;
      this.querySelector('#edit-concept').open();
    }
  }

  /**
   * Called when the user clicks the trashcan
   * right next to a chosen concept
   */
  async deleteConcept(): Promise<void> {
    try {
      if(!UtilitiesService.isDefined(this.chosenSubject) || !UtilitiesService.isDefined(this.chosenDiscipline)) {
        console.error('the user is somehow deleting a concept they don\'t have access to');
      } else {
        await Actions.deleteConcept(this.chosenConcept);
        // This will update the select list of concepts
        await Actions.setChosenResolvedDiscipline(this, this.chosenDiscipline.id);
        await Actions.setChosenResolvedSubject(this, this.chosenSubject.id);

        this.successMessage = '';
        this.successMessage = 'Concept deleted';
      }
    } catch(error) {
      console.error(error.message);
    }
  }

  /**
   * Called when the user chooses a concept in the dom.
   */
  conceptChange(e: any): void {
    if(!UtilitiesService.isDefined(this.chosenDiscipline)) {
      console.error('the user is somehow choosing a subject when there is no discipline');
    } else {
      const concept: Concept = e.model.item;
      Actions.setChosenConcept(this, concept);
    }
  }

  private getConceptPaperListBox() {
    const conceptListBox = this.querySelector('#concept-paper-listbox');
    return conceptListBox;
  }

  mapStateToThis(e: StatechangeEvent): void {
    const state: State = e.detail.state;
    this.disciplines = state.disciplines;
    this.chosenDiscipline = state.chosenDiscipline;
    if(!UtilitiesService.isDefined(this.chosenDiscipline)) {
      const disciplinePaperListBox = this.getDisciplinePaperListBox();
      disciplinePaperListBox.select(-1);
    }
    this.subjects = UtilitiesService.isDefined(state.chosenDiscipline) && UtilitiesService.isDefined(state.chosenDiscipline.resolvedSubjects)
                  ? state.chosenDiscipline.resolvedSubjects : null;
    this.chosenSubject = UtilitiesService.isDefined(state.chosenDiscipline) && UtilitiesService.isDefined(state.chosenSubject)
                       ? state.chosenSubject : null;
    if(UtilitiesService.isDefined(this.chosenDiscipline) && !UtilitiesService.isDefined(this.chosenSubject) && UtilitiesService.isDefined(this.getSubjectPaperListBox())) {
      // if discipline is defined and subject is not, then remove selection.
      // this usually happens after a subject has been deleted
      const subjectPaperListBox = this.getSubjectPaperListBox();
      subjectPaperListBox.select(-1);
    }

    this.concepts = UtilitiesService.isDefined(state.chosenDiscipline)
                 && UtilitiesService.isDefined(state.chosenSubject)
                 && UtilitiesService.isDefined(state.chosenSubject.resolvedConcepts)
                  ? state.chosenSubject.resolvedConcepts : null;
    this.chosenConcept = UtilitiesService.isDefined(state.chosenDiscipline)
                      && UtilitiesService.isDefined(state.chosenSubject)
                      && UtilitiesService.isDefined(state.chosenConcept)
                       ? state.chosenConcept : null;
   if(UtilitiesService.isDefined(this.chosenDiscipline)
  && !UtilitiesService.isDefined(this.chosenSubject)
  && !UtilitiesService.isDefined(this.chosenConcept)
  && UtilitiesService.isDefined(this.getConceptPaperListBox())) {
     // if discipline,subject is defined and concept is not, then remove selection.
     // this usually happens after a concept has been deleted
     const conceptPaperListBox = this.getConceptPaperListBox();
     conceptPaperListBox.select(-1);
   }
   this.uid = UtilitiesService.isDefined(state.currentUser)
          &&  UtilitiesService.isDefined(state.currentUser.metaData)
          ?   state.currentUser.metaData.uid : null;
  }


}

Polymer(PrendusLearningStructure);
