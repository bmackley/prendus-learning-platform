import {Video} from '../../node_modules/prendus-services/interfaces/video.interface';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface';

class PrendusConceptVideoContainer {
    public is: string;
    public properties: any;
    public observers: string[];
    public conceptId: string;
    public videos: Video[];
    public currentVideoId: string;
    public currentVideoTitle: string;
    public currentVideoUrl: string;

    beforeRegister() {
        this.is = 'prendus-concept-video-container';
        this.properties = {
            conceptId: {
                type: String
            },
            courseId: {
                type: String
            }
        };
        this.observers = [
            'init(conceptId)'
        ];
    }

    async init() {
        if (this.conceptId) {
            await Actions.loadViewConceptVideos(this, this.conceptId);
        }
    }

    addVideoClick(e: Event) {
        Actions.clearCurrentVideoInfo(this);
        this.$.editVideoDialog.open();
    }

    videoRowClick(e: {
        model: any
    }) {
        const id = e.model.item.id;
        const title = e.model.item.title;
        const url = e.model.item.url;

        Actions.setCurrentVideoInfo(this, id, title, url);
        //go to the url
        // courses/view-video/course/:courseId/video/:videoId
        window.history.pushState({}, '', `courses/view-video/course-id/${this.courseId}/video-id/${id}`);
        this.fire('location-changed', {}, {node: window});
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.videos = state.viewConceptVideos[this.conceptId];
        this.currentVideoId = state.currentConceptVideoId;
        this.currentVideoTitle = state.currentConceptVideoTitle;
        this.currentVideoUrl = state.currentConceptVideoUrl;
    }
}

Polymer(PrendusConceptVideoContainer);
