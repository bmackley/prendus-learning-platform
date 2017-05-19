import {CheckAnswerRequestBody} from '../../node_modules/prendus-services/typings/check-answer-request-body';
import {QuestionInfo} from '../../node_modules/prendus-services/typings/question-info';
import {Answer} from '../../node_modules/prendus-services/typings/answer';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {ConstantsService} from '../../node_modules/prendus-services/services/constants-service';
import {UserAnswerInfo} from '../../node_modules/prendus-services/typings/user-answer-info';
import {QuizSession} from '../../node_modules/prendus-services/typings/quiz-session';
import {QuestionSession} from '../../node_modules/prendus-services/typings/question-session';
import {Notification} from '../../node_modules/prendus-services/typings/notification';
import {Actions} from '../../redux/actions';
import {CheckOrRadioAnswer} from '../../node_modules/prendus-services/typings/check-or-radio-answer';

class PrendusQuestionScaffoldViewQuestion {
  public is: string;
  public properties: any;
	public notificationType: Notification;
	public notificationText: string;
  public hideRenderMath: boolean;
  public problemText: string;
  public userInputs: string[];
  public userCheckboxes: string[];
  public userRadios: string[];
  public problemUid: string;
  public hint: string;
  public answer: Answer;
  public quizId: string;
  public questionId: string;
  public uuid: string;
  public answerReturnInfo: string;
  public confidenceLevel: 'just guessing' | 'pretty sure' | 'very sure' | '' = '';
  public showConfidenceLevel: boolean;
  public jwt: string;
  public concise: boolean;
  public userFullName: string;
  public userEmail: string;
  public courseId: string;
  public baseUri: string;
  public fullUrl: string;
  public fire: any;
  public showCheckAnswer: boolean;
  public endpointDomain: string;
  public querySelector: any;
  public showQuestionGenerationButtons: boolean;
  public debounce: any;

  beforeRegister(): void {
      this.is = 'prendus-question-scaffold-view-question';
      this.properties = {
        questionId: {
          type: String,
          observer: 'vitalPropertiesChanged'
        },
        jwt: {
          type: String,
          observer: 'vitalPropertiesChanged'
        }
      };
  }

  async checkAnswer(): Promise<void> {
    try {
      const userRadiosAnswers: { [radioName: string]: boolean } = getUserRadiosAnswers(this, this.userRadios || []);
      //TODO do the grading on the server?
      //TODO actually no, we just have to store the fact that they did it.
      const answer: CheckOrRadioAnswer = await getAnswer(this);
      console.log('userRadiosAnswers ', userRadiosAnswers);
      console.log('answer ', answer)
      const correct: boolean = isAnswerCorrect(userRadiosAnswers, answer);
      console.log('correct ', correct);
      Actions.showNotification(this, correct ? 'success' : 'error', correct ? 'correct' : 'incorrect');

    } catch(error) {
      console.error('error while checking answer ', error);
    }

    function isAnswerCorrect(correctAnswer: { [radioName: string]: boolean }, userAnswer: CheckOrRadioAnswer ): boolean {
      const correct: boolean = Object.keys(correctAnswer).reduce( (acc: any, currentKey: string, index: number) => {
        console.log('correctAnswer[currentKey] ' + correctAnswer[currentKey] + ' userAnswer[currentKey] ' + userAnswer[currentKey]);
        console.log('acc ', acc)
        return acc && correctAnswer[currentKey] === userAnswer[currentKey]
      }, false)
      console.log('correct ', correct);
      return false;
    };
    async function getAnswer(context: PrendusQuestionScaffoldViewQuestion): Promise<CheckOrRadioAnswer> {
      const queryParams: any = {
        questionId: context.questionId,
        jwt: context.jwt
      };
      const response = await fetch(`${UtilitiesService.getPrendusServerEndpointDomain()}/api/jwt/${queryParams.jwt}/question/${queryParams.questionId}/getAnswer`, {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: UtilitiesService.prepareUrl(queryParams, false)
      });
      const responseBody = await response.json();

      const answer: Answer = responseBody.answer;
      return answer;
    }
  }

