shower.modules.define('test.shower.Plugins', [
    'shower',
    'Plugins'
], function (provide, shower, Plugins) {

    var sh = shower.getInited[0];

    describe('shower.Plugins', function () {
        var plugins,
            pluginName = 'shower-test-plugin';

        beforeEach(function () {
            plugins = new Plugins(shower);
        });

        afterEach(function () {
            plugins.destroy();
        });

        it('Should add and init new plugin', function (done) {
            plugins.events.once('add', function () {
                done();
            });

            plugins.add(pluginName);
        });

        it('Should remove the plugin', function (done) {
            plugins.events.once('add', function (e) {
                setTimeout(function () {
                    plugins.remove(pluginName);
                }, 15);
            });

            plugins.events.once('remove', function () {
                done();
            });

            plugins.add(pluginName);
        });

        it('Should get the plugin', function (done) {
            plugins.events.once('add', function (e) {
                var name = e.get('name');
                name.should.eq(pluginName);

                var plugin = plugins.get(pluginName, shower.getInited()[0]);
                plugin.test().should.eq('test');

                done();
            });

            plugins.add(pluginName);
        });

        it('Should instance the plugin with options from the Shower', function (done) {
            var testPluginOptions = {t:'test-test'};
            var sh = shower.getInited()[0];
            sh.options.set('plugin_' + pluginName, testPluginOptions);

            plugins.events.once('add', function (e) {
                var plugin = plugins.get(pluginName, sh);
                plugin.testOptions().should.eq(testPluginOptions);

                done();
            });

            plugins.add(pluginName);
        });

        it('Should instance the plugin with options from method', function (done) {
            var testPluginOptions = {t:'test-test'};

            plugins.events.once('add', function (e) {
                var plugin = plugins.get(pluginName, shower.getInited()[0]);
                plugin.testOptions().should.eq(testPluginOptions);
                done();
            });

            plugins.add(pluginName, testPluginOptions);
        });
    });

    provide();
});

// Тестовый плагин.
shower.modules.define('shower-test-plugin', [
    'Emitter'
], function (provide, EventEmitter) {

    function TestPlugin (localShower, options) {
        this._shower = localShower;
        this._options = options;
        this.events = new EventEmitter();

        this.events.emit('init');
    }

    TestPlugin.prototype = {
        destroy: function () {
            this.events.emit('destroy');
        },

        test: function () {
            this.events.emit('test');
            return 'test';
        },

        testOptions: function () {
            return this._options;
        }
    };

    provide(TestPlugin);
});
