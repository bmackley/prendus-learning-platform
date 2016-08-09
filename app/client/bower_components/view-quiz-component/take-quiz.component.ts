import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities.service.ts';
import {Actions} from './redux/actions.ts';
import {XAPIService} from '../../node_modules/prendus-services/services/xapi.service.ts';
import {XAPIQuizEventInfo} from '../../node_modules/prendus-services/interfaces/xapi-quiz-event-info.interface.ts';
import {XAPIExtensions} from '../../node_modules/prendus-services/interfaces/xapi-extensions.interface.ts';

class TakeQuizComponent {
    public is: string;
    public properties: any;
    public observers: string[];
    public quizId: string;
    public jwt: string;
    public quizSessionId: string;
    public quizSessionIdMutable: string;
    public questions: Question[];
    public endpointDomain: string;
    public $: {
        startQuizSessionAjax: any,
        endQuizSessionAjax: any
    };
    public endpointUrl: string;
    public courseId: string;
    public userFullName: string;
    public userEmail: string;
    public hintShowed: () => void;
    public answerShowed: () => void;
    public workedSolutionShowed: () => void;
    public quizStarted: () => void;
    public answerTyped: () => void;

    beforeRegister() {
        this.is = 'prendus-take-quiz';
        this.properties = {
            quizId: {
                type: String
            },
            jwt: {
                type: String
            },
            quizSessionId: {
                type: String
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
        this.observers = [
            'init(quizId, jwt, quizSessionId, courseId)'
        ];
    }

    async init() {
        //This destroys the init method so that we can perform any mutations to the properties this function is observing, without having this function called multiple times
        this.init = async function() {};
        this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
        this.endpointUrl = `${UtilitiesService.getPrendusServerEndpointDomain()}/api/xapi/quiz/sendstatement`;
        this.initXAPIListeners(this.courseId, this.quizId, this.userFullName, this.userEmail, this.endpointUrl);
        await Actions.clearQuestions(this);
        await Actions.loadQuizSession(this, this.$.startQuizSessionAjax, this.quizId, this.jwt, this.quizSessionId);
        this.quizStarted();
        await Actions.loadQuestions(this, this.quizId);
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

        this.multipleInputTyped = (e): void => {
            const verb = 'type_multiple_input';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId,
                [`${baseUri}/inputName`]: e.detail.inputName,
                [`${baseUri}/inputTyped`]: e.detail.inputTyped
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.checkboxChanged = (e): void => {
            const verb = 'change_checkbox';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId,
                [`${baseUri}/checkboxName`]: e.detail.checkboxName,
                [`${baseUri}/checked`]: e.detail.checked
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.radioSelected = (e): void => {
            const verb = 'select_radio';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId,
                [`${baseUri}/radioName`]: e.detail.radioName
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.quizStarted = (e): void => {
            const verb = 'started';
            const extensions = {};
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.hintShowed = (e): void => {
            const verb = 'show_hint';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.answerShowed = (e): void => {
            const verb = 'show_answer';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.workedSolutionShowed = (e): void => {
            const verb = 'show_worked_solution';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        this.answerTyped = (e): void => {
            const verb = 'type_answer';
            const extensions = {
                [`${baseUri}/questionId`]: e.detail.questionId,
                [`${baseUri}/answerTyped`]: e.detail.answerTyped
            };
            const eventInfo = getEventInfo(quizId, userFullName, userEmail, courseId, verb, extensions, baseUri, fullUrl);

            XAPIService.sendQuizStatement(endpointUrl, eventInfo);
        };

        document.addEventListener('visibilitychange', (e: Event) => {
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
        });

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
        this.questions = state.questions;
    }
}

Polymer(TakeQuizComponent);
