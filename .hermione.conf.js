module.exports = {
    baseUrl: "http://localhost:3000",
    gridUrl: "http://localhost:4444/wd/hub",
    sets: {
        desktop: {
            files: 'tests/desktop'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome' // this browser should be installed on your OS
            }
        }
    },
    plugins: {
        "html-reporter/hermione": {
            path: "hermione-html-report"
        }
    }
};