import {Actions} from '../../redux/actions';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {Concept} from '../../node_modules/prendus-services/typings/concept';
import {CourseConceptData} from '../../node_modules/prendus-services/typings/course-concept-data';
import {StatechangeEvent} from '../../typings/statechange-event';
import {Tag} from '../../node_modules/prendus-services/typings/tag';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {CourseModel} from '../../node_modules/prendus-services/models/course-model';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

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

  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.courseId = state.courseViewCurrentCourse.id;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
    this.currentCourse = state.courseViewCurrentCourse;
    this.courseTags = state.courseViewCurrentCourse.tags;
    this.courseTagNames = state.courseTagNames;
    this.courseConcepts = state.viewCourseConcepts[this.courseId];
  }
  openEditConceptDialog(e: any) {
    const conceptId: string = e.detail.conceptId;
    this.querySelector('#addConceptDialog').edit(conceptId);
  }
  openCollaboratorsModal(e: any) {
    this.querySelector('#collaborators-modal').open();
  }

  computeHasEditAccess(uid: string, collaborators: any) {
    return uid in collaborators;
  }

  toggleEditTitle(e: any) {
    this.editingTitle = !this.editingTitle;
  }

  getTitleButtonText(editingTitle: string) {
    return editingTitle ? "Done" : "Edit Title";
  }

  toggleEditDescription(e: any) {
    this.editingDescription = !this.editingDescription;
  }

  getDescriptionButtonText(editingDescription: string) {
    return editingDescription ? "Done" : "Edit Description";
  }

  displayDate(date: string): Date {
    // Set due date at the current date if the course has no due date yet.
    const returnDate: Date =  date ? new Date(date) : new Date();
    return returnDate;
  }

  async dueDateChanged() {
    try {
      const newDate: Date = this.querySelector('#dueDate').date;
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


  showTagsTitle(tagsLength: number, hasEditAccess: boolean) {
    return tagsLength > 0 || hasEditAccess;
  }

  showTagsView(tagsLength: number, hasEditAccess: boolean) {
    return tagsLength > 0 && !hasEditAccess;
  }

  async onAdd(e: any) {
    try {
      const tag: string = e.detail.tag;
      await Actions.addTagToCourse(this, tag, this.courseId);
      this.successMessage = '';
      this.successMessage = `${tag} added successfully.`;
      Actions.getCoursesByUser(this);
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  async onRemove(e: any) {
    try {
      const tag: Tag = this.courseTags[e.detail.index];
      if(tag) {
        await Actions.deleteTagFromCourse(this, tag, this.courseId);
        this.successMessage = '';
        this.successMessage = `${tag.name} removed successfully.`;
        Actions.getCoursesByUser(this);
      }

    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  toggle(e: any) {
    const collapseTarget = (e.target.id);
    this.querySelector('#Concept' + collapseTarget).toggle();
  }

  async viewCourse() {
    if (this.data.courseId) {
        Actions.showMainSpinner(this);
        await Actions.getCourseViewCourseById(this, this.data.courseId);
        await Actions.loadViewCourseConcepts(this, this.data.courseId);
        Actions.hideMainSpinner(this);
    }
  }

  getLTILinks() {
    console.log('LTI Links3')

  }

  addConcept(e: any) {
    this.querySelector('#addConceptDialog').open();
  }

  async sortableEnded(e: any) { //This isn't the most elegant solution. I'm open to better ways of doing things.
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

  async attributeChanged(e: any) {
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
