class PrendusFooter extends Polymer.Element {
    static get is() { return 'prendus-footer'; }

  getYear(): number {
    const currentDate: Date = new Date();
    return currentDate.getFullYear();
  }

}

window.customElements.define(PrendusFooter.is, PrendusFooter);
