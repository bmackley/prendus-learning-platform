import {QuestionInfo} from '../../../../../node_modules/prendus-services/interfaces/question-info.interface.ts';
import {QuestionModel} from '../../../../../node_modules/prendus-services/models/question.model.ts';
import {EditProblemComponent} from '../edit-problem.component.ts';
import {Question} from '../../../../../node_modules/prendus-services/interfaces/question.interface.ts';

const initialLoadQuestion = async (context: EditProblemComponent, questionId: string) => {
    try {
        context.action = {
            type: 'SET_QUESTION_ID',
            questionId
        };

        const questionInfo: QuestionInfo = await getQuestionInfo(context);
        const text: string = questionInfo.text;
        const code: string = questionInfo.code;
        const previewQuestionId: string = questionInfo.previewQuestionId;

        context.originalText = text;
        context.originalCode = code;

        context.action = {
            type: 'INITIAL_LOAD_QUESTION',
            previewQuestionId,
            visibility: questionInfo.visibility
        };
    }
    catch(error) {
        throw error;
    }
};

const saveQuestion = async (context: EditProblemComponent, questionId: string, question: Question) => {
    try {
        const id = await QuestionModel.save(questionId, question);

        context.action = {
            type: 'SET_QUESTION_ID',
            questionId: id
        };
    }
    catch(error) {
        throw error;
    }
};

const savePreviewQuestion = async (context: EditProblemComponent, questionId: string, question: Question) => {
    try {
        const id = await QuestionModel.save(questionId, question);

        context.action = {
            type: 'SET_PREVIEW_QUESTION_ID',
            previewQuestionId: id
        };
    }
    catch(error) {
        throw error;
    }
};

async function getQuestionInfo(context: EditProblemComponent): Promise<QuestionInfo> {
    try {
        const request = context.$.getQuestionAjax.generateRequest();
        await request.completes;

        const questionInfo: QuestionInfo = request.response.questionInfo;
        return questionInfo;
    }
    catch(error) {
        throw error;
    }
}

export const Actions = {
    initialLoadQuestion,
    saveQuestion,
    savePreviewQuestion
};
