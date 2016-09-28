import {Question} from '../../node_modules/prendus-services/interfaces/question.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities.service.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {QuestionSettings} from '../../node_modules/prendus-services/interfaces/question-settings.interface.ts';

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
    public quizSettings: QuestionSettings;
    public title: string;
    public selected: number;
    public collaboratorEmails: string[];

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
        this.title = '';
        this.selected = 0;
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
            const quiz = await Actions.getQuiz(this.quizId);
            this.title = quiz.title;
            this.loadQuizQuestionIds();
            Actions.loadQuizSettings(this, this.quizId);
        }
    }

    async loadPublicQuestionIds() {
        const getPublicQuestionIdsAjax = this.querySelector('#getPublicQuestionIdsAjax');
        await Actions.loadPublicQuestionIds(this, getPublicQuestionIdsAjax);
    }

    async loadUserQuestionIds() {
        const getUserQuestionIdsAjax = this.querySelector('#getUserQuestionIdsAjax');
        await Actions.loadUserQuestionIds(this, getUserQuestionIdsAjax);
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

    shareQuizClick() {
        this.querySelector('#shareQuizDialog').open();
    }

    createQuestion(e) {
        Actions.showMainSpinner(this);

        window.history.pushState({}, '', `courses/edit-question/question/create`);
        this.fire('location-changed', {}, {node: window});
    }

    editQuestion(e) {
        Actions.showMainSpinner(this);

        const questionId = e.model.item;

        window.history.pushState({}, '', `courses/edit-question/question/${questionId}/${this.conceptId}/${this.quizId}`); //TODO Why are we passing the conceptId and the quizId?
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
        await Actions.loadEditConceptQuizzes(this, this.conceptId);
        await Actions.loadViewConceptQuizzes(this, this.conceptId);
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
        this.publicQuestionIds = state.publicQuestionIds;
        this.quizQuestionIds = state.quizQuestionIds;
        this.collaboratorEmails = state.collaboratorEmails;
    }
}

Polymer(PrendusQuizEditor);
