describe('a11y', () => {

    beforeEach(() => {
        browser.url('about:blank');
    });

    afterEach(() => {
        browser.sessionStorage('DELETE');
    });

    it('doesn’t add `application` role in list mode', () => {
        browser.url('/core/list.html');
        browser.isExisting('.shower[role=application]').should.equal(false);
    });

    it('adds `application` role in full mode', () => {
        browser.url('/core/full.html');
        browser.isExisting('.shower[role=application]').should.equal(true);
    });

});
