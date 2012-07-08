/*jslint undef: true, newcap: true, nomen: false, white: true, regexp: true */
/*jslint plusplus: false, bitwise: true, maxerr: 50, maxlen: 110, indent: 4 */
/*jslint sub: true */
/*globals window navigator document console setTimeout jQuery $ */
/*globals buster assert refute */
/*globals JSON sinon */

// as sinon does not provide an api for this,
// we are obliged to throw this in ourselves.
function parseQuery(url) {
    var result = {};
    var qs = url.split('?', 2)[1];
    var items = qs === undefined ? []: qs.split('&');
    $.each(items, function (i, v) {
        var pair = v.split('=');
        result[pair[0]] = pair[1];
    });
    return result;
}

// Browser tests

buster.testCase("Test querywidget application", {
    setUp: function () {
        window.portal_url = "http://nohost/foo";
        // We'll create a div element for the dialog
        //console.log(document.body);
        $(document.body).append($(document.createElement("div")).attr("id", "content"));
        $.querywidget.executed = [];
    },
    "test widget setup": {
        setUp: function () {
            // Empty executed
            $.querywidget.init();
        },
        "Widget is initialized": function () {
            assert($.querywidget.initialized);
        }
    },

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
    }    
});
