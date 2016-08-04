class RenderMathComponent {
    public is;
    public properties;

    beforeRegister() {
        this.is = 'solutia-maxima-render-math';
        this.properties = {
            text: {
                type: String,
                observer: 'textSet'
            }
        };
    }

    ready() {}
    attached() {}
    detached() {}
    attributeChanged() {}

    textSet(newValue, oldValue) {
        this.fireRenderingBegun();
        this.$.mathDiv.innerHTML = newValue;
        MathJax.Hub.Queue(() => {
            MathJax.Hub.Typeset(null, () => {
                this.fireRenderingComplete();
            });
        });
    }

    fireRenderingBegun() {
        this.fire('renderingbegun', {
        }, {
            bubbles: false
        });
    }

    fireRenderingComplete() {
        this.fire('renderingcomplete', {
        }, {
            bubbles: false
        });
    }
}

Polymer(RenderMathComponent);
