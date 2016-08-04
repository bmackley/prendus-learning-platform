import {UserAnswerInfo} from '../../../../node_modules/prendus-services/interfaces/user-answer-info.interface.ts'; //TODO set the path back correctly!!!
import {QuestionInfo} from '../../../../node_modules/prendus-services/interfaces/question-info.interface.ts'; //TODO set the path back correctly!!!
import {CheckAnswerXAPIInfo} from '../../../../node_modules/prendus-services/interfaces/check-answer-xapi-info.interface.ts';
import {Answer} from '../../../../node_modules/prendus-services/interfaces/answer.type.ts';
import {UtilitiesService} from '../../../../node_modules/prendus-services/services/utilities.service.ts';

(function() {
    interface CheckAnswerAjax {
        body: {
            questionSessionId: string,
            quizSessionId: string,
            jwt: string,
            userAnswerInfo: UserAnswerInfo,
            checkAnswerXAPIInfo: CheckAnswerXAPIInfo
        },
        generateRequest: Function
    }

    class ViewProblemComponent {
        public is: string;
        public properties: any;
        public hideRenderMath: boolean;
        public problemText: string;
        public problemCode: string;
        public userInputs: string[];
        public userCheckboxes: string[];
        public userRadios: string[];
        public problemUid: string;
        public currentUser: any; //TODO once we get Firebase 3.0 typings, change this
        public hint: string;
        public answer: Answer;
        public quizSessionId: string;
        public questionId: string;
        public questionSessionId: string;
        public answerReturnInfo: string;
        public confidenceLevel: 'just guessing' | 'pretty sure' | 'very sure' | '' = '';
        public showConfidenceLevel: boolean;
        public toastMessage: string | number;
        public jwt: string;
        public concise: boolean;
        public userFullName: string;
        public userEmail: string;
        public courseId: string;
        public baseUri: string;
        public fullUrl: string;
        public $: {
            getProblemAjax: any,
            checkAnswerAjax: any,
            toast: any
        };
        public $$: any;
        public observers: string[];
        public fire: any;
        public showCheckAnswer: boolean;

        beforeRegister(): void {
            this.is = 'solutia-maxima-view-problem';
            this.properties = {
                questionId: {
                    type: String
                },
                quizSessionId: {
                    type: String
                },
                jwt: {
                    type: String
                },
                concise: {
                    type: Boolean,
                    value: false
                },
                userFullName: {
                    type: String,
                    value: ''
                },
                userEmail: {
                    type: String,
                    value: ''
                },
                courseId: {
                    type: String,
                    value: ''
                }
            };
            this.observers = [
                'loadNextProblem(questionId, quizSessionId, jwt)'
            ];
        }

        async ready(): Promise<void> {
            this.$.toast.fitInto = this;
        }

        async checkAnswer(): Promise<void> {
            const answerInputValue: string = this.$$('#answerInput').value|| '';
            const userInputsAnswers: { [inputName: string]: string } = getUserInputsAnswers(this, this.userInputs);
            const userCheckboxesAnswers: { [checkboxName: string]: boolean } = getUserCheckboxesAnswers(this, this.userCheckboxes);
            const userRadiosAnswers: { [radioName: string]: boolean } = getUserRadiosAnswers(this, this.userRadios);
            const userAnswerInfo =  {
                answerInputValue,
                userInputsAnswers,
                userCheckboxesAnswers,
                userRadiosAnswers,
                confidenceLevel: this.confidenceLevel
            };
            const checkAnswerXAPIInfo = {
                transformedText: this.problemText,
                userFullName: this.userFullName,
                userEmail: this.userEmail,
                courseId: this.courseId,
                baseUri: window.location.origin,
                fullUrl: window.location.origin + window.location.pathname
            };
            const checkAnswerAjax: CheckAnswerAjax = prepareForRequest(this.$.checkAnswerAjax, this.questionSessionId, this.quizSessionId, this.jwt, userAnswerInfo, checkAnswerXAPIInfo);
            await makeRequest(this, checkAnswerAjax);
        }

        async loadNextProblem(): Promise<void> {
            if (this.questionId && this.quizSessionId && this.jwt) {
                const answerInput = this.$$('#answerInput');
                clearAnswerInput(answerInput);
                this.confidenceLevel = '';
                const questionInfo = await getQuestionInfo(this);
                setQuestionInfo(this, questionInfo);
                attachCheckboxEventListeners(this, this.userCheckboxes, this.questionSessionId);
                attachRadioEventListeners(this, this.userRadios, this.questionSessionId);
                attachMultipleInputEventListeners(this, this.userInputs, this.questionSessionId);
            }

            function setQuestionInfo(context: ViewProblemComponent, questionInfo: QuestionInfo) {
                context.questionSessionId = questionInfo.questionSessionId;
                context.problemText = questionInfo.transformedText;
                context.problemUid = questionInfo.uid;
                context.userInputs = questionInfo.userInputs;
                context.userCheckboxes = questionInfo.userCheckboxes;
                context.userRadios = questionInfo.userRadios;
                context.hint = questionInfo.hint;
                context.answer = questionInfo.answer;
                context.showConfidenceLevel = questionInfo.showConfidenceLevel;
                context.showCheckAnswer = questionInfo.showCheckAnswer;
                context.showQuestionGenerationButtons = questionInfo.showQuestionGenerationButtons;
            }

            async function getQuestionInfo(context: ViewProblemComponent): Promise<QuestionInfo> {
                const request = context.$.getProblemAjax.generateRequest();
                try {
                    await request.completes;

                    const questionInfo: QuestionInfo = request.response.questionInfo;

                    return questionInfo;
                }
                catch(error) {
                    if (request.parseResponse()) {
                        context.toastMessage = request.parseResponse().errorMessage;
                    }
                    else {
                        context.toastMessage = error.errorMessage || error.toString();
                    }

                    context.$.toast.open();
                }
            }

            function clearAnswerInput(answerInput: any): void {
                answerInput && (answerInput.value = '');
            }

            function attachMultipleInputEventListeners(context: ViewProblemComponent, userInputs: string[], questionSessionId: string) {
                userInputs.forEach((element) => {
                    const inputElement = document.getElementById(element + questionSessionId);
                    inputElement.addEventListener('input', (e) => {
                        context.debounce('multipleinputtyped', () => {
                            context.fire('multipleinputtyped', {
                                questionId: context.questionId,
                                inputName: element,
                                inputTyped: inputElement.innerHTML
                            }, {
                                bubbles: false
                            });
                        }, 2000);
                    });
                });
            }

            function attachRadioEventListeners(context: ViewProblemComponent, userRadios: string[], questionSessionId: string) {
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

            function attachCheckboxEventListeners(context: ViewProblemComponent, userCheckboxes: string[], questionSessionId: string) {
                userCheckboxes.forEach((element) => {
                    const checkboxElement = document.getElementById(element + questionSessionId);
                    checkboxElement.addEventListener('change', (e) => {
                        context.fire('checkboxchanged', {
                            questionId: context.questionId,
                            checkboxName: element,
                            checked: checkboxElement.checked
                        }, {
                            bubbles: false
                        });
                    });
                });
            }
        }

        checkboxChanged(e) {
            console.log(e);
        }

        answerTyped() {
            this.debounce('answertyped', () => {
                this.fire('answertyped', {
                    questionId: this.questionId,
                    answerTyped: this.querySelector('#answerInput').value
                }, {
                    bubbles: false
                });
            }, 2000);
        }

        showHint(): void {
            this.fire('showhint', {
                questionId: this.questionId,
                hint: this.hint
            }, {
                bubbles: false
            });

            this.toastMessage = this.hint;
            this.$.toast.open();
        }

        showAnswer(): void {
            this.fire('showanswer', {
                questionId: this.questionId
            }, {
                bubbles: false
            });

            this.toastMessage = UtilitiesService.getAnswerString(this.answer, this.userInputs, this.userCheckboxes, this.userRadios, this.questionSessionId);
            this.$.toast.open();
        }

        showWorkedSolution(): void {
            this.fire('showworkedsolution', {
                questionId: this.questionId
            }, {
                bubbles: false
            });

            //this.toastMessage = this.workedSolution;
            this.toastMessage = 'This will be the worked solution.';
            this.$.toast.open();
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

    Polymer(ViewProblemComponent);

    function getUserInputsAnswers(context: ViewProblemComponent, userInputs: string[]): { [inputName: string]: string } {
        return userInputs.reduce((prev: { [inputName: string]: string }, curr: string) => {
            const userInputElement = document.getElementById(curr + context.questionSessionId);
            const userAnswer: string = userInputElement.textContent;

            prev[curr] = userAnswer;

            return prev;
        }, {});
    }

    function getUserCheckboxesAnswers(context: ViewProblemComponent, userCheckboxes: string[]): { [checkboxName: string]: boolean } {
        return userCheckboxes.reduce((prev: { [checkboxName: string]: boolean }, curr: string) => {
            const userCheckboxElement: HTMLInputElement = <HTMLInputElement> document.getElementById(curr + context.questionSessionId);
            const userAnswer: boolean = userCheckboxElement.checked;

            prev[curr] = userAnswer;

            return prev;
        }, {});
    }

    function getUserRadiosAnswers(context: ViewProblemComponent, userRadios: string[]): { [radioName: string]: boolean } {
        return userRadios.reduce((prev: { [radioName: string]: boolean }, curr: string) => {
            const userRadioElement: HTMLInputElement = <HTMLInputElement> document.getElementById(curr + context.questionSessionId);
            const userAnswer = userRadioElement.checked;

            prev[curr] = userAnswer;

            return prev;
        }, {});
    }

    function prepareForRequest(checkAnswerAjax: CheckAnswerAjax, questionSessionId: string, quizSessionId: string, jwt: string, userAnswerInfo: UserAnswerInfo, checkAnswerXAPIInfo: CheckAnswerXAPIInfo): CheckAnswerAjax {
        checkAnswerAjax.body = {
            questionSessionId: questionSessionId,
            quizSessionId: quizSessionId,
            jwt,
            userAnswerInfo,
            checkAnswerXAPIInfo
        };

        return checkAnswerAjax;
    }

    async function makeRequest(context: ViewProblemComponent, checkAnswerAjax: CheckAnswerAjax): Promise<void> {
        const request = checkAnswerAjax.generateRequest();
        try {
            await request.completes;

            if (request.response.answerReturnInfo === 'Maximum number of attempts reached') {
                context.$.toast.open();
            }

            if (request.response.answerReturnInfo !== 'No answer feedback allowed') {
                context.toastMessage = request.response.answerReturnInfo;
                context.$.toast.open();
            }
        }
        catch(error) {
            if (request.parseResponse()) {
                context.toastMessage = request.parseResponse().errorMessage;
            }
            else {
                context.toastMessage = error.errorMessage || error.toString();
            }

            context.$.toast.open();
        }
    }
})();
