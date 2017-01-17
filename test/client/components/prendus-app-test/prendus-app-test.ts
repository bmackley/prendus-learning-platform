class PrendusAppTest {
    public is: string;

    beforeRegister() {
        this.is = 'prendus-app-test';
    }

    ready() {
        this.appendChild(`<prendus-app></prendus-app>`);
    }
}
