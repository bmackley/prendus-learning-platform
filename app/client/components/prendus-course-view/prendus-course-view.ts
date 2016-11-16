import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {Concept} from '../../node_modules/prendus-services/interfaces/concept.interface.ts';
import {CourseConceptData} from '../../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {Tag} from '../../node_modules/prendus-services/interfaces/tag.interface.ts';

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
      'viewData(data)'
    ];
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

  showTagsTitle(tagsLength: number, hasEditAccess: boolean) {
    return tagsLength > 0 || hasEditAccess;
  }

  showTagsView(tagsLength: number, hasEditAccess: boolean) {
    return tagsLength > 0 && !hasEditAccess;
  }

  async tagAdded(e: any) {
    try {
      if(!this.courseTagNames) {
        this.courseTagNames = this.querySelector('#tags').tags;
      }
      const tag: string = this.courseTagNames[this.courseTagNames.length - 1];
      await Actions.addTagToCourse(this, tag, this.courseId);
      this.successMessage = '';
      this.successMessage = `${tag} added successfully.`;
      Actions.getCoursesByUser(this);
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  async tagRemoved(e: any) {
    try {
      const tag: Tag = this.getTagRemoved();
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

  getTagRemoved() {
    for(let i = 0; i < this.courseTags.length; i++) {
      const tag = this.courseTags[i];
      if(this.courseTagNames.indexOf(tag.name) === -1) {
        this.courseTagNames.splice(i);
        this.courseTags.splice(i);
        return tag;
      }
    }
    return null;
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

  async viewData() {
    if (this.data.courseId) {
        Actions.showMainSpinner(this);
        await Actions.getCourseViewCourseById(this, this.data.courseId);
        await Actions.loadViewCourseConcepts(this, this.data.courseId);
        Actions.hideMainSpinner(this);
    }
  }

  addConcept(e: any) {
    this.querySelector('#addConceptDialog').open();
  }

  async addConceptFormDone(e: any) {
    e.preventDefault();
    if(this.$.conceptFormName.value) {
      this.querySelector('#addDialog').close();
      const newConcept = {
        uid: this.uid,
        title: this.$.conceptFormName.value,
      };
      try {
        await Actions.addConcept(this, this.courseId, newConcept, this.courseConcepts.length);
        await Actions.loadViewCourseConcepts(this, this.courseId);
        this.successMessage = '';
        this.successMessage = 'Concept added successfully';
      }catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
      this.$.conceptFormName.value = '';
    }
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
