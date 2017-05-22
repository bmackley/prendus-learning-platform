import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {Action} from '../../typings/action';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
import {QuestionModel} from '../../node_modules/prendus-services/models/question-model';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {QuizModel} from '../../node_modules/prendus-services/models/quiz-model';
import {Question} from '../../node_modules/prendus-services/typings/question';

class PrendusQuestionScaffoldFinalQuestion {
  public is: string;
  public properties: any;
  public selectedIndex: number;
  public myIndex: number;
  public querySelector: any;
  public numberOfAnswers: number;
  public action: Action;
  public quizId: string;
  public assignmentId: string;
  public question: Question;


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
      },
      quizId: {
        type: Object
      },
      assignmentId: {
        type: Object
      }
    };
  }


  async disableNext(e: any): Promise<void> {
    try {
      if(this.myIndex !== undefined && this.selectedIndex !== undefined && this.myIndex === this.selectedIndex) {
        this.action = Actions.setDisabledNext(false);
        await addQuestionToQuiz(this);
      }
    } catch(error) {
      console.error(error);
    }

    async function addQuestionToQuiz(context: PrendusQuestionScaffoldFinalQuestion): Promise<void> {
      //TODO this.question should either be null or not... and it should update this
      const questionId: string = await QuestionModel.save(context.question ? context.question.id : null, this.question);
      const questionIds: string[] = await QuizModel.getQuestionIds(context.quizId);

      await QuizModel.associateQuestion(context.quizId, questionId, questionIds.length);
    }
  }


	mapStateToThis(e: CustomEvent): void {
		const state: State = e.detail.state;
	}
}

Polymer(PrendusQuestionScaffoldFinalQuestion);
