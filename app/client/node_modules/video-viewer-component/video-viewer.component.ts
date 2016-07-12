import {FirebaseService} from '../../node_modules/prendus-services/services/firebase.service.ts';
import {VideoModel} from '../../node_modules/prendus-services/models/video.model.ts';
import {XAPIVideoEventInfo} from '../../node_modules/prendus-services/interfaces/xapi-video-event-info.interface.ts';
import {XAPIVideoDynamic} from '../../node_modules/prendus-services/interfaces/xapi-video-dynamic.interface.ts';
import {XAPIVideoStatic} from '../../node_modules/prendus-services/interfaces/xapi-video-static.interface.ts';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities.service.ts';
import {XAPIService} from '../../node_modules/prendus-services/services/xapi.service.ts';
import {XAPIExtensions} from '../../node_modules/prendus-services/interfaces/xapi-extensions.interface.ts';

FirebaseService.init('AIzaSyANTSoOA6LZZDxM7vqIlAl37B7IqWL-6MY', 'prendus.firebaseapp.com', 'https://prendus.firebaseio.com', 'prendus.appspot.com', 'Prendus');

declare var videojs: any;

class PrendusVideoComponent {
    public is: string;
    public properties: any;
    public videoSrc: string;
    public $: {
        theVideoPlayer: any,
        ironAjaxElement: any
    };
    public course: string;
    public content: string;
    public userFullName: string;
    public userEmail: string;
    public observers: string[];

    //TODO everything that has to do with mutating the below should perhaps be done in redux or more functionally somehow
    private timeBeforeSeek = 0;
    private seeking = false;

    beforeRegister() {
        this.is = 'prendus-video-viewer';
        this.properties = {
            course: {
                type: String
            },
            content: {
                type: String
            },
            userFullName: {
                type: String
            },
            userEmail: {
                type: String
            }
        };
        this.observers = [
            'init(course, content, userFullName, userEmail)'
        ];
    }

    async init() {
        if (this.course && this.content && this.userFullName && this.userEmail) {
            const prendusServerEndpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
            const video = await VideoModel.getById(this.content);
            this.videoSrc = video.url;
            this.attachInternalListeners(this.course, this.content, this.userFullName, this.userEmail, `${prendusServerEndpointDomain}/api/xapi/video/sendstatement`);
        }
    }

    attachInternalListeners(course: string, content: string, theUserFullName: string, theUserEmail: string, endpointUrl: string): void {
        const videoId = content;
        const userFullName = theUserFullName;
        const courseId = course;
        const userEmail = theUserEmail;
        const baseUri = window.location.origin;
        const fullUrl = baseUri + window.location.pathname;
        const videoJSPlayer = videojs('theVideoPlayer');
        const html5Player = this.$.theVideoPlayer;

        videoJSPlayer.on('fullscreenchange', (e: Event) => {
            const isFullscreen = videoJSPlayer.isFullscreen();
            const verb = getVerb(isFullscreen);
            const staticValues = getStaticValues();
            const dynamicValues = getDynamicValues(this);
            const extensions = {
                [`${baseUri}/playerTime`]: dynamicValues.videoTime
            };
            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);

            function getVerb(isFullScreen: boolean): string {
                if (isFullScreen) {
                    return 'enter_fullscreen';
                }
                else {
                    return 'exit_fullscreen';
                }
            }
        });

