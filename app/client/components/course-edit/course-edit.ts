import {Actions} from '../../redux/actions.ts';
// import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

// Polymer({
// is: "course-edit",
// listeners: {
//
// },
// // //mapStateToThis works with event changes.  If it changes somewhere else in the app, it will update here.
// mapStateToThis: function(e) {
//   const state = e.detail.state;
//   console.log(state)
//   this.title = state.currentCourse.title;
//   this.courseConcepts = [];
//   this.courseId = state.currentCourse.id;
//   this.startDate = state.currentCourse.startDate;
//   this.endDate = state.currentCourse.endDate;
//   this.username = state.currentUser.metaData.email;
//   this.uid = state.currentUser.metaData.uid;
//   if(state.courseConcepts){
//     for(let key in state.courseConcepts){
//       this.push('courseConcepts', state.courseConcepts[key])
//     }
//   }
// },
// addConcept: function(e){
//   addDialog.open();
// },
// openStartDatePicker: function(e){
//   this.querySelector('#selectStartDate').open();
// },
// openEndDatePicker: function(e){
//   this.querySelector('#selectEndDate').open();
// },
// dismissStartDatepicker: function(e){
//   console.log('start datepicker', e.target.id)
//   console.log(this)
//   console.log(this.date)
// },
// dismissEndDatepicker: function(e){
//   console.log('end datepicker', e.target.id)
//   console.log(this.date)
// },
// deleteItem: function(e){
//   const conceptsArray = this.concepts;
//   console.log('concept key', e.target.id)
//   console.log('course id', this.courseId)
//   Actions.deleteConcept.execute(this, this.courseId, e.target.id);
// },
// toggle: function(e) {
//   let collapseTarget = (e.target.id);
//   this.querySelector('#Concept' + collapseTarget).toggle();
// },
// addConceptFormDone: function(e){
//   e.preventDefault();
//   if(this.$.conceptFormName.value){
//     this.querySelector('#addDialog').close();
//     let newConcept = {
//       creator: this.uid,
//       title: this.$.conceptFormName.value,
//     };
//     Actions.addConcept.execute(this, this.courseId, newConcept, this.courseConcepts.length);
//   }
// },
// sortableEnded: function(e){
//   console.log('e old', e.oldIndex)
//   console.log('e new', e.newIndex)
//   console.log('course concepts', this.courseConcepts)
//   if(typeof e.newIndex !== 'undefined'){
//     let updateConceptPositionArray = [];
//     for(let i = 0, len = this.courseConcepts.length; i < len; i++ ){
//       if(this.courseConcepts[i].position != i){
//         this.courseConcepts[i].position = i
//         console.log(this.courseConcepts[i])
//         updateConceptPositionArray.push(this.courseConcepts[i])
//       }
//     }
//     console.log('Concept Positions Array', updateConceptPositionArray)
//     Actions.orderConcepts.execute(this, this.courseId, updateConceptPositionArray);
//   }
// },
// properties: {
//     subdomain: {
//       type: Object
//     },
//     courses: {
//       type: Array,
//       value: [{title: 'Course Title', instructor: 'Instructor Name', startDate: {month: new Date().getMonth(), day: new Date().getDate(), year: new Date().getFullYear()}, endDate: Date.now()}]
//     },
//     route: {
//       type: Object,
//       observer: 'getCourse'
//     },
//   },
//   getCourse: function() {
//     console.log('getting course')
//     console.log('this', this)
//     console.log('data', this.data)
//     console.log('data.course', this.data.courseId)
//     if(this.data){
//       console.log('courseId', this.data.courseId)
//       Actions.getCourseById.execute(this, this.data.courseId)
//     }
//   },
//   ready: function(e){
//   }
// });

// import {Actions} from '../../redux/actions.ts';

export class CourseEditComponent {
  public is: string;
  public properties: any;
  public observers: String[];
  public title: string;
  public courseConcepts: string[];
  public courseId: string;
  public username: string;
  public uid: string;
  public date: Date;
  public startDate: Date;
  public endDate: Date;
  public route: any;
  public data: any;

  beforeRegister() {
    this.is = 'course-edit';
    this.properties = {
        route: {
          type: Object,
        },
        data: {
          type: Object,
        },
    }
    this.observers = [
      'getCourse(route)',
      'getData(data)',
    ];
  }
  getCourse(){
    console.log('getting course')
    console.log('getting route', this.route)
    if(this.data.courseId){
      console.log('getting course')
      Actions.getCourseById.execute(this, this.data.courseId)
    }
  };
  getData(){
    console.log('getting data')
    console.log('getting data info', this.data)
    if(this.data.courseId){
      console.log('getting data', this.data)
    }
  };
  mapStateToThis(e) {
    const state = e.detail.state;
    this.courseId = e.detail.state.currentCourse.id;
    this.startDate = e.detail.state.currentCourse.startDate;
    this.endDate = e.detail.state.currentCourse.endDate;
    console.log('course edit', e.detail.state.currentUser)
    this.username = e.detail.state.currentUser.metaData.email;
    this.uid = e.detail.state.currentUser.metaData.uid;
    this.currentCourse = e.detail.state.currentCourse;
    this.courseConcepts = this.currentCourse.concepts;

    // const state = e.detail.state;
    // this.title = state.currentCourse.title;
    // this.courseConcepts = [];
    // this.courseId = state.currentCourse.id;
    // this.startDate = state.currentCourse.startDate;
    // this.endDate = state.currentCourse.endDate;
    // this.username = state.currentUser.metaData.email;
    // this.uid = state.currentUser.metaData.uid;
    // if(state.courseConcepts){
    //   for(let key in state.courseConcepts){
    //     this.push('courseConcepts', state.courseConcepts[key])
    //   }
    // }
  };
  addConcept(e){
    addDialog.open();
  };
  openStartDatePicker(e){
    this.querySelector('#selectStartDate').open();
  };
  openEndDatePicker(e){
    this.querySelector('#selectEndDate').open();
  };
  dismissStartDatepicker(e){
    console.log('start datepicker', e.target.id)
    console.log(this)
    console.log(this.date)
  };
  dismissEndDatepicker(e){
    console.log('end datepicker', e.target.id)
    console.log(this.date)
  };
  deleteItem(e){
    Actions.deleteConcept.execute(this, this.courseId, e.target.id);
  };
  toggle(e) {
    let collapseTarget = (e.target.id);
    this.querySelector('#Concept' + collapseTarget).toggle();
  };
  addConceptFormDone(e){
    console.log('in here')
    e.preventDefault();
    if(this.$.conceptFormName.value){
      this.querySelector('#addDialog').close();
      let newConcept = {
        uid: this.uid,
        title: this.$.conceptFormName.value,
        private: false //this will change as we create private courses, etc.
      };
      Actions.addConcept.execute(this, this.courseId, newConcept, this.courseConcepts.length);
    }
  };
  sortableEnded(e){ //This isn't the most elegant solution. I'm open to better ways of doing things.
    if(typeof e.newIndex !== 'undefined'){
      let updateConceptPositionArray = [];
      for(let i = 0, len = this.courseConcepts.length; i < len; i++ ){
        if(this.courseConcepts[i].position != i){
          this.courseConcepts[i].position = i
          updateConceptPositionArray.push(this.courseConcepts[i])
        }
      }
      Actions.orderConcepts.execute(this, this.courseId, updateConceptPositionArray);
    }
  }
  ready() {
  }
}

Polymer(CourseEditComponent);
