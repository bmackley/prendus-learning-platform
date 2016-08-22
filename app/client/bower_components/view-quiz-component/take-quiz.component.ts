import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities.service.ts';
import {Actions} from './redux/actions.ts';
import {XAPIService} from '../../node_modules/prendus-services/services/xapi.service.ts';
import {XAPIQuizEventInfo} from '../../node_modules/prendus-services/interfaces/xapi-quiz-event-info.interface.ts';
import {XAPIExtensions} from '../../node_modules/prendus-services/interfaces/xapi-extensions.interface.ts';
import {StatechangeEvent} from './interfaces/statechange-event.ts';

class TakeQuizComponent {
    public is: string;
    public properties: any;
    public observers: string[];
    public quizId: string;
    public jwt: string;
    public quizSessionId: string;
    public quizSessionIdMutable: string;
    public questionIds: string[];
    public endpointDomain: string;
    public $: {
        startQuizSessionAjax: any,
        endQuizSessionAjax: any
    };
    public endpointUrl: string;
    public courseId: string;
    public userFullName: string;
    public userEmail: string;
    public hintShowed: (e: any) => void;
    public answerShowed: (e: any) => void;
    public workedSolutionShowed: (e: any) => void;
    public quizStarted: (e: any) => void;
    public answerTyped: (e: any) => void;
    public querySelector: any;
    public multipleInputTyped: (e:any) => void;
    public checkboxChanged: (e: any) => void;
    public radioSelected: (e: any) => void;
    public visibilityChanged: (e: any) => void;
    public componentInitialized: boolean;

    beforeRegister() {
        this.is = 'prendus-take-quiz';
        this.properties = {
            quizId: {
                type: String,
                observer: 'init'
            },
            jwt: {
                type: String,
                observer: 'init'
            },
            quizSessionId: {
                type: String,
                observer: 'init'
            },
            userFullName: {
                type: String
            },
            userEmail: {
                type: String
            },
            courseId: {
                type: String
            }
        };
    }

    async init() {
        this.componentInitialized = false;

        if (this.quizId && this.jwt && this.quizSessionId) {
            this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
            this.endpointUrl = `${this.endpointDomain}/api/xapi/quiz/sendstatement`;
            this.initXAPIListeners(this.courseId, this.quizId, this.userFullName, this.userEmail, this.endpointUrl);
            await Actions.clearQuestions(this);
            await Actions.loadQuizSession(this, this.$.startQuizSessionAjax, this.quizId, this.jwt, this.quizSessionId);
            this.quizStarted(null);
            await Actions.loadQuestionIds(this, this.quizId);
            this.componentInitialized = true;
        }
    }

    async submitClicked() {
        for (let i=0; i < this.questions.length; i++) {
            await this.querySelector(`#${this.questions[i].id}`).checkAnswer();
        }

        await Actions.endQuizSession(this, this.$.endQuizSessionAjax, this.quizSessionIdMutable, this.jwt);
    }

    initXAPIListeners(courseId: string, quizId: string, userFullName: string, userEmail: string, endpointUrl: string) {

        const baseUri = window.location.origin;
        const fullUrl = baseUri + window.location.pathname;

        this.multipleInputTyped = (e: any): void => {
            const verb = 'type_multiple_input';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId,
                [`${baseUri}/inputName`]: e.detail.inputName,
                [`${baseUri}/inputTyped`]: e.detail.inputTyped
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.checkboxChanged = (e: any): void => {
            const verb = 'change_checkbox';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId,
                [`${baseUri}/checkboxName`]: e.detail.checkboxName,
                [`${baseUri}/checked`]: e.detail.checked
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.radioSelected = (e: any): void => {
            const verb = 'select_radio';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId,
                [`${baseUri}/radioName`]: e.detail.radioName
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.quizStarted = (e: any): void => {
            const verb = 'started';
            const extensions = {};
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.hintShowed = (e: any): void => {
            const verb = 'show_hint';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.answerShowed = (e: any): void => {
            const verb = 'show_answer';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.workedSolutionShowed = (e: any): void => {
            const verb = 'show_worked_solution';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.answerTyped = (e: any): void => {
            const verb = 'type_answer';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId,
                [`${baseUri}/answerTyped`]: e.detail.answerTyped
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        if (this.visibilityChanged) {
            document.removeEventListener('visibilitychange', this.visibilityChanged);
        }

        this.visibilityChanged = (e: any) => {
            const verb = getVerb();
            const extensions = {};
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);

            function getVerb(): string {
                if (document.visibilityState === 'visible') {
                    return 'resumed';
                }
                else {
                    return 'suspended';
                }
            }
        };

        document.addEventListener('visibilitychange', this.visibilityChanged);

        function getEventInfo(quizId: string, userFullName: string, userEmail: string, courseId: string, verb: string, extensions: XAPIExtensions, baseUri: string, fullUrl: string): XAPIQuizEventInfo {
            return {
                quizId,
                verb,
                extensions,
                userFullName,
                userEmail,
                courseId,
                baseUri,
                fullUrl,
                timestamp: new Date()
            };
        }
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.quizSessionIdMutable = state.quizSessionId;
        this.questionIds = state.questionIds;
    }
}

Polymer(TakeQuizComponent);
