export interface Action {
    type: string,
    private?: boolean,
    questionId?: string,
    previewQuestionId?: string
}
