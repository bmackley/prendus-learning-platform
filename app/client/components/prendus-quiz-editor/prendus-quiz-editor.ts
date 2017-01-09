import {Question} from '../../node_modules/prendus-services/typings/question';
import {QuestionVisibility} from '../../node_modules/prendus-services/typings/question-visibility';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import {QuestionSettings} from '../../node_modules/prendus-services/typings/question-settings';
import {StatechangeEvent} from '../../typings/statechange-event';
import {QuizSession} from '../../node_modules/prendus-services/typings/quiz-session';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {CourseModel} from '../../node_modules/prendus-services/models/course-model';
import {QuizVisibility} from '../../node_modules/prendus-services/typings/quiz-visibility';
import {QuizModel} from '../../node_modules/prendus-services/models/quiz-model';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';

class PrendusQuizEditor {
    public is: string;
    public userQuestionIds: string[];
    public publicQuestionIds: string[];
    public conceptId: string;
    public endpointDomain: string;
    public jwt: string;
    public properties: any;
    public observers: string[];
    public quizId: string;
    public quizQuestionIds: string[];
    public showSettings: boolean;
    public quizQuestionSettings: QuestionSettings;
    public title: string;
    public selected: number;
    public collaboratorEmails: string[];
    public uid: string;
    public quizSession: QuizSession;
    public querySelector: any;
    public courseId: string;
    public fire: any;
    public successMessage: string;
    public errorMessage: string;
    public $: any;
    public currentPage: string;

    beforeRegister() {
        this.is = 'prendus-quiz-editor';
        this.properties = {
            conceptId: {
                type: String,
                observer: 'conceptIdSet'
            },
            quizId: {
                type: String,
                observer: 'quizIdSet'
            },
            courseId: {
              type: String
            }
        };
    }
    async init() {
        this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
        const user = await FirebaseService.getLoggedInUser();
        this.jwt = await user.getToken();
        this.title = '';
        this.selected = 0;

        //TODO this is horrible and should be removed once the view problem component can be initialized without a quiz session being handed to it
        const startQuizSessionAjax = this.querySelector(`#startQuizSessionAjax`);
        startQuizSessionAjax.body = {
            quizId: 'NO_QUIZ',
            jwt: this.jwt
        };

        const request = startQuizSessionAjax.generateRequest();
        await request.completes;

        const quizSession: QuizSession = request.response.quizSession;
        this.quizSession = quizSession;
        //TODO this is horrible and should be removed once the view problem component can be initialized without a quiz session being handed to it
    }

    async conceptIdSet() {
        if (this.conceptId) {
            await this.init();
            await this.loadUserQuestionIds();
            await this.loadPublicQuestionIds();
        }
    }

    async quizIdSet() {
        if (this.quizId) {
            await this.init();
            const quiz: Quiz = await Actions.getQuiz(this.quizId);
            this.title = quiz.title;
            this.loadQuizQuestionIds();
            Actions.loadQuizQuestionSettings(this, this.quizId);
        }
    }

    async loadPublicQuestionIds() {
        const getPublicQuestionIdsAjax = this.querySelector('#getPublicQuestionIdsAjax');
        await Actions.loadPublicQuestionIds(this, getPublicQuestionIdsAjax);
    }

    async loadMoreData(): Promise<void> {

      if(this.currentPage !== 'quizEditor') {
        console.log('loadMoreData');
        this.$.threshold.clearTriggers();
        }
      }


    async loadUserQuestionIds() {
        const getUserQuestionIdsAjax = this.querySelector('#getUserQuestionIdsAjax');
        await Actions.loadUserQuestionIds(this, getUserQuestionIdsAjax);
    }

    async loadQuizQuestionIds() {
        await Actions.loadQuizQuestionIds(this, this.quizId);
    }

    async addQuestionToQuiz(e: any) {
        const questionId = e.model.item;
        await Actions.addQuestionToQuiz(this, this.quizId, questionId);
        await this.loadQuizQuestionIds();
    }

    async removeQuestionFromQuiz(e: any) {
        const questionId = e.model.item;
        await Actions.removeQuestionFromQuiz(this, this.quizId, questionId);
        await this.loadQuizQuestionIds();
    }

    displayDate(date: string): Date {
      // Return the current date if there is no course due date set yet.
      const returnDate: Date = date ? new Date(date) : new Date();
      return returnDate;
    }

    shareQuiz() {
        this.querySelector('#share-quiz-dialog').open();
    }

    selectText(e: any) {
      e.target.select();
    }

    openCollaboratorsModal(e: any) {
      this.querySelector('#collaborators-modal').open();
    }

    openSettingsModal(e: any) {
      this.querySelector('#settings-modal').open();
    }

    //Temporary based on Jordans preferences
    async createQuestion(e: any) {
        const visibility: QuestionVisibility = 'public'
        Actions.showMainSpinner(this);
        window.history.pushState({}, '', `courses/edit-question/question/create`);
        this.fire('location-changed', {}, {node: window});
    }

    editQuestion(e: any) {
        Actions.showMainSpinner(this);

        const questionId = e.model.item;

        window.history.pushState({}, '', `courses/edit-question/question/${questionId}`);
        this.fire('location-changed', {}, {node: window});
    }

    showEmptyQuizQuestionsText(quizQuestionIds: string[]) {
        const showEmptyQuizQuestionsText = !quizQuestionIds || quizQuestionIds.length === 0;
        return showEmptyQuizQuestionsText;
    }

