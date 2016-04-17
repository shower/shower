describe('core', () => {
    afterEach(() => {
        browser.sessionStorage('DELETE');
    });

    it('enables list mode in lack of any state class', () => {
        browser.url('/core/none.html');
        browser.element('.shower.list');
    });

    it('stays in list mode if `list` class name is present', () => {
        browser.url('/core/list.html');
        browser.element('.shower.list');
    });
});
