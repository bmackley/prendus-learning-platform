import {AnswerDetails} from './answer-details.ts';

export interface State {
    selected: number;
    quizSessionId: string;
    questionIds: string[];
    finalGrade: number;
    answerDetails: AnswerDetails;
}
