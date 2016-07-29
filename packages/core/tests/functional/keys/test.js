describe('core', () => {

    beforeEach(() => {
        browser.url('about:blank');
    });

    afterEach(() => {
        browser.sessionStorage('DELETE');
    });

    // Forward

    it('activates the first slide in `list` mode if Right Arrow key is pressed', () => {
        browser.url('/keys/list.html');
        browser.keys('\uE014'); // Right
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves forward when Right Arrow key is pressed', () => {
        browser.url('/keys/list.html#1');
        browser.keys('\uE014'); // Right
        browser.isExisting('[id="2"].active').should.equal(true);
    });

    it('moves forward when Down Arrow key is pressed', () => {
        browser.url('/keys/list.html#1');
        browser.keys('\uE015'); // Down
        browser.isExisting('[id="2"].active').should.equal(true);
    });

    it('moves forward when Page Down key is pressed', () => {
        browser.url('/keys/list.html#1');
        browser.keys('\uE00F'); // Page Down
        browser.isExisting('[id="2"].active').should.equal(true);
    });

    it('moves forward when J key is pressed', () => {
        browser.url('/keys/list.html#1');
        browser.keys('J');
        browser.isExisting('[id="2"].active').should.equal(true);
    });

    it('moves forward when L key is pressed', () => {
        browser.url('/keys/list.html#1');
        browser.keys('L');
        browser.isExisting('[id="2"].active').should.equal(true);
    });

    it('moves forward when Enter key is pressed', () => {
        browser.url('/keys/list.html#1');
        browser.keys('Enter'); //
        browser.isExisting('[id="2"].active').should.equal(true);
    });

    it('moves forward when Space key is pressed in Full mode', () => {
        browser.url('/keys/list.html');
        browser.click('[id="1"]');
        browser.keys('Space');
        browser.isExisting('[id="2"].active').should.equal(true);
    });

    it('doesn’t move forward when Space key is pressed in List mode', () => {
        browser.url('/keys/list.html#1');
        browser.keys('Space');
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    // Backward

    it('moves backward when Left Arrow key is pressed', () => {
        browser.url('/keys/list.html#2');
        browser.keys('\uE012'); // Left
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves backward when Up Arrow key is pressed', () => {
        browser.url('/keys/list.html#2');
        browser.keys('\uE013'); // Up
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves backward when Page Up key is pressed', () => {
        browser.url('/keys/list.html#2');
        browser.keys('\uE00E'); // Page Up
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves backward when K key is pressed', () => {
        browser.url('/keys/list.html#2');
        browser.keys('K');
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves backward when H key is pressed', () => {
        browser.url('/keys/list.html#2');
        browser.keys('H');
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves backward when Shift Enter keys are pressed in List mode', () => {
        browser.url('/keys/list.html#2');
        browser.keys(['Shift', 'Enter']);
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    xit('moves backward when Shift Enter keys are pressed in Full mode', () => {
        browser.url('/keys/list.html');
        browser.click('[id="2"]');
        browser.keys(['Shift', 'Enter']);
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('doesn’t move backward when Shift Space keys are pressed in List mode', () => {
        browser.url('/keys/list.html#2')
        browser.keys(['Shift', 'Space']);
        browser.isExisting('[id="2"].active').should.equal(true);
    });

    xit('moves backward when Shift Space keys are pressed in Full mode', () => {
        browser.url('/keys/list.html');
        browser.click('[id="2"]');
        browser.keys(['Shift', 'Space']);
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('goes to first slide when Home key is pressed', () => {
        browser.url('/keys/list.html#3');
        browser.keys('Home');
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('goes to last slide when End key is pressed', () => {
        browser.url('/keys/list.html#1');
        browser.keys('End');
        browser.isExisting('[id="3"].active').should.equal(true);
    });

    // Start End

    it('starts presenation from the first slide when F5 key is pressed', () => {
        browser.url('/keys/list.html#2');
        browser.keys('F5');
        browser.isExisting('[id="1"].active').should.equal(true);
        browser.isExisting('.shower.full').should.equal(true);
    });

    it('starts presenation from the current slide when Shift F5 keys are pressed', () => {
        browser.url('/keys/list.html#2');
        browser.keys(['Shift', 'F5']);
        browser.isExisting('[id="2"].active').should.equal(true);
        browser.isExisting('.shower.full').should.equal(true);
    });

    xit('starts presenation from the first slide when Cmd Shift Enter keys are pressed', () => {
        browser.url('/keys/list.html#2');
        browser.keys(['Meta', 'Shift', 'Enter']);
        browser.isExisting('[id="1"].active').should.equal(true);
        browser.isExisting('.shower.full').should.equal(true);
    });

    xit('starts presenation from the current slide when Cmd Enter keys are pressed', () => {
        browser.url('/keys/list.html#2');
        browser.keys(['Meta', 'Enter']);
        browser.isExisting('[id="2"].active').should.equal(true);
        browser.isExisting('.shower.full').should.equal(true);
    });

    it('stops presenation when F5 key is pressed', () => {
        browser.url('/keys/list.html');
        browser.click('[id="1"]');
        browser.keys('F5');
        browser.isExisting('.shower.list').should.equal(true);
    });

    it('stops presenation when Esc key is pressed', () => {
        browser.url('/keys/list.html');
        browser.click('[id="1"]');
        browser.keys('Escape');
        browser.isExisting('.shower.list').should.equal(true);
    });

});
