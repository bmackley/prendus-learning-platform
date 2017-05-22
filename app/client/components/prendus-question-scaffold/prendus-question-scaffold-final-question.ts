import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {Action} from '../../typings/action';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {QuestionModel} from '../../node_modules/prendus-services/models/question-model';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service.ts';

class PrendusQuestionScaffoldFinalQuestion {
  public is: string;
  public properties: any;
  public selectedIndex: number;
  public myIndex: number;
  public querySelector: any;
  public numberOfAnswers: number;
  public action: Action;
  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-final-question';
    this.properties = {
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      },
      myIndex: {
        type: Number
      },
      questionScaffold: {
        type: Object
      }
    };
  }


  disableNext(e: any): void {
    try {
      if(this.myIndex !== undefined && this.selectedIndex !== undefined && this.myIndex === this.selectedIndex) {
        this.action = Actions.setDisabledNext(false);
        //TODO save question here

      }
    } catch(error) {
      console.error(error);
    }

    function addQuestionToQuiz(context: PrendusQuestionScaffoldFinalQuestion): void {

    }
  }


	mapStateToThis(e: CustomEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusQuestionScaffoldFinalQuestion);
