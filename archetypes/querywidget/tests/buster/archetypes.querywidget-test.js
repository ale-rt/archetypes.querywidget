/*jslint undef: true, newcap: true, nomen: false, white: true, regexp: true */
/*jslint plusplus: false, bitwise: true, maxerr: 50, maxlen: 110, indent: 4 */
/*jslint sub: true */
/*globals window navigator document console setTimeout jQuery unescape $ */
/*globals buster assert refute */
/*globals JSON sinon */

function parseQuery(url) {
    var result = {};
    var qs = url.split('?', 2)[1];
    var items = qs === undefined ? []: qs.split('&');
    $.each(items, function (i, v) {
        var pair = v.split('=');
        result[pair[0]] = unescape(pair[1]);
    });
    return result;
}

/*
 * This is the minimum setup needed for querywidget tests to work
 */
function querywidget_dom_setup() {
    window.portal_url = "http://nohost/foo";
    // We'll create a div element for the dialog
    $(document.body).append($(document.createElement("div")).attr("id", "content"));
    $.querywidget.executed = [];
}

buster.testCase("Test querywidget initialization", {
    setUp: querywidget_dom_setup,
    "test widget setup": {
        setUp: function () {
            // Empty executed
            this.stub($, "getJSON");
        },
        "Widget is initialized": function () {
            $.querywidget.init();
            assert($.querywidget.initialized);
            assert.calledOnce($.getJSON);
        },
        "Widget config is initialized": function () {
            assert.equals($.querywidget.config, {});
        }
    }
});

buster.testCase("Test querywidget createSelect method", {
    setUp: querywidget_dom_setup,
    "test createSelect method with ungrouped values": {
        "We create a select and check it's structure": {
            setUp: function () {
                this.option_values = [{
                    enabled: true,
                    title: 'foo',
                    group: "undefined" // optional
                }, {
                    enabled: true,
                    title: 'bar'
                }];
                this.select = $.querywidget.createSelect(this.option_values, 1, 'anyClass', 'anyName');
            },
            "Select created": function () {
                assert.equals(this.select.length, 1);
                assert.match(this.select[0], {
                    className: 'anyClass',
                    name: 'anyName'
                });

            },
            "Options created": function () {
                var options = this.select.find('option');
                assert.equals(options.length, this.option_values.length);
                assert.match(options[1], {
                    selected: true,
                    value: 1,
                    innerHTML: this.option_values[1].title
                });
            }
        }
    },
    "test createSelect method with grouped values": {
        "We create a select and check it's structure": {
            setUp: function () {
                this.option_values = [{
                    enabled: true,
                    title: 'foo-a',
                    group: "groupa"
                }, {
                    enabled: true,
                    title: 'bar-a',
                    group: "groupa"
                }, {
                    enabled: true,
                    title: 'foo-b',
                    group: "groupb"
                }, {
                    enabled: true,
                    title: 'bar-b',
                    group: "groupb"
                }];
                this.select = $.querywidget.createSelect(this.option_values, 1, 'anyClass', 'anyName');
            },
            "Select created": function () {
                assert.equals(this.select.length, 1);
                assert.match(this.select[0], {
                    className: 'anyClass',
                    name: 'anyName'
                });

            },
            "Options created": function () {
                var options = this.select.find('option');
                assert.equals(options.length, this.option_values.length);
                assert.match(options[1], {
                    selected: true,
                    value: 1,
                    innerHTML: this.option_values[1].title
                });
            },
            "Option groups created": function () {
                var option_groups = this.select.find('optgroup');
                assert.equals(option_groups.length, 2);
                assert.match(option_groups[0], {
                    label: 'groupa'
                });
                var groupa_options = $(option_groups[0]).find('option');
                assert.equals(groupa_options.length, 2);
            }
        }
    },
    "test createSelect method with grouped and ungrouped values": {
        "We create a select and check it's structure": {
            setUp: function () {
                this.option_values = [{
                    enabled: true,
                    title: 'foo-a',
                    group: "groupa"
                }, {
                    enabled: true,
                    title: 'bar-a',
                    group: "groupa"
                }, {
                    enabled: true,
                    title: 'foo-b'
                }, {
                    enabled: true,
                    title: 'bar-b'
                }];
                this.select = $.querywidget.createSelect(this.option_values, 1, 'anyClass', 'anyName');
            },
            "Select created": function () {
                assert.equals(this.select.length, 1);
                assert.match(this.select[0], {
                    className: 'anyClass',
                    name: 'anyName'
                });

            },
            "Options created": function () {
                var options = this.select.find('option');
                assert.equals(options.length, this.option_values.length);
                assert.match(options[1], {
                    selected: true,
                    value: 1,
                    innerHTML: this.option_values[1].title
                });
            },
            "Option groups created": function () {
                var option_groups = this.select.find('optgroup');
                assert.equals(option_groups.length, 1);
                assert.match(option_groups[0], {
                    label: 'groupa'
                });
                var groupa_options = $(option_groups[0]).find('option');
                assert.equals(groupa_options.length, 2);
            }
        }
    }
});
