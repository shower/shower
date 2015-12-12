// Tests list.
shower.modules.define('tests', [
    'test.Shower',
    'test.shower.Player',
    'test.shower.Container',
    'test.shower.Plugins',

    'test.Emitter',

    'test.Slide'
], function (provide) {
    provide();
});
