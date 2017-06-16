/**
 * Configuration for build process
 */
module.exports = {
    /**
     * The `build_dir` folder is where the project is compiled
     * The `source_dir` folder is where the project is modified
     * The `ts_compile_dir` folder is where the typescripts are
     * compiled. Must be in the `app_files.js` folder.
     */
    "build_dir": "www/",
    "source_dir": "src/",

    /**
     * Collection of file patterns that refers to the app code
     * used for the build task.
     */
    "app_files": {
        "js" : [
            "js/typings/**/*.ts",
            "js/ts/app.ts",
            "js/ts/lib/**/*.ts",
            "js/ts/controller/*.ts",
            "js/ts/route/*.ts"
        ],
        "css": [
            "css/scss/index.scss"
        ],
        "fonts": ["font/**/*"],
        "images": ["img/**/*"],
        "html": ["html/**/*.html"],
        "index": ["index.html"]
    },

    /**
     * Collection of file patterns that refers to the vendors
     * used for the build task.
     */
    "vendors_files": {
        "js": [
            "node_modules/angular/angular.js",
            "node_modules/angular-animate/angular-animate.js",
            "node_modules/angular-sanitize/angular-sanitize.js",
            "node_modules/angular-ui-router/release/angular-ui-router.js",
            "node_modules/angularindexeddb/angular-indexed-db.js",
            "node_modules/angular-local-storage/dist/angular-local-storage.js",
            "node_modules/angular-material/angular-material.js",
            "node_modules/angular-aria/angular-aria.js",
            "node_modules/angular-mybestpro/dist/js/angular-mybestpro.js",
            "node_modules/ng-cordova/dist/ng-cordova.js",
            "node_modules/ngmap/build/scripts/ng-map.min.js"
        ],
        "css": [
            "node_modules/animate.css/animate.min.css",
            "node_modules/angular-material/angular-material.css"
        ],
        "fonts": [
        ],
        "images": [
        ]
    }
};
