import {AnswerDetails} from './answer-details.ts';

export interface Action {
    type: string;
    quizSessionId: string;
    questionIds: string[];
    finalGrade: number;
    answerDetails: AnswerDetails;
}
