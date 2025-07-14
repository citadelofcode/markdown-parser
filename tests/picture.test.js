const Picture = require('../lib/picture.js');
const { MarkdownParseError } = require('../lib/errors.js');

describe('Testing picture parsing for valid cases', () => {
    const positiveCases = [{
        Name: "Valid image with alternate text and path",
        Input: "![Alt text](path/to/image.jpg)",
        ExpAltText: "Alt text",
        ExpPath: "path/to/image.jpg",
        ExpTitle: ""
    }, {
        Name: "Valid image with alternate text, path, and title",
        Input: "![Alt text](path/to/image.jpg \"Image Title\")",
        ExpAltText: "Alt text",
        ExpPath: "path/to/image.jpg",
        ExpTitle: "Image Title"
    }];

    positiveCases.forEach(testCase => {
        it(testCase.Name, () => {
            const picture = new Picture();
            picture.Parse(testCase.Input);
            expect(picture.AlternateText).toBe(testCase.ExpAltText);
            expect(picture.Path).toBe(testCase.ExpPath);
            expect(picture.Title).toBe(testCase.ExpTitle);
        });
    });
});

describe("Testing picture parsing for invalid cases", () => {
    const negativeCases = [{
        Name: "Invalid image format - missing circular brackets",
        Input: "[Alt text]path/to/image.jpg"
    }, {
        Name: "Invalid image format - link format given",
        Input: "[Alt text](path/to/image.jpg)"
    }, {
        Name: "Invalid image format - no square brackets",
        Input: "Alt Text (path/to/image.jpeg)"
    }, {
        Name: "Invalid Image Format - No AltText",
        Input: "![](path/to/image.jpg)"
    }];

    negativeCases.forEach(testCase => {
        it(testCase.Name, () => {
            const picture = new Picture();
            expect(() => picture.Parse(testCase.Input)).toThrow(MarkdownParseError);
        });
    });
});
