import {Question} from '../../node_modules/prendus-services/typings/question';
import {QuestionVisibility} from '../../node_modules/prendus-services/typings/question-visibility';
import {QuestionMetaData} from '../../node_modules/prendus-services/typings/question-meta-data';
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
		public querySelector: any;
		public fire: any;
		public properties: any;
		public observers: string[];
		public data: any;
		public hasEditAccess: boolean;
		public quizLoaded: boolean;
		public newQuiz: boolean;
		public uid: string;
		public quizId: string;
		public lessonId: string;
		public courseId: string;
    public userQuestionIds: string[];
    public publicQuestionIds: string[];
		public quizQuestionsData: QuestionMetaData[];
		public quizSession: QuizSession;
		public quizQuestionSettings: QuestionSettings;
    public jwt: string;
    public title: string;
    public editingTitle: boolean;
    public selected: number;
		public endpointDomain: string;
		public successMessage: string;
		public errorMessage: string;
		public errorLink: string;
		public errorText: string;
		public errorLinkText: string;

    beforeRegister(): void {
        this.is = 'prendus-quiz-editor';
        this.properties = {
					editingTitle: {
		        type: Boolean,
		        value: false
		      },
					selected: {
						type: Number,
						value: 0
					}
        };
				this.observers = [
					'setEditorProperties(data.courseId, data.lessonId, data.quizId, route.*)',
					'setQuizData(quizId)'
				]
    }

    async init(quizId: string): Promise<any> {
				const initData: any = {};
        this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
				const user = await FirebaseService.getLoggedInUser();
				if(!user) {
					this.errorLink = '/login';
					this.errorText = 'Please';
					this.errorLinkText = 'log in';
					throw 'Not logged in';
				}
				const quiz: Quiz = await Actions.getQuiz(quizId);
				if(!quiz) {
					this.errorLink = '/';
					this.errorText = 'This quiz may have been removed or never existed in the first place.  Try starting from the';
					this.errorLinkText = 'home page';
					throw 'Quiz does not exist';
				}
				initData.title = quiz.title;
				initData.hasEditAccess = quiz.uid === this.uid;
				if(!initData.hasEditAccess) {
					this.errorText = 'You don\'t have edit access to this quiz.  Try asking the owner for access.';
					throw 'Doesn\'t own quiz';
				}
				this.jwt = await user.getToken();

				//TODO this is horrible and should be removed once the view problem component can be initialized without a quiz session being handed to it
				const startQuizSessionAjax = this.querySelector('#startQuizSessionAjax');
				startQuizSessionAjax.body = {
					quizId: 'NO_QUIZ',
					jwt: this.jwt
				};
				const request = startQuizSessionAjax.generateRequest();
				await request.completes;
				this.quizSession = request.response.quizSession;
				//TODO this is horrible and should be removed once the view problem component can be initialized without a quiz session being handed to it

				return initData;
    }

		async setEditorProperties(courseId: string, lessonId: string, quizId: string, route: any): Promise<void> {
			this.courseId = courseId;
			this.lessonId = lessonId;
			this.quizId = quizId;

			const titleDialog = this.querySelector('#title-quiz-dialog');

			// watch the route - if not navigating to a new quiz, close the dialog and return
			if(			route.path === 'route.path'
					&&	route.value.includes
					&&	route.value.includes('edit-quiz')
					&&	route.value.includes('create')) {
				this.quizLoaded = true;
				this.newQuiz = true;
				this.title = '';
				this.querySelector('#new-quiz-input').invalid = false;
				// delay opening the modal so it gets centered
				setTimeout(() => {
					titleDialog.open();
				}, 0);
			} else {
				titleDialog.close();
			}
		}

		async setQuizData(quizId: string): Promise<void> {
			if(quizId === 'create') return;

			this.newQuiz = false;
			Actions.showMainSpinner(this);

			try {
				const initData: any = await this.init(quizId);
				this.title = initData.title;
				this.hasEditAccess = initData.hasEditAccess;

				this.quizLoaded = true;

				await Promise.all([
					Actions.loadQuizQuestionSettings(this, quizId),
					this.loadQuizQuestionsData(),
					this.loadUserQuestionIds(),
					this.loadPublicQuestionIds(),
					this.manuallyReloadQuestions()
				])
			} catch(error) {
				this.quizLoaded = false;
				console.error(error);
			}

			Actions.hideMainSpinner(this);
    }

		showBlank(quizLoaded: boolean, newQuiz: boolean) {
			return !quizLoaded || newQuiz;
		}

		enableCreateQuizButton(title: string): boolean {
			return !!title.length;
		}

		createQuizOnEnter(e: any): void {
			if(e.keyCode === 13 && this.enableCreateQuizButton(this.title)) {
				this.createQuiz();
				this.querySelector('#title-quiz-dialog').close();
			}
		}

		async createQuiz(): Promise<void> {
			const quizId = await Actions.createNewQuiz(this, this.title, this.lessonId);
			// reload by watching data
			this.data = {
				...this.data,
				quizId
			}
			this.newQuiz = false;
			Actions.loadViewLessonQuizzes(this, this.lessonId);
		}

    async loadPublicQuestionIds(): Promise<void> {
        const getPublicQuestionIdsAjax = this.querySelector('#getPublicQuestionIdsAjax');
        await Actions.loadPublicQuestionIds(this, getPublicQuestionIdsAjax);
    }

    async loadUserQuestionIds(): Promise<void> {
        const getUserQuestionIdsAjax = this.querySelector('#getUserQuestionIdsAjax');
        await Actions.loadUserQuestionIds(this, getUserQuestionIdsAjax);
    }

    async loadQuizQuestionsData(): Promise<void> {
        await Actions.loadQuizQuestionsData(this, this.quizId);
    }

    async addQuestionToQuiz(e: any): Promise<void> {
        const questionId: string = e.model.item || e.model.question.questionId;
				e.newIndex = this.quizQuestionsData.length;
        await Actions.addQuestionToQuiz(this, this.quizId, questionId, this.quizQuestionsData.length);
        await this.loadQuizQuestionsData();
				this.sortQuizQuestions(e);
    }

    async removeQuestionFromQuiz(e: any): Promise<void> {
        const questionId: string = e.model.item || e.model.question.questionId;
        await Actions.removeQuestionFromQuiz(this, this.quizId, questionId);
        await this.loadQuizQuestionsData();
				e.newIndex = -1;
				this.sortQuizQuestions(e);
    }

		async sortQuizQuestions(e: any): Promise<void> {
			if(typeof e.newIndex !== 'undefined') {
				const sortedQuizQuestionsData: QuestionMetaData[] = this.quizQuestionsData.map((value, index, array) => {
					return {
						...value,
						position: index
					}
				})
				await Actions.setQuizQuestionsData(this.quizId, sortedQuizQuestionsData);
			}
		}

    displayDate(date: string): Date {
      // Return the current date if there is no course due date set yet.
      const returnDate: Date = date ? new Date(date) : new Date();
      return returnDate;
    }

    shareQuiz(): void {
        this.querySelector('#share-quiz-dialog').open();
    }

    selectText(e: any): void {
			if(e.target.select) e.target.select();
    }

    openCollaboratorsModal(e: any): void {
      this.querySelector('#collaborators-modal').open();
    }

    openSettingsModal(e: any): void {
      this.querySelector('#settings-modal').open();
    }

    showEmptyQuizQuestionsText(quizQuestionsData: string[]): boolean {
        return !quizQuestionsData || quizQuestionsData.length === 0;
    }

    async manuallyReloadQuestions(): Promise<void> {
        // TODO optimize this code
        await this.loadUserQuestionIds();
        await this.loadPublicQuestionIds();
        await this.loadQuizQuestionsData();

        this.userQuestionIds.forEach((questionId) => {
            const viewQuestionElement = this.querySelector(`#user-question-id-${questionId}`);
            viewQuestionElement.loadNextProblem(true);
        });

        this.publicQuestionIds.forEach((questionId) => {
            const viewQuestionElement = this.querySelector(`#public-question-id-${questionId}`);
            viewQuestionElement.loadNextProblem(true);
        });

        this.quizQuestionsData.forEach((question) => {
            const viewQuestionElement = this.querySelector(`#quiz-question-id-${question.questionId}`);
            viewQuestionElement.loadNextProblem(true);
        });
    }

    async answerFeedbackToggled(e: any): Promise<void> {
        const checked: boolean = e.target.checked;
        await this.applySettings('answerFeedback', checked, 'Answer feedback', true);
    }

    async showAnswerToggled(e: any): Promise<void> {
        const checked: boolean = e.target.checked;
        await this.applySettings('showAnswer', checked, 'Show answer', true);
    }

    async showHintToggled(e: any): Promise<void> {
        const checked: boolean = e.target.checked;
        await this.applySettings('showHint', checked, 'Show hint', true);
    }

    async showCodeToggled(e: any): Promise<void> {
        const checked: boolean = e.target.checked;
        await this.applySettings('showCode', checked, 'Show code', true);
    }

    async gradedToggled(e: any): Promise<void> {
        const checked: boolean = e.target.checked;
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

    async dueDateChanged(e: any): Promise<void> {
        const dueDate: Date = this.querySelector('#due-date').date;
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

    async showConfidenceLevelToggled(e: any): Promise<void> {
        const checked: boolean = e.target.checked;
        await this.applySettings('showConfidenceLevel', checked, 'Show confidence level', true);
    }

    async allowGenerationToggled(e: any): Promise<void> {
        const checked: boolean = e.target.checked;
        await this.applySettings('allowGeneration', checked, 'Allow generation', true);
    }

    async maxNumAttemptsChanged(e: any): Promise<void> {
        const value: number = Number(e.target.value);
        await this.applySettings('maxNumAttempts', value, 'Maximum number of attempts', true);
    }

		getEditIcon(editStatus: boolean): string {
			return editStatus ? 'check' : 'create';
		}

	  toggleEditTitle(e: any): void {
			if(this.querySelector('#edit-quiz-input').invalid) return;
	    this.editingTitle = !this.editingTitle;
			if(this.editingTitle) this.querySelector('#edit-quiz-input').focus();
	  }

    async changeTitle(e: any): Promise<void> {
			this.editingTitle = false;
      try {
        const value: string = e.target.value;
        await QuizModel.updateTitle(this.quizId, value);
        this.successMessage = '';
        this.successMessage = `${value} updated.`;
      } catch(error) {
        this.errorMessage = '';
        this.errorMessage = error.message;
      }
			// load these in the background so they're updated when the user returns to that page
      Actions.loadEditLessonQuizzes(this, this.lessonId);
      Actions.loadViewLessonQuizzes(this, this.lessonId);
    }

    async privateToggled(e: any): Promise<void> {
      const value: QuizVisibility = e.target.checked ? 'private' : 'public';
      // TODO: We don't want to update the question privacy. This should change eventually.
      await this.applySettings('visibility', value, 'Privacy', false);
    }

    determineVisibility(visibility: QuizVisibility): boolean {
      return visibility === 'private';
    }

    async applySettings(settingName: string, value: number | boolean | QuizVisibility, successMessageName: string, updateQuestionSetting: boolean): Promise<void> {
			const quizId: string = this.quizId;
      try {
        await Actions.setQuizQuestionSetting(this, quizId, settingName, value);
        if(updateQuestionSetting) {
          this.quizQuestionsData.forEach(async (question) => {
              await Actions.setQuestionSetting(this, quizId, question.questionId, settingName, value);
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

    mapStateToThis(e: StatechangeEvent): void {
        const state = e.detail.state;
				this.uid = state.currentUser.metaData.uid;
				this.userQuestionIds = state.userQuestionIds;
				this.publicQuestionIds = state.publicQuestionIds;
				this.quizQuestionsData = state.quizQuestionsData;
				// console.log(this.quizQuestionsData);
        this.quizQuestionSettings = state.quizQuestionSettings;
    }
}

Polymer(PrendusQuizEditor);