    async manuallyReloadQuestions() {
        //TODO this is all extremely not optimized
        await this.loadUserQuestionIds();
        await this.loadPublicQuestionIds();
        await this.loadQuizQuestionIds();

        this.userQuestionIds.forEach((questionId) => {
            const viewQuestionElement = this.querySelector(`#user-question-id-${questionId}`);
            viewQuestionElement.loadNextProblem();
        });

        this.publicQuestionIds.forEach((questionId) => {
            const viewQuestionElement = this.querySelector(`#public-question-id-${questionId}`);
            viewQuestionElement.loadNextProblem();
        });

        this.quizQuestionIds.forEach((questionId) => {
            const viewQuestionElement = this.querySelector(`#quiz-question-id-${questionId}`);
            viewQuestionElement.loadNextProblem();
        });
    }

    showSettingsMenu() {
        this.showSettings = !this.showSettings;
    }

    async answerFeedbackToggled(e: any) {
        const checked = e.target.checked;
        await this.applySettings('answerFeedback', checked, 'Answer feedback', true);
    }

    async showAnswerToggled(e: any) {
        const checked = e.target.checked;
        await this.applySettings('showAnswer', checked, 'Show answer', true);
    }

    async showHintToggled(e: any) {
        const checked = e.target.checked;
        await this.applySettings('showHint', checked, 'Show hint', true);
    }

    async showCodeToggled(e: any) {
        const checked = e.target.checked;
        await this.applySettings('showCode', checked, 'Show code', true);
    }

    async gradedToggled(e: any) {
        const checked = e.target.checked;
        await this.applySettings('graded', checked, 'Graded', true);

        // Reset quiz due date to the last day of the course.  If the course
        // has no due date yet for some reason, the quiz due date is set
        // to the current day.
        const course: Course = await CourseModel.getById(this.courseId);
        const todaysDate: Date = new Date();
        const UTCDate: number = UtilitiesService.dateToUTCNumber(todaysDate);
        const newQuizDueDate: number = course.dueDate ? course.dueDate : UTCDate;
        await this.applySettings('dueDate', newQuizDueDate, null, true);
    }

    async dueDateChanged(e: any) {
        const dueDate: Date = this.querySelector('#dueDate').date;
        const UTCDueDate: number = UtilitiesService.dateToUTCNumber(dueDate);
        const course: Course = await CourseModel.getById(this.courseId);
        if(UTCDueDate > course.dueDate) {
          const courseDueDateAsString: string = UtilitiesService.UTCDateToLocalMMddyyyy(course.dueDate);
          this.errorMessage = '';
          this.errorMessage = `Quiz due date cannot be after the last day of the course. Which is currently ${courseDueDateAsString}. Quiz due date set back to original.`;
          // if the quiz didn't have a due date then set the quiz due date to the current date.
          // this assumes the last day of the course is after the current date.
          const date: number = !this.quizQuestionSettings.dueDate ? UtilitiesService.dateToUTCNumber(new Date()) : this.quizQuestionSettings.dueDate;
          await this.applySettings('dueDate', this.quizQuestionSettings.dueDate, null, true);
          return;
        }
        // paper-date-picker does not have an event listener for date change. So every
        // time a user clicks anywhere on the calendar, this function is called. To avoid
        // a firebase action, we compare the currentDate in firebase to the new UTCDueDate.
        if(this.quizQuestionSettings.dueDate !== UTCDueDate) {
          await this.applySettings('dueDate', UTCDueDate, 'Due date', true);
        }

    }

    async showConfidenceLevelToggled(e: any) {
        const checked = e.target.checked;
        await this.applySettings('showConfidenceLevel', checked, 'Show confidence level', true);
    }

    async allowGenerationToggled(e: any) {
        const checked = e.target.checked;
        await this.applySettings('allowGeneration', checked, 'Allow generation', true);
    }

    async maxNumAttemptsChanged(e: any) {
        const value: number = Number(e.target.value);
        await this.applySettings('maxNumAttempts', value, 'Maximum number of attempts', true);
    }

    async titleChanged(e: any) {
      try {
        const value: string = e.target.value;
        await QuizModel.updateTitle(this.quizId, value);
        this.successMessage = '';
        this.successMessage = `${value} updated.`;
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
      await Actions.loadEditConceptQuizzes(this, this.conceptId);
      await Actions.loadViewConceptQuizzes(this, this.conceptId);
    }

    async privateToggled(e: any) {
      const value: QuizVisibility = e.target.checked ? 'private' : 'public';
      // TODO: We don't want to update the question privacy. This should change eventually.
      await this.applySettings('visibility', value, 'Privacy', false);
    }

    determineVisibility(visibility: QuizVisibility): boolean {
      return visibility === 'private';
    }
    async applySettings(settingName: string, value: number | boolean | QuizVisibility, successMessageName: string, updateQuestionSetting: boolean) {
      try {
        await Actions.setQuizQuestionSetting(this, this.quizId, settingName, value);
        if(updateQuestionSetting) {
          this.quizQuestionIds.forEach((questionId) => {
              Actions.setQuestionSetting(this, this.quizId, questionId, settingName, value);
          });
        }

        if(successMessageName) {
          this.successMessage = '';
          this.successMessage = `${successMessageName} updated.`;
        }

      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }

    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;
        this.quizQuestionSettings = state.quizQuestionSettings;
        this.userQuestionIds = state.userQuestionIds;
        this.publicQuestionIds = state.publicQuestionIds;
        this.quizQuestionIds = state.quizQuestionIds;
        this.collaboratorEmails = state.collaboratorEmails;
        this.uid = state.uid;
    }
}

Polymer(PrendusQuizEditor);