  async vitalPropertiesChanged(): Promise<void> {
    try {
      if(this.questionId && this.jwt) {
        const questionInfo: QuestionInfo = await getQuestionInfo(this);
        console.log('questionInfo ', questionInfo);
        setQuestionInfo(this, questionInfo);
        attachRadioEventListeners(this, this.userRadios, this.uuid);
      }
    } catch(error) {
      console.error(error);
      Actions.showNotification(this, 'error', 'Something went wrong getting the question..');
    }

    async function getQuestionInfo(context: PrendusQuestionScaffoldViewQuestion): Promise<QuestionInfo> {
      const queryParams: any = {
        questionId: context.questionId,
        jwt: context.jwt
      };
      const response = await fetch(`${UtilitiesService.getPrendusServerEndpointDomain()}/api/jwt/${queryParams.jwt}/question/${queryParams.questionId}`, {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: UtilitiesService.prepareUrl(queryParams, false)
      });
      const responseBody = await response.json();

      const questionInfo: QuestionInfo = responseBody.questionInfo;
      return questionInfo;

    };
    function setQuestionInfo(context: PrendusQuestionScaffoldViewQuestion, questionInfo: QuestionInfo) {
        context.uuid = questionInfo.uuid;
        context.problemText = questionInfo.transformedText;
        context.problemUid = questionInfo.uid;
        context.userInputs = questionInfo.userInputs || [];
        context.userCheckboxes = questionInfo.userCheckboxes || [];
        context.userRadios = questionInfo.userRadios || [];
        context.hint = questionInfo.hint;
        context.answer = questionInfo.answer;
        context.showConfidenceLevel = questionInfo.showConfidenceLevel;
        context.showCheckAnswer = questionInfo.showCheckAnswer;
        context.showQuestionGenerationButtons = questionInfo.showQuestionGenerationButtons;
    }

    function attachRadioEventListeners(context: PrendusQuestionScaffoldViewQuestion, userRadios: string[], questionSessionId: string) {
        userRadios.forEach((element) => {
            const radioElement = document.getElementById(element + questionSessionId);

            radioElement.addEventListener('change', (e) => {
                context.fire('radioselected', {
                    questionId: context.questionId,
                    radioName: element
                }, {
                    bubbles: false
                });
            });
        });
    }

  }

  mathRenderingBegun(): void {
      this.hideRenderMath = true;
  }

  mathRenderingComplete(): void {
      this.hideRenderMath = false;
  }

  computeAnswerInputHidden(userInputs: string[], userCheckboxes: string[], userRadios: string[]) {
      return !userInputs || userInputs.length > 0 || !userCheckboxes || userCheckboxes.length > 0 || !userRadios || userRadios.length > 0;
  }

  verySureSelected() {
      this.confidenceLevel = 'very sure';
  }

  prettySureSelected() {
      this.confidenceLevel = 'pretty sure';
  }

  justGuessingSelected() {
      this.confidenceLevel = 'just guessing';
  }

}

Polymer(PrendusQuestionScaffoldViewQuestion);

function getUserInputsAnswers(context: PrendusQuestionScaffoldViewQuestion, userInputs: string[]): { [inputName: string]: string } {
  return userInputs.reduce((prev: { [inputName: string]: string }, curr: string) => {
      const userInputElement = document.getElementById(curr + context.uuid);
      const userAnswer: string = userInputElement.textContent;

      prev[curr] = userAnswer;

      return prev;
  }, {});
}

function getUserCheckboxesAnswers(context: PrendusQuestionScaffoldViewQuestion, userCheckboxes: string[]): { [checkboxName: string]: boolean } {
  return userCheckboxes.reduce((prev: { [checkboxName: string]: boolean }, curr: string) => {
      const userCheckboxElement: HTMLInputElement = <HTMLInputElement> document.getElementById(curr + context.uuid);
      const userAnswer: boolean = userCheckboxElement.checked;

      prev[curr] = userAnswer;

      return prev;
  }, {});
}

function getUserRadiosAnswers(context: PrendusQuestionScaffoldViewQuestion, userRadios: string[]): { [radioName: string]: boolean } {
  return userRadios.reduce((prev: { [radioName: string]: boolean }, curr: string) => {
      const userRadioElement: HTMLInputElement = <HTMLInputElement> document.getElementById(curr + context.uuid);
      const userAnswer = userRadioElement.checked;

      prev[curr] = userAnswer;

      return prev;
  }, {});
}
