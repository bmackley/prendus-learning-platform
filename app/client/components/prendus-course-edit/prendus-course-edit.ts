import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {CourseConceptData} from '../../node_modules/prendus-services/interfaces/course-concept-data.interface.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {Tag} from '../../interfaces/tag.interface.ts';
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
  public startDate: Date;
  public endDate: Date;
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
        },
        courseTagNames: {
          type: [],
          observer: 'tagChange'
        }
    }
  }
  tagChange(e) {
     console.log("the tags have changed");
     console.log(this.courseTagNames);
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
    this.startDate = state.courseEditCurrentCourse.startDate;
    this.endDate = state.courseEditCurrentCourse.endDate;
    this.username = state.currentUser.metaData.email;
    this.uid = state.currentUser.metaData.uid;
    this.currentCourse = state.courseEditCurrentCourse;
    this.courseTagNames = this.currentCourse.tagNames;
    this.courseTags = this.currentCourse.tags;
    this.courseConcepts = state.editCourseConcepts[this.courseId];
    this.courseConceptsLength = this.courseConcepts && this.courseConcepts.length;
  }

  openCollaboratorsModal(e) {
    this.querySelector('#collaborators-modal').open();
  }

  addConcept(e){
    addDialog.open();
  }

  openStartDatePicker(e){
    this.querySelector('#selectStartDate').open();
  }

  openEndDatePicker(e){
    this.querySelector('#selectEndDate').open();
  }

  toggle(e) {
    const collapseTarget = e.target.id;
    this.querySelector('#concept' + collapseTarget).toggle();
  }

  async addConceptFormDone(e){
    e.preventDefault();
    if(this.$.conceptFormName.value){
      this.querySelector('#addDialog').close();
      const newConcept = {
        uid: this.uid,
        title: this.$.conceptFormName.value,
      };
      try{
        await Actions.addConcept(this, this.courseId, newConcept, this.courseConcepts.length);
        await Actions.getCourseEditCourseById(this, this.data.courseId);
        this.successMessage = '';
        this.successMessage = 'Concept added successfully';

        Actions.loadEditCourseConcepts(this, this.data.courseId);
      }catch(error){
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
      this.$.conceptFormName.value = '';
    }
  }

  sortableEnded(e){ //This isn't the most elegant solution. I'm open to better ways of doing things.
    if(typeof e.newIndex !== 'undefined'){
      const updateConceptPositionArray = [];
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

  async attributeChanged(e) {
    try{
      console.log("change!");
      if(typeof e.target !== 'undefined' ){

        const value = e.target.value;
        const attribute = e.target.name;
        await Actions.updateCourseField(this, this.courseId, attribute, value);
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
