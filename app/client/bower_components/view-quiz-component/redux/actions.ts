import {FirebaseService} from '../../../node_modules/prendus-services/services/firebase.service.ts';
import {UtilitiesService} from '../../../node_modules/prendus-services/services/utilities.service.ts';
import {QuizResults} from '../../../node_modules/prendus-services/interfaces/quiz-results.interface.ts';
import {QuizModel} from '../../../node_modules/prendus-services/models/quiz.model.ts';

const loadQuizSession = async (context: any, startQuizSessionAjax: any, quizId: string, jwt: string, theQuizSessionId: string) => {
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

    async function getQuizSessionId(startQuizSessionAjax: any, quizId: string, jwt: string, theQuizSessionId: string) {
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

    const preparedResults = Object.keys(quizResults.questionGrades || {}).reduce((prev, curr) => {
        prev[curr] = {
            correct: quizResults.questionGrades[curr].correct ? 'correct' : 'incorrect',
            yourAnswer: UtilitiesService.getUserAnswerString(quizResults.questionGrades[curr].userAnswerInfo.answerInputValue, Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userInputsAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userCheckboxesAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userRadiosAnswers), quizResults.questionGrades[curr].questionSessionId),
            correctAnswer: UtilitiesService.getAnswerString(quizResults.questionGrades[curr].answer, Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userInputsAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userCheckboxesAnswers), Object.keys(quizResults.questionGrades[curr].userAnswerInfo.userRadiosAnswers), quizResults.questionGrades[curr].questionSessionId)
        };

        return prev;
    }, {});

    const answerDetails = Object.keys(preparedResults || {}).map((key) => {
        return preparedResults[key];
    });

    context.action = {
        type: 'END_QUIZ_SESSION',
        finalGrade: quizResults.finalGrade,
        answerDetails
    };
};

const clearQuestions = (context: any) => {
    context.action = {
        type: 'CLEAR_QUESTIONS'
    };
};

const loadQuestionIds = async (context: any, quizId: string) => {
    try {
        const questionIds = await QuizModel.getQuestionIds(quizId);

        context.action = {
            type: 'LOAD_QUESTION_IDS',
            questionIds: questionIds
        };
    }
    catch(error) {
        throw error;
    }
};

export const Actions = {
    loadQuizSession,
    loadQuestionIds,
    endQuizSession,
    clearQuestions
};
