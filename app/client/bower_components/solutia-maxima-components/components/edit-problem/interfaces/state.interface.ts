import {QuestionVisibility} from '../../../../../node_modules/prendus-services/interfaces/question-visibility.type.ts';

export interface State {
    visibility: QuestionVisibility,
    questionId: string,
    previewQuestionId: string,
    initialLoad: boolean
}