        html5Player.addEventListener('playing', (e: Event) => {
            const dynamicValues = getDynamicValues(this);
            const staticValues = getStaticValues();
            const verb = getVerb(dynamicValues.videoTime);
            const extensions = getExtensions(dynamicValues.videoTime);
            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);

            function getVerb(videoTime: number): string {
                if (videoTime === 0) {
                    return 'started';
                }
                else {
                    return 'played';
                }
            }

            function getExtensions(videoTime: number): XAPIExtensions {
                if (videoTime === 0) {
                    return {};
                }
                else {
                    return {
                        [`${baseUri}/playerTime`]: videoTime
                    };
                }
            }
        });

        html5Player.addEventListener('ended', (e: Event) => {
            const dynamicValues = getDynamicValues(this);
            const staticValues = getStaticValues();
            const verb = 'ended';
            const extensions = {
                [`${baseUri}/playerTime`]: dynamicValues.videoTime
            };
            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
        });

        html5Player.addEventListener('pause', (e: Event) => {
            const dynamicValues = getDynamicValues(this);
            const staticValues = getStaticValues();
            const verb = 'paused';
            const extensions = {
                [`${baseUri}/playerTime`]: dynamicValues.videoTime
            };
            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
        });

        html5Player.addEventListener('timeupdate', (e: Event) => {
            const dynamicValues = getDynamicValues(this);

            if (!this.seeking) {
                this.timeBeforeSeek = dynamicValues.videoTime;
                this.seeking = true;
            }
        });

        html5Player.addEventListener('seeked', (e: Event) => {
            const dynamicValues = getDynamicValues(this);
            const staticValues = getStaticValues();
            const verb = 'jumped';
            const extensions = getExtensions(dynamicValues.videoTime, this.timeBeforeSeek);
            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
            this.seeking = false;

            function getExtensions(videoTime: number, timeBeforeSeek: number): XAPIExtensions {
                return {
                    [`${baseUri}/oldTime`]: getJumpStartTime(timeBeforeSeek, videoTime),
                    [`${baseUri}/newTime`]: videoTime
                };
            }

            function getJumpStartTime(timeBeforeSeek: number, videoTime: number) {
                if (timeBeforeSeek === videoTime) {
                    return 0;
                }
                return timeBeforeSeek;
            }
        });

        html5Player.addEventListener('volumechange', (e: Event) => {
            const dynamicValues = getDynamicValues(this);
            const staticValues = getStaticValues();
            const verb = 'changed_volume';
            const extensions = {
                [`${baseUri}/playerTime`]: dynamicValues.videoTime,
                [`${baseUri}/volume`]: dynamicValues.muted ? 0 : dynamicValues.currentVolume
            };
            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
        });

        html5Player.addEventListener('ratechange', (e: Event) => {
            const dynamicValues = getDynamicValues(this);
            const staticValues = getStaticValues();
            const verb = 'changed_playrate';
            const extensions = {
                [`${baseUri}/playerTime`]: dynamicValues.videoTime,
                [`${baseUri}/playRate`]: dynamicValues.currentRate
            };
            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);
        });

        document.addEventListener('visibilitychange', (e: Event) => {
            const dynamicValues = getDynamicValues(this);
            const staticValues = getStaticValues();
            const verb = getVerb();
            const extensions = {
                [`${baseUri}/playerTime`]: dynamicValues.videoTime
            };
            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues);

            function getVerb(): string {
                if (document.visibilityState === 'visible') {
                    return 'resumed';
                }
                else {
                    return 'suspended';
                }
            }
        });

        window.addEventListener('beforeunload', (e: Event) => {
            const dynamicValues = getDynamicValues(this);
            const staticValues = getStaticValues();
            const verb = 'closed_video';
            const extensions = {
                [`${baseUri}/playerTime`]: dynamicValues.videoTime
            };
            XAPIService.sendVideoStatement(endpointUrl, verb, extensions, staticValues, dynamicValues, true);
        });

        function getStaticValues(): XAPIVideoStatic {
            return {
                videoId,
                userFullName,
                userEmail,
                courseId,
                baseUri,
                fullUrl
            };
        }

        function getDynamicValues(context: PrendusVideoComponent): XAPIVideoDynamic {
            return {
                timestamp: new Date(),
                videoTime: context.$.theVideoPlayer.currentTime,
                muted: context.$.theVideoPlayer.muted,
                currentRate: context.$.theVideoPlayer.playbackRate,
                currentVolume: context.$.theVideoPlayer.volume
            };
        }
    }
}

Polymer(PrendusVideoComponent);
