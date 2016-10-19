import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {Concept} from '../../node_modules/prendus-services/interfaces/concept.interface.ts';
import {CourseConceptData} from '../../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';

export class PrendusCourseView {
  public is: string;
  public courseConcepts: CourseConceptData[];
  public currentCourse: Course;
  public courseTagNames: String[];
  public courseTags: Tag[];
  public courseId: Course[];
  public properties: any;
  public observers: String[];
  public username: string;
  public uid: string;
  public currentCourse: Course;

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
      courseTagNames: {
        type: Array,
        value: []
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
      'viewData(data)',
      'updateTags(currentCourse.tags)'
    ];
  }

  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.courseId = state.courseViewCurrentCourse.id;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
    this.currentCourse = state.courseViewCurrentCourse;
    this.courseConcepts = state.viewCourseConcepts[this.courseId];
  }

  openCollaboratorsModal(e) {
    this.querySelector('#collaborators-modal').open();
  }

  computeHasEditAccess(uid: string, collaborators: any) {
    return uid in collaborators;
  }

  toggleEditTitle(e: any) {
    this.editingTitle = !this.editingTitle;
  }

  getTitleButtonText(editingTitle) {
    return editingTitle ? "Done" : "Edit Title";
  }

  toggleEditDescription(e: any) {
    this.editingDescription = !this.editingDescription;
  }

  getDescriptionButtonText(editingDescription) {
    return editingDescription ? "Done" : "Edit Description";
  }

  updateTags(tags) {
    if(!tags) tags = [];
    for (var i = 0; i < tags.length; i++) {
      this.courseTagNames[i] = tags[i].name;
    }
  }

  showTagsTitle(tagsLength, hasEditAccess) {
    return tagsLength > 0 || hasEditAccess;
  }

  showTagsView(tagsLength, hasEditAccess) {
    return tagsLength > 0 && !hasEditAccess;
  }

  tagAdded(e: any) {
    try {
      if(!this.courseTagNames) {
        this.courseTagNames = this.querySelector('#tags').tags;
      }
      const tag: string = this.courseTagNames[this.courseTagNames.length - 1];
      Actions.addTagToCourse(this, tag, this.courseId);
    } catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }

  tagRemoved(e: any) {
    try {
      const tag: Tag = this.getTagRemoved();
      if(tag) {
        Actions.deleteTagFromCourse(this, tag, this.courseId);
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

  addConceptFormDone(e: any) {
    e.preventDefault();
    if(this.$.conceptFormName.value) {
      this.querySelector('#addDialog').close();
      const newConcept = {
        creator: this.uid,
        title: this.$.conceptFormName.value,
      };
      Actions.addConcept(this, this.courseId, newConcept, this.courseConcepts.length);
    }
  }

  sortableEnded(e: any) {
    if(typeof e.newIndex !== 'undefined') {
      let updateConceptPositionArray = [];
      for(let i = 0, len = this.courseConcepts.length; i < len; i++ ) {
        if(this.courseConcepts[i].pos != i) {
          this.courseConcepts[i].pos = i
          updateConceptPositionArray.push(this.concepts[i])
        }
      }
      Actions.orderConcepts(this, this.courseId, updateConceptPositionArray);
    }
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
        await Actions.getCourseEditCourseById(this, this.data.courseId);

        this.successMessage = '';
        this.successMessage = 'Concept added successfully';

        Actions.loadEditCourseConcepts(this, this.data.courseId);
      }catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
      this.$.conceptFormName.value = '';
    }
  }

  sortableEnded(e: any) { //This isn't the most elegant solution. I'm open to better ways of doing things.
    if(typeof e.newIndex !== 'undefined') {
      const updateConceptPositionArray = [];
      for(let i = 0, len = this.courseConcepts.length; i < len; i++ ) {
        if(this.courseConcepts[i].position != i) {
          this.courseConcepts[i].position = i
          updateConceptPositionArray.push(this.courseConcepts[i])
        }
      }
      try {
        Actions.orderConcepts(this, this.courseId, updateConceptPositionArray);
        this.successMessage = '';
        this.successMessage = 'Concept ordered successfully';
      }catch(error) {
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
        console.log(this.currentCourse);
        this.successMessage = '';
        this.successMessage = `${attribute} has been updated`;
      }
    }catch(error) {
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }
}

Polymer(PrendusCourseView);
