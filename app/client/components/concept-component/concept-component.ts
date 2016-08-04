import {Actions} from '../../redux/actions.ts';
// import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

Polymer({
  is: "concept-component",
  mapStateToThis: function(e) {
  },
  toggle: function(e) {
    // let collapseTarget = (e.target.id);
    // this.querySelector('#Concept' + collapseTarget).toggle();
  },
  // properties: {
  //   conceptId: {
  //       type: String
  //   }
  // },
  // observers: [
  //   'init(conceptId)'
  // ],
  // async init() {
  //   if (this.conceptId) {
  //     await Actions.getConcept(this, this.conceptId);
  //   }
  // },
  ready: function(){
    console.log('concept component')
  }
});
