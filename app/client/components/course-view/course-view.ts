import {Actions} from '../../redux/actions.ts';
import {Course} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
import {Concept} from '../../node_modules/prendus-services/interfaces/concept.interface.ts';
// import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

export class CourseViewComponent {
  public is: string;
  public courseConcepts: Concept[];
  public courseId: Course[];
  public properties: any;
  public observers: String[];
  beforeRegister() {
    this.is = 'course-view';
    this.properties = {
      title: {
        type: String,
        value: 'Course Name'
      },
      courses: {
        type: Array,
        value: [{title: 'Course Title', instructor: 'Instructor Name', }]
      },
      route: {
        type: Object,
      }
    };
    this.observers = [
      'viewCourse(route)',
    ];
  }
  mapStateToThis(e) {
    const state = e.detail.state;
    this.courseId = e.detail.state.currentCourse.id;
    this.startDate = e.detail.state.currentCourse.startDate;
    this.endDate = e.detail.state.currentCourse.endDate;
    this.username = e.detail.state.currentUser.metaData.email;
    this.uid = e.detail.state.currentUser.metaData.uid;
    this.currentCourse = e.detail.state.currentCourse;
    this.courseConcepts = this.currentCourse.concepts;
    // this.courseConcepts = [];
    // this.courseId = e.detail.state.currentCourse.id;
    // this.startDate = e.detail.state.currentCourse.startDate;
    // this.endDate = e.detail.state.currentCourse.endDate;
    // this.username = e.detail.state.currentUser.metaData.email;
    // this.uid = e.detail.state.currentUser.metaData.uid;
    // if(e.detail.state.courseConcepts){
    //   for(let key in e.detail.state.courseConcepts){
    //     this.push('courseConcepts', state.courseConcepts[key])
    //   }
    // }
  }
  toggle(e) {
    let collapseTarget = (e.target.id);
    this.querySelector('#Concept' + collapseTarget).toggle();
  }
  addConceptFormDone(e){
    e.preventDefault();
    if(this.$.conceptFormName.value){
      this.querySelector('#addDialog').close();
      let newConcept = {
        creator: this.uid,
        title: this.$.conceptFormName.value,
      };
      Actions.addConcept.execute(this, this.courseId, newConcept, this.courseConcepts.length);
    }
  }
  sortableEnded(e){
    if(typeof e.newIndex !== 'undefined'){
      let updateConceptPositionArray = [];
      for(let i = 0, len = this.courseConcepts.length; i < len; i++ ){
        if(this.courseConcepts[i].pos != i){
          this.courseConcepts[i].pos = i
          updateConceptPositionArray.push(this.concepts[i])
        }
      }
      Actions.orderConcepts.execute(this, this.courseId, updateConceptPositionArray);
    }
  }
  viewCourse() {
    console.log('view Course')
    if(this.data.courseId){
      console.log('course Data')
      console.log('route', this.route)
      console.log('data', this.data)
      Actions.getCourseById.execute(this, this.data.courseId)
    }
  }
  ready(){
  }
}
Polymer(CourseViewComponent);

// Polymer({
// is: "course-view",
// listeners: {
//
// },
// // //mapStateToThis works with event changes.  If it changes somewhere else in the app, it will update here.
// mapStateToThis: function(e) {
//   const state = e.detail.state;
//   this.courseId = e.detail.state.currentCourse.id;
//   this.startDate = e.detail.state.currentCourse.startDate;
//   this.endDate = e.detail.state.currentCourse.endDate;
//   this.username = e.detail.state.currentUser.metaData.email;
//   this.uid = e.detail.state.currentUser.metaData.uid;
//   this.currentCourse = e.detail.state.currentCourse;
//   this.courseConcepts = this.currentCourse.concepts;
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
//   if(typeof e.newIndex !== 'undefined'){
//     let updateConceptPositionArray = [];
//     for(let i = 0, len = this.courseConcepts.length; i < len; i++ ){
//       if(this.courseConcepts[i].pos != i){
//         this.courseConcepts[i].pos = i
//         updateConceptPositionArray.push(this.concepts[i])
//       }
//     }
//     Actions.orderConcepts.execute(this, this.courseId, updateConceptPositionArray);
//   }
// },
// properties: {
//     subdomain: {
//       type: Object
//     },
//     title: {
//       type: String,
//       value: 'Course Name'
//     },
//     courses: {
//       type: Array,
//       value: [{title: 'Course Title', instructor: 'Instructor Name', startDate: {month: new Date().getMonth(), day: new Date().getDate(), year: new Date().getFullYear()}, endDate: Date.now()}]
//     },
//     route: {
//       type: Object,
//       observer: 'viewCourse'
//     },
//   },
//   viewCourse: function() {
//     console.log('view Course')
//     if(this.data.courseId){
//       console.log('course Data')
//       console.log('route', this.route)
//       console.log('data', this.data)
//       Actions.getCourseById.execute(this, this.data.courseId)
//     }
//   },
// ready: function(){
// }
// });
