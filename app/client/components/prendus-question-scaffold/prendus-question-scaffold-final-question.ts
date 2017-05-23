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
  public question: Question;
  public questionScaffold: QuestionScaffold;
  public uid: string;

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
      quizId: {
        type: Object
      }
    };
  }


  async disableNext(e: any): Promise<void> {
    try {
      if(this.myIndex !== undefined && this.selectedIndex !== undefined && this.myIndex === this.selectedIndex) {
        this.action = Actions.setDisabledNext(false);
        await Actions.checkUserAuth(this);
        this.action = {
            type: 'CONVERT_QUESTION_SCAFFOLD_TO_QUESTION',
            uid: this.uid,
            questionId: this.questionScaffold.convertedQuestion ? this.questionScaffold.convertedQuestion.id : null
        };
        const questionId: string = await addQuestionToQuiz(this.quizId, this.questionScaffold.convertedQuestion);
        this.action = {
            type: 'SET_QUESTION_SCAFFOLD_QUESTION_ID',
            questionId
        };
      }
    } catch(error) {
      console.error(error);
    }

    async function addQuestionToQuiz(quizId: string, question: Question): Promise<string> {
      const questionId: string = await QuestionModel.save(question.id, question);
      const questionIds: string[] = await QuizModel.getQuestionIds(quizId);

      await QuizModel.associateQuestion(quizId, questionId, questionIds.length);

      return questionId;
    }
  }


	mapStateToThis(e: CustomEvent): void {
		const state: State = e.detail.state;

        this.questionScaffold = state.currentQuestionScaffold;
        this.uid = state.currentUser && state.currentUser.metaData ? state.currentUser.metaData.uid : this.uid;
    }
}

Polymer(PrendusQuestionScaffoldFinalQuestion);
