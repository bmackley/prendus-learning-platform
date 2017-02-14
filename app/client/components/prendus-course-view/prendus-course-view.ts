import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {Concept} from '../../node_modules/prendus-services/typings/concept';
import {CourseConceptData} from '../../node_modules/prendus-services/typings/course-concept-data';
import {StatechangeEvent} from '../../typings/statechange-event';
import {Tag} from '../../node_modules/prendus-services/typings/tag';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {CourseModel} from '../../node_modules/prendus-services/models/course-model';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {PrendusConceptNewConcept} from '../prendus-concept-new-concept/prendus-concept-new-concept';
import {ConceptModel} from '../../node_modules/prendus-services/models/concept-model';

export class PrendusCourseView {
  public is: string;
  public courseConcepts: CourseConceptData[];
  public currentCourse: Course;
  public courseTagNames: string[];
  public courseTags: Tag[];
  public courseId: string;
  public properties: any;
  public observers: string[];
  public username: string;
  public uid: string;
  public successMessage: string;
  public errorMessage: string;
  public querySelector: any;
  public editingTitle: boolean;
  public editingDescription: boolean;
  public listeners: any;
  public data: any;
  public subjects: string[];
  public selectedSubjectIndex: number;

  beforeRegister() {
    this.is = 'prendus-course-view';
    this.properties = {
      title: {
        type: String,
        value: 'Course Name'
      },
      route: {
        type: Object,
      },
      data: {
        type: Object,
      },
      hasEditAccess: {
        type: Boolean,
        computed: 'computeHasEditAccess(uid, currentCourse.collaborators)'
      },
      editingTitle: {
        type: Boolean,
        value: false
      },
      editingDescription: {
        type: Boolean,
        value: false
      }
    };
    this.observers = [
      'viewCourse(route)',
      'viewCourse(data)'
    ];
    this.listeners = {
      'edit-concept': 'openEditConceptDialog'
    };

  }

  mapStateToThis(e: StatechangeEvent): void {
    const state = e.detail.state;
    this.courseId = state.courseViewCurrentCourse.id;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
    this.currentCourse = state.courseViewCurrentCourse;
    this.courseTagNames = state.courseTagNames;
    this.courseConcepts = state.viewCourseConcepts[this.courseId];
    this.subjects = state.subjects;
    this.selectedSubjectIndex = state.selectedSubjectIndex;
  }

  openEditConceptDialog(e: any): void {
    const conceptId: string = e.detail.conceptId;
    const editConceptDialog: PrendusConceptNewConcept = this.querySelector('#addConceptDialog');
    editConceptDialog.edit(conceptId);
  }

  addConcept(e: any): void {
    const newConceptDialog: PrendusConceptNewConcept = this.querySelector('#addConceptDialog');
    newConceptDialog.open();
  }

  openCollaboratorsModal(e: any): void {
    this.querySelector('#collaborators-modal').open();
  }

  computeHasEditAccess(uid: string, collaborators: any): boolean {
    return uid in collaborators;
  }

  toggleEditTitle(e: any): void {
    this.editingTitle = !this.editingTitle;
  }

  getTitleButtonText(editingTitle: string): string {
    return editingTitle ? "Done" : "Edit Title";
  }

  toggleEditDescription(e: any): void {
    this.editingDescription = !this.editingDescription;
  }

  getDescriptionButtonText(editingDescription: string): string {
    return editingDescription ? "Done" : "Edit Description";
  }

  displayDate(date: string): Date {
    // Set due date at the current date if the course has no due date yet.
    const returnDate: Date =  date ? new Date(date) : new Date();
    return returnDate;
  }

  async subjectChange(e: any): Promise<void> {
    try {
      const subject: string = e.model.item;
      if(this.selectedSubjectIndex === -1 || (this.selectedSubjectIndex !== -1 && this.subjects[this.selectedSubjectIndex] !== subject)) {
        await CourseModel.setSubject(subject, this.courseId);
        const conceptIds: string[] = await CourseModel.getConceptIds(this.courseId);
        await UtilitiesService.asyncForEach(conceptIds, async (conceptId: string) => {
          await ConceptModel.deleteSubtopic(conceptId);
        });
        this.successMessage = '';
        this.successMessage = `Subject updated to ${subject}`;
      }

    } catch(error) {
      console.error(error);
    }
  }

  async dueDateChanged(): Promise<void> {
    try {
      const newDate: Date = this.querySelector('#due-date').date;
      const UTCDate: number = UtilitiesService.dateToUTCNumber(newDate);
      const currentDate: number = this.currentCourse.dueDate;
      // paper-date-picker does not have an event listener for date change. So every
      // time a user clicks anywhere on the calendar, this function is called. To avoid
      // a firebase action, we compare the currentDate in firebase to the new UTCDate.
      if(currentDate !== UTCDate) {
        // Date has changed
        await Actions.updateCourseField(this, this.courseId, 'dueDate', UTCDate);
        await Actions.updateQuizDueDates(this.courseId);
        this.successMessage = '';
        this.successMessage = 'Last day of course has been updated';
      }

    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }

  }

  // For showTagsTitle and showTagsView you have to pass in the course
  // object instead of course.tags.length, if course.tags is null or
  // undefined, then you are trying to call length on a null object.
  // Also, in the HTML it will not execute these functions if one of
  // the parameters is null.
  showTagsTitle(course: Course, hasEditAccess: boolean): boolean {
    // Since this is an or, it will try to return the course.tags
    // object instead of a boolean that is checking if it's undefined.
    return course.tags !== undefined || hasEditAccess;
  }

  showTagsView(course: Course, hasEditAccess: boolean): boolean {
    return course.tags && !hasEditAccess;
  }

  toggle(e: any): void {
    const collapseTarget = (e.target.id);
    this.querySelector('#Concept' + collapseTarget).toggle();
  }

  async viewCourse(): Promise<void> {
    try {
      if (this.data.courseId) {
          Actions.showMainSpinner(this);
          await Actions.getCourseViewCourseById(this, this.data.courseId);
          await Actions.loadViewCourseConcepts(this, this.data.courseId);
          await Actions.initSubjects(this, this.courseId);
          Actions.hideMainSpinner(this);
      }
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }

  }

  getLTILinks(): void {
    console.log('LTI Links3')

  }

  async sortableEnded(e: any): Promise<void> { //This isn't the most elegant solution. I'm open to better ways of doing things.
    if(typeof e.newIndex !== 'undefined') {
      let updateConceptPositionArray: CourseConceptData[] = [];
      for(let i:number = 0, len: number = this.courseConcepts.length; i< len; i++) {
        updateConceptPositionArray.push(this.courseConcepts[i]);
        if(this.courseConcepts[i].position != i) {
          updateConceptPositionArray[i].position = i;
        }
      }
      try {
        await Actions.orderConcepts(this, this.courseId, updateConceptPositionArray);
        this.successMessage = '';
        this.successMessage = 'Concept ordered successfully';
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }
  }

  async attributeChanged(e: any): Promise<void> {
    try {
      if(typeof e.target !== 'undefined' ) {
        const value = e.target.value;
        const attribute = e.target.name;
        await Actions.updateCourseField(this, this.courseId, attribute, value);
        await Actions.getCourseViewCourseById(this, this.courseId);
        this.successMessage = '';
        this.successMessage = `${attribute} has been updated`;
      }
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }
}

Polymer(PrendusCourseView);
