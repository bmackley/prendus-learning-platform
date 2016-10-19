import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {CourseConceptData} from '../../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {Tag} from '../../node_modules/prendus-services/interfaces/tag.interface.ts';
class PrendusCourseEdit {
  public is: string;
  public properties: any;
  public observers: String[];
  public title: string;
  public courseConcepts: CourseConceptData[];
  public currentCourse: Course;
  public courseTagNames: string[];
  public courseTags: Tag[];
  public courseId: string;
  public username: string;
  public uid: string;
  public date: Date;
  public route: any;
  public data: any;
  public courseConceptsLength: number;
  public successMessage: string;
  public errorMessage: string;

  beforeRegister() {
    this.is = 'prendus-course-edit';
    this.properties = {
      route: {
        type: Object,
        observer: 'getCourse'
      },
      data: {
        type: Object,
      }
    }
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
  async getCourse(){
    if (this.data.courseId) {
        Actions.showMainSpinner(this);
        await Actions.getCourseEditCourseById(this, this.data.courseId);
        await Actions.loadEditCourseConcepts(this, this.data.courseId);
        Actions.hideMainSpinner(this);
    }
  }

  mapStateToThis(e: StatechangeEvent) {
    const state = e.detail.state;
    this.courseId = state.courseEditCurrentCourse.id;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
    this.currentCourse = state.courseEditCurrentCourse;    
    this.courseTags = state.courseEditCurrentCourse.tags;
    this.courseTagNames = state.courseTagNames;
    this.courseConcepts = state.editCourseConcepts[this.courseId];
    this.courseConceptsLength = this.courseConcepts && this.courseConcepts.length;
  }

  openCollaboratorsModal(e: any) {
    this.querySelector('#collaborators-modal').open();
  }

  addConcept(e: any) {
    this.querySelector('#addConceptDialog').open();
  }


  toggle(e: any) {
    const collapseTarget = e.target.id;
    this.querySelector('#concept' + collapseTarget).toggle();
  }

  sortableEnded(e: any){ //This isn't the most elegant solution. I'm open to better ways of doing things.
    if(typeof e.newIndex !== 'undefined'){
      const updateConceptPositionArray : any[] = [];
      for(let i = 0, len = this.courseConcepts.length; i < len; i++ ){
        if(this.courseConcepts[i].position != i){
          this.courseConcepts[i].position = i
          updateConceptPositionArray.push(this.courseConcepts[i])
        }
      }
      try{
        Actions.orderConcepts(this, this.courseId, updateConceptPositionArray);
        this.successMessage = '';
        this.successMessage = 'Concept ordered successfully';
      }catch(error){
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
    }
  }
  async attributeChanged(e: any) {
    try{
      if(typeof e.target !== 'undefined' ){
        const value = e.target.value;
        const attribute = e.target.name;
        await Actions.updateCourseField(this, this.courseId, attribute, value);
        await Actions.getCourseEditCourseById(this, this.data.courseId);
        this.successMessage = '';
        this.successMessage = `${attribute} has been updated`;
      }
    }catch(error){
      this.errorMessage = '';
      this.errorMessage = error.message;
    }
  }
}

Polymer(PrendusCourseEdit);
