import {Video} from '../../node_modules/prendus-services/typings/video';
import {Actions} from '../../redux/actions';
import {StatechangeEvent} from '../../typings/statechange-event';

class PrendusLessonVideoContainer {
    public is: string;
    public properties: any;
    public observers: string[];
    public lessonId: string;
    public videos: Video[];
    public currentVideoId: string;
    public currentVideoTitle: string;
    public currentVideoUrl: string;
    public $: any;
    public fire: any;
    public querySelector: any;
    public courseId: string;

    beforeRegister() {
        this.is = 'prendus-lesson-video-container';
        this.properties = {
            lessonId: {
                type: String
            },
            courseId: {
                type: String
            }
        };
        this.observers = [
            'init(lessonId)'
        ];
    }

    async init() {
        if (this.lessonId) {
            await Actions.loadViewLessonVideos(this, this.lessonId);
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

		pauseVideo(): void {
			this.querySelector('prendus-video-editor').pause();
		}

    mapStateToThis(e: StatechangeEvent) {
        const state = e.detail.state;

        this.videos = state.viewLessonVideos[this.lessonId];
				this.currentVideoId = state.currentVideo.id;
        this.currentVideoTitle = state.currentVideo.title;
        this.currentVideoUrl = state.currentVideo.url;
    }
}

Polymer(PrendusLessonVideoContainer);
