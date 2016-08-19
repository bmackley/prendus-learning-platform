import {Video} from '../../node_modules/prendus-services/interfaces/video.interface.ts';
import {Actions} from '../../redux/actions.ts';
import {StatechangeEvent} from '../../interfaces/statechange-event.interface.ts';
import {VideoEditorComponent} from '../prendus-video-editor/prendus-video-editor.ts';

class PrendusConceptVideoContainer {
    public is: string;
    public properties: any;
    public observers: string[];
    public conceptId: string;
    public videos: Video[];
    public currentVideoId: string;
    public currentVideoTitle: string;
    public currentVideoUrl: string;
    public $: {
        editVideoDialog: any,
        videoEditor: VideoEditorComponent
    };

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
            await Actions.loadConceptVideos(this, this.conceptId);
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
        window.history.pushState({}, '', `courses/view-video/course/${this.courseId}/video/${id}`);
        this.fire('location-changed', {}, {node: window});
    }

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.videos = state.conceptVideos[this.conceptId];
        this.currentVideoId = state.currentConceptVideoId;
        this.currentVideoTitle = state.currentConceptVideoTitle;
        this.currentVideoUrl = state.currentConceptVideoUrl;
    }
}

Polymer(PrendusConceptVideoContainer);
