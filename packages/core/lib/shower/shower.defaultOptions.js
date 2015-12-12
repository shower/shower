/**
 * @fileOverview Default Shower options.
 */
shower.modules.define('shower.defaultOptions', function (provide, slidesParser) {
    provide({
        container_selector: '.shower',

        debug_mode: false,
        debug_mode_classname: 'debug',

        hotkeys: true,
        sessionstore_key: 'shower',

        slides_selector: '.shower .slide',

        mode_full_classname: 'full',
        mode_list_classname: 'list',

        slide_title_element_selector: 'H2',
        slide_active_classname: 'active',
        slide_visited_classname: 'visited'
    });
});
