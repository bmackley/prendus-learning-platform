import {Video} from '../node_modules/prendus-services/interfaces/video.interface.ts';
import {Quiz} from '../node_modules/prendus-services/interfaces/quiz.interface.ts';

export interface State {
    conceptVideos: {
        [conceptId: string]: Video[]
    },
    conceptQuizzes: {
        [quizId: string]: Quiz[]
    },
    currentConceptVideoId: string,
    currentConceptVideoTitle: string,
    currentConceptVideoUrl: string
}
