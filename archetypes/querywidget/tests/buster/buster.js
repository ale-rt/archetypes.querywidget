var config = module.exports;

config["My tests"] = {
    rootPath: "../../",
    environment: "browser", // or "node"
    sources: [
        //"testlib/jquery-animation-workaround.js",
        "tests/buster/testlib/jquery-1.6.2.min.js",
        "querywidget.js",
    ],
    tests: [
        "tests/buster/archetypes.querywidget-test.js"
    ]
}
