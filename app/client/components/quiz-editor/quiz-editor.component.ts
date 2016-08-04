import {Question} from '../../node_modules/prendus-services/interfaces/question.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities.service.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {QuestionSettings} from '../../node_modules/prendus-services/interfaces/question-settings.interface.ts';

class QuizEditorComponent {
    public is: string;
    public userQuestionIds: string[];
    public conceptId: string;
    public endpointDomain: string;
    public jwt: string;
    public properties: any;
    public observers: string[];
    public quizId: string;
    public quizQuestionIds: string[];
    public showSettings: boolean;
    public quizSettings: QuestionSettings;
    public title: string;

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
            }
        };
    }

    async init() {
        this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
        const user = await FirebaseService.getLoggedInUser();
        this.jwt = await user.getToken();
    }

    async conceptIdSet() {
        if (this.conceptId) {
            await this.init();
            await this.loadUserQuestionIds();
        }
    }

    async quizIdSet() {
        if (this.quizId) {
            await this.init();
            const quiz = await Actions.getQuiz(this.quizId);
            this.title = quiz.title;
            await this.loadQuizQuestionIds();
            await Actions.loadQuizSettings(this, this.quizId);
        }
    }

    async loadUserQuestionIds() {
        const getQuestionIdsAjax = this.querySelector('#getQuestionIdsAjax');
        await Actions.loadUserQuestionIds(this, getQuestionIdsAjax);
    }

    async loadQuizQuestionIds() {
        await Actions.loadQuizQuestionIds(this, this.quizId);
    }

    async addQuestionToQuiz(e) {
        const questionId = e.model.item;
        await Actions.addQuestionToQuiz(this, this.quizId, questionId);
        await this.loadQuizQuestionIds();
    }

    async removeQuestionFromQuiz(e) {
        const questionId = e.model.item;
        await Actions.removeQuestionFromQuiz(this, this.quizId, questionId);
        await this.loadQuizQuestionIds();
    }

    createQuestion(e) {
        Actions.setCurrentEditQuestionId(this, null);
        this.fire('createquestion', {}, {
            bubbles: false
        });
    }

    editQuestion(e) {
        const questionId = e.model.item;
        Actions.setCurrentEditQuestionId(this, questionId);
        this.fire('editquestion', {}, {
            bubbles: false
        });
    }

    manuallyReloadQuestions() {
        Array.from(this.querySelector('#myQuestionsDomRepeatContainer').children).forEach((element) => {
            element.loadNextProblem && element.loadNextProblem();
        });

        Array.from(this.querySelector('#quizDomRepeatContainer').children).forEach((element) => {
            element.loadNextProblem && element.loadNextProblem();
        });
    }

    showSettingsMenu() {
        this.showSettings = !this.showSettings;
    }

    async answerFeedbackToggled(e) {
        const checked = e.target.checked;
        await this.applySettings('answerFeedback', checked);
    }

    async showAnswerToggled(e) {
        const checked = e.target.checked;
        await this.applySettings('showAnswer', checked);
    }

    async showHintToggled(e) {
        const checked = e.target.checked;
        await this.applySettings('showHint', checked);
    }

    async showCodeToggled(e) {
        const checked = e.target.checked;
        await this.applySettings('showCode', checked);
    }

    async gradedToggled(e) {
        const checked = e.target.checked;
        await this.applySettings('graded', checked);
    }

    async showConfidenceLevelToggled(e) {
        const checked = e.target.checked;
        await this.applySettings('showConfidenceLevel', checked);
    }

    async allowGenerationToggled(e) {
        const checked = e.target.checked;
        await this.applySettings('allowGeneration', checked);
    }

    async maxNumAttemptsChanged(e) {
        const value = e.target.value;
        await this.applySettings('maxNumAttempts', value);
    }

    async titleChanged(e) {
        const value = e.target.value;
        await Actions.updateQuizTitle(this.quizId, value);
    }

    async applySettings(settingName: string, value: number | boolean) {
        await Actions.setQuizSetting(this, this.quizId, settingName, value);
        this.quizQuestionIds.forEach((questionId) => {
            Actions.setQuestionSetting(this, this.quizId, questionId, settingName, value);
        });
    }

    mapStateToThis(e) {
        const state = e.detail.state;

        this.quizSettings = state.quizSettings;
        this.userQuestionIds = state.userQuestionIds;
        this.quizQuestionIds = state.quizQuestionIds;
    }
}

Polymer(QuizEditorComponent);
