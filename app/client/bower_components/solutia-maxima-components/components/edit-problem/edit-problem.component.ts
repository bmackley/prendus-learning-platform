import {Actions} from './redux/actions.ts';
import {RootReducer} from './redux/reducers.ts';
import {UtilitiesService} from '../../../../node_modules/prendus-services/services/utilities.service.ts';
import {State} from './interfaces/state.interface.ts';
import {Action} from './interfaces/action.interface.ts';
import {StatechangeEvent} from './interfaces/statechange-event.interface.ts';
import {Question} from '../../../../node_modules/prendus-services/interfaces/question.interface.ts';

export class EditProblemComponent {
    public is: string;
    public properties: any;
    public action: Action;
    public initialLoad: boolean;
    public endpointDomain: string;
    public questionId: string;
    public originalText: string;
    public originalCode: string;
    public previewQuestionId: string;
    public jwt: string;
    public toastMessage: string;
    public rootReducer: (state: State, action: Action) => State;
    public $: {
        toast: any,
        getQuestionAjax: any,
        previewFAB: any,
        textEditor: any,
        codeEditor: any,
        saveFAB: any,
        previewModal: any,
        viewPreviewQuestion: any
    };
    public observers: string[];

    private private: boolean;

    beforeRegister() {
        this.is = 'solutia-maxima-edit-problem';
        this.properties = {
            questionId: {
                type: String
            },
            jwt: {
                type: String
            }
        };
        this.observers = [
            'init(questionId, jwt)'
        ];
    }

    async ready(): Promise<void> {
        this.$.toast.fitInto = this;
        this.rootReducer = RootReducer;
        this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
    }

    async init(): Promise<void> {
        if (this.questionId && this.jwt) {
            if (!this.initialLoad) {
                try {
                    await Actions.initialLoadQuestion(this, this.questionId);
                }
                catch(error) {
                    this.toastMessage = error.errorMessage || error.toString();
                    this.$.toast.open();
                }
            }
        }
    }

    async saveQuestion(): Promise<any> {
        try {
            const text: string = this.$.textEditor.getText();
            const code: string = this.$.codeEditor.getText();

            await Actions.savePreviewQuestion(this, this.previewQuestionId, {
                id: this.previewQuestionId || null,
                uid: null,
                previewQuestionId: null,
                text,
                code,
                private: this.private || null
            });

            await Actions.saveQuestion(this, this.questionId, {
                id: this.questionId || null,
                uid: null,
                text,
                code,
                previewQuestionId: this.previewQuestionId || null,
                private: this.private || null
            });

            this.fire('savequestion', {}, {
                bubbles: false
            });
        }
        catch(error) {
            this.toastMessage = error.errorMessage || error.toString();
            this.$.toast.open();
        }
    }

    async previewQuestion(): Promise<any> {
        try {
            hideQuestionText(this);
            openModal(this);
            const text: string = this.$.textEditor.getText();
            const code: string = this.$.codeEditor.getText();
            await saveQuestionIfNotSaved(this, this.questionId, {
                id: this.questionId || null,
                uid: null,
                text,
                code,
                previewQuestionId: this.previewQuestionId || null,
                private: this.private || null
            });
            await Actions.savePreviewQuestion(this, this.previewQuestionId, {
                id: this.previewQuestionId || null,
                uid: null,
                previewQuestionId: null,
                text,
                code,
                private: this.private || null
            });
            await this.$.viewPreviewQuestion.loadNextProblem();
            showQuestionText(this);
            positionModalCorrectly(this);
        }
        catch(error) {
            this.toastMessage = error.errorMessage || error.toString();
            this.$.toast.open();
        }

        function hideQuestionText(context: EditProblemComponent) {
            context.$.viewPreviewQuestion.hideRenderMath = true;
        }

        function openModal(context: EditProblemComponent) {
            context.$.previewModal.open();
        }

        async function saveQuestionIfNotSaved(context: EditProblemComponent, questionId: string, question: Question) {
            if (!questionId) {
                try {
                    await Actions.saveQuestion(context, questionId, question);
                }
                catch(error) {
                    throw error;
                }
            }
        }

        function showQuestionText(context: EditProblemComponent) {
            context.$.viewPreviewQuestion.hideRenderMath = false;
        }

        function positionModalCorrectly(context: EditProblemComponent) {
            context.$.previewModal.refit();
        }
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.initialLoad = state.initialLoad;
        this.private = state.private;
        this.questionId = state.questionId;
        this.previewQuestionId = state.previewQuestionId;
    }
}

Polymer(EditProblemComponent);
