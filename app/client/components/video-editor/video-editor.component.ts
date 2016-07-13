class VideoEditorComponent {
    public is: string;
    public properties;
    public videoId: string;

    beforeRegister() {
        this.is = 'prendus-video-editor';
        this.properties = {
            title: {
                type: String
            },
            url: {
                type: String
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

    updateSrc() {
        this.url = this.$.urlInput.value;
    }

    indicateSaved() {
        this.$.savedToast.open();
    }
}

Polymer(VideoEditorComponent);
