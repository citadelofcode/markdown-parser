const Hyperlink = require('../lib/hyperlink.js');
const { MarkdownParseError } = require('../lib/errors.js');

describe("Testing hyperlink parsing for valid cases", () => {
    const positiveCases = [{
        Name: "Valid hyperlink with alternate text and URL",
        Input: "[Alt text](http://example.com)",
        ExpAltText: "Alt text",
        ExpLink: "http://example.com",
        ExpTitle: ""
    }, {
        Name: "Valid hyperlink with alternate text, URL, and title",
        Input: "[Alt text](http://example.com \"Link Title\")",
        ExpAltText: "Alt text",
        ExpLink: "http://example.com",
        ExpTitle: "Link Title"
    }];

    positiveCases.forEach(testCase => {
        it(testCase.Name, () => {
            const hyperlink = new Hyperlink();
            hyperlink.Parse(testCase.Input);
            expect(hyperlink.AlternateText).toBe(testCase.ExpAltText);
            expect(hyperlink.Link).toBe(testCase.ExpLink);
            expect(hyperlink.Title).toBe(testCase.ExpTitle);
        });
    });
});

describe("Testing hyperlink parsing for invalid cases", () => {
    const negativeCases = [{
        Name: "Invalid hyperlink format - missing square brackets",
        Input: "(http://example.com)"
    }, {
        Name: "Invalid hyperlink format - no parentheses",
        Input: "[Alt text]http://example.com"
    }, {
        Name: "Invalid hyperlink format - no alternate text",
        Input: "[](http://example.com)"
    }];

    negativeCases.forEach(testCase => {
        it(testCase.Name, () => {
            const hyperlink = new Hyperlink();
            expect(() => hyperlink.Parse(testCase.Input)).toThrow(MarkdownParseError);
        });
    });
});
