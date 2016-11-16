// THIS WILL BE USED LATER

// import {Actions} from '../../redux/actions.ts';
// import {Concept} from '../../node_modules/prendus-services/interfaces/course.interface.ts';
// import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
//
// class PrendusSearchConceptTags {
//   public is: string;
//   public properties: any;
//   public resultingConcepts: Concept[];
//   public tagList: string[];
//   beforeRegister() {
//     this.is = 'prendus-search-concept-tags';
//     this.properties = {
//     };
//   }
//
//   //looks through concept tags in database for matching tags
//   async searchTagsInDB(e: any) {
//     try {
//       await Actions.lookupConceptTags(this, this.tags);
//     } catch(error) {
//       this.domHost.errorMessage = '';
//       this.domHost.errorMessage = error.message;
//     }
//   }
//
//   clearTags(e: any) {
//     this.tags = [];
//   }
//   mapStateToThis(e: StatechangeEvent) {
//     const state = e.detail.state;
//     this.resultingConcepts = state.resultingConcepts;
//   }
// }
//
// Polymer(PrendusSearchConceptTags);
