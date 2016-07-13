import {Video} from '../node_modules/prendus-services/interfaces/video.interface.ts';

export interface State {
    conceptVideos: {
        [conceptId: string]: Video[]
    },
    currentConceptVideoId: string,
    currentConceptVideoTitle: string,
    currentConceptVideoUrl: string
}
