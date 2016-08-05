
import {rootReducer} from '../../redux/reducers.ts';
// export class AppComponent {
//   public is: string;
//   public observers: string[];
//   public rootReducer: any;
//
//   beforeRegister() {
//     this.is = 'app-element';
//     this.observers = [
//         'init(rootReducer)'
//     ];
//   }
//   async init() {
//     console.log(rootReducer)
//     this.rootReducer = rootReducer;
//   }
// }
// Polymer(AppComponent)

Polymer({
  is: "app-element",
  properties: {
    },
  ready: function(e){
    this.rootReducer = rootReducer;
  }
});
