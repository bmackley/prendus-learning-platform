import {FirebaseService} from '../../../node_modules/prendus-services/services/firebase.service.ts';
import {UtilitiesService} from '../../../node_modules/prendus-services/services/utilities.service.ts';
import {QuizResults} from '../../../node_modules/prendus-services/interfaces/quiz-results.interface.ts';

const loadQuizSession = async (context: ViewQuizComponent, startQuizSessionAjax, quizId: string, jwt: string, theQuizSessionId: string) => {
    try {
        const quizSessionId = await getQuizSessionId(startQuizSessionAjax, quizId, jwt, theQuizSessionId);

        context.action = {
            type: 'LOAD_QUIZ_SESSION',
            quizSessionId
        };
    }
    catch(error) {
        throw error;
    }

    async function getQuizSessionId(startQuizSessionAjax, quizId, jwt, theQuizSessionId) {
        if (theQuizSessionId === 'NOT_LTI_QUIZ_SESSION_ID') {
            startQuizSessionAjax.body = {
                quizId,
                jwt,
                quizSessionId: theQuizSessionId
            };

            const request = startQuizSessionAjax.generateRequest();
            await request.completes;

            const quizSessionId = request.response.quizSessionId;

            return quizSessionId;
        }
        else {
            return theQuizSessionId;
        }
    }
};

const endQuizSession = async (context: any, endQuizSessionAjax: any, quizSessionId: string, jwt: string) => {
    endQuizSessionAjax.body = {
        jwt,
        quizSessionId
    };

    const request = endQuizSessionAjax.generateRequest();
    await request.completes;

    const quizResults: QuizResults = request.response.quizResults;

    const preparedResults = Object.keys(quizResults.questionGrades).reduce((prev, curr) => {
        prev[curr] = {
            correct: quizResults.questionGrades[curr].correct ? 'correct' : 'incorrect',
            yourAnswer: UtilitiesService.getUserAnswerString(quizResults.questionGrades[curr].userAnswerInfo.answerInputValue, Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userInputsAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userCheckboxesAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userRadiosAnswers), quizResults.questionGrades[curr].questionSessionId),
            correctAnswer: UtilitiesService.getAnswerString(quizResults.questionGrades[curr].answer, Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userInputsAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userCheckboxesAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userRadiosAnswers), quizResults.questionGrades[curr].questionSessionId)
        };

        return prev;
    }, {});

    const answerDetails = Object.keys(preparedResults).map((key) => {
        return preparedResults[key];
    });

    context.action = {
        type: 'END_QUIZ_SESSION',
        finalGrade: quizResults.finalGrade,
        answerDetails
    };
};

const clearQuestions = (context: ViewQuizComponent) => {
    context.action = {
        type: 'CLEAR_QUESTIONS'
    };
};

const loadQuestions = async (context: ViewQuizComponent, quizId: string) => {
    try {
        const quiz:Quiz = await FirebaseService.get(`quizzes/${quizId}`);

        const questionsObject = quiz.questions;
        const questionsArray = Object.keys(questionsObject || {}).map((key) => {
            return Object.assign({}, questionsObject[key], {
                id: key
            });
        });

        context.action = {
            type: 'LOAD_QUESTIONS',
            questions: questionsArray
        };
    }
    catch(error) {
        throw error;
    }
};

export const Actions = {
    loadQuizSession,
    loadQuestions,
    endQuizSession,
    clearQuestions
};
