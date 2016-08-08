import {QuestionVisibility} from '../../../../../node_modules/prendus-services/interfaces/question-visibility.type.ts';

export interface Action {
    type: string,
    visibility?: QuestionVisibility,
    questionId?: string,
    previewQuestionId?: string
}
