module.exports = {
    testTimeout: 20000,              // handle slow API calls
    verbose: true,                   // detailed logs
    testMatch: ["**/tests/**/*.test.js"],
    collectCoverage: true,           // enable coverage
    coverageDirectory: "./coverage",
    reporters: [
      "default",
      ["jest-html-reporter", {
        pageTitle: "API Test Report",
        outputPath: "./reports/test-report.html"
      }],
      ["jest-junit", {
        outputDirectory: "./reports",
        outputName: "junit.xml"
      }]
    ]
  };
  