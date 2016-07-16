import {Question} from '../../node_modules/prendus-services/interfaces/question.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities.service.ts';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';

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
            const getQuestionIdsAjax = this.querySelector('#getQuestionIdsAjax');
            await Actions.loadUserQuestionIds(this, getQuestionIdsAjax);
        }
    }

    async quizIdSet() {
        if (this.quizId) {
            await this.init();
            await Actions.loadQuizQuestionIds(this, this.quizId);
        }
    }

    async addQuestionToQuiz(e) {
        const questionId = e.model.item;
        await Actions.addQuestionToQuiz(this, this.quizId, questionId);
        await Actions.loadQuizQuestionIds(this, this.quizId);
    }

    async removeQuestionFromQuiz(e) {
        const questionId = e.model.item;
        await Actions.removeQuestionFromQuiz(this, this.quizId, questionId);
        await Actions.loadQuizQuestionIds(this, this.quizId);
    }

    mapStateToThis(e) {
        const state = e.detail.state;

        this.userQuestionIds = state.userQuestionIds;
        this.quizQuestionIds = state.quizQuestionIds;
    }
}

Polymer(QuizEditorComponent);
