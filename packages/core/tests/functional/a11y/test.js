describe('a11y', () => {

    beforeEach(() => {
        browser.url('about:blank');
    });

    afterEach(() => {
        browser.sessionStorage('DELETE');
    });

    it('doesn’t add `application` role in list mode', () => {
        browser.url('/a11y/list.html');
        browser.isExisting('.shower[role=application]').should.equal(false);
    });

    it('adds `application` role in full mode', () => {
        browser.url('/a11y/full.html');
        browser.isExisting('.shower[role=application]').should.equal(true);
    });

});
