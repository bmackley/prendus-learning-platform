class VideoEditorComponent {
    public is: string;
    public properties;
    public videoId: string;

    beforeRegister() {
        this.is = 'prendus-video-editor';
        this.properties = {
            videoId: {
                type: String
            },
            title: {
                type: String,
                notify: true
            },
            url: {
                type: String,
                notify: true
            }
        };
    }

    ready() {
        this.$.savedToast.fitInto = this;
    }

    saveClick() {
        const title = this.$.titleInput.value;
        const url = this.$.urlInput.value;

        this.fire('save', {
            title,
            url
        }, {
            bubbles: false
        });
    }

    deleteClick() {
        this.fire('delete', {

        }, {
            bubbles: false
        });
    }

    updateTitle() {
        this.title = this.$.titleInput.value;
    }

    updateUrl() {
        this.url = this.$.urlInput.value;
    }

    indicateSaved() {
        this.$.savedToast.open();
    }
}

Polymer(VideoEditorComponent);
