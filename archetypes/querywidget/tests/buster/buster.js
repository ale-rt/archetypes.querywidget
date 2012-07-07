var config = module.exports;

config["My tests"] = {
    rootPath: "../../",
    environment: "browser", // or "node"
    sources: [
        //"testlib/jquery-animation-workaround.js",
        "tests/buster/testlib/jquery-1.6.2.min.js",
        "querywidget.js",
        //"querywidget-wire.js"
    ],
    tests: [
        //"testlib/jquery.simulate.js",
        //"testlib/JSON2.js"
        "tests/buster/archetypes.querywidget-test.js"
    ]
}
