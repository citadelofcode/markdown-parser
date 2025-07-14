const { Paragraph, SubParagraph } = require('../lib/paragraph.js');
const Hyperlink = require('../lib/hyperlink.js');

describe("Parsing a paragraph containing text that is bold and italicized", () => {
    const testCases = [{
        Name: "Containing a single instance of bold-italicized text",
        Input: ["This is a paragraph with ***bold - italicized*** text."],
        ExpContent: "This is a paragraph with $0 text.",
        ExpChildCount: 1,
    }, {
        Name: "Containing multiple instances of bold-italicized text",
        Input: ["This is a paragraph with ***bold - italicized*** text and another ***bol - itali*** text."],
        ExpContent: "This is a paragraph with $0 text and another $1 text.",
        ExpChildCount: 2,
    }, {
        Name: "Containing the same bold-italicized text multiple times",
        Input: ["This is a paragraph with ***bold - italicized*** text and another ***bold - italicized*** text."],
        ExpContent: "This is a paragraph with $0 text and another $1 text.",
        ExpChildCount: 2,
    }];

    testCases.forEach(testCase => {
        it(testCase.Name, () => {
            const paragraph = new Paragraph();
            paragraph.Parse(testCase.Input);
            expect(paragraph.Content).toBe(testCase.ExpContent);
            expect(paragraph.Children.length).toBe(testCase.ExpChildCount);
            for(const child of paragraph.Children) {
                expect(child.Style).toBe("bold-italics");
                expect(child).toBeInstanceOf(SubParagraph);
            }
        });
    });
});

describe("Parsing a paragraph containing text that is bold", () => {
    const testCases = [{
        Name: "Containing a single instance of bold text",
        Input: ["This is a paragraph with **bold** text."],
        ExpContent: "This is a paragraph with $0 text.",
        ExpChildCount: 1,
    }, {
        Name: "Containing multiple instances of bold text",
        Input: ["This is a paragraph with **bold** text and another **bol** text."],
        ExpContent: "This is a paragraph with $0 text and another $1 text.",
        ExpChildCount: 2,
    }, {
        Name: "Containing the same bold text multiple times",
        Input: ["This is a paragraph with **bold** text and another **bold** text."],
        ExpContent: "This is a paragraph with $0 text and another $1 text.",
        ExpChildCount: 2,
    }];

    testCases.forEach(testCase => {
        it(testCase.Name, () => {
            const paragraph = new Paragraph();
            paragraph.Parse(testCase.Input);
            expect(paragraph.Content).toBe(testCase.ExpContent);
            expect(paragraph.Children.length).toBe(testCase.ExpChildCount);
            for(const child of paragraph.Children) {
                expect(child.Style).toBe("bold");
                expect(child).toBeInstanceOf(SubParagraph);
            }
        });
    });
});

describe("Parsing a paragraph containing text that is italicized", () => {
    const testCases = [{
        Name: "Containing a single instance of italicized text",
        Input: ["This is a paragraph with *italicized* text."],
        ExpContent: "This is a paragraph with $0 text.",
        ExpChildCount: 1,
    }, {
        Name: "Containing multiple instances of italicized text",
        Input: ["This is a paragraph with *italicized* text and another *itali* text."],
        ExpContent: "This is a paragraph with $0 text and another $1 text.",
        ExpChildCount: 2,
    }, {
        Name: "Containing the same italicized text multiple times",
        Input: ["This is a paragraph with *italicized* text and another *italicized* text."],
        ExpContent: "This is a paragraph with $0 text and another $1 text.",
        ExpChildCount: 2,
    }];

    testCases.forEach(testCase => {
        it(testCase.Name, () => {
            const paragraph = new Paragraph();
            paragraph.Parse(testCase.Input);
            expect(paragraph.Content).toBe(testCase.ExpContent);
            expect(paragraph.Children.length).toBe(testCase.ExpChildCount);
            for(const child of paragraph.Children) {
                expect(child.Style).toBe("italic");
                expect(child).toBeInstanceOf(SubParagraph);
            }
        });
    });
});

describe("Parsing a paragraph containing text that is emphasized", () => {
    const testCases = [{
        Name: "Containing a single instance of emphasized text",
        Input: ["This is a paragraph with `emphasized` text."],
        ExpContent: "This is a paragraph with $0 text.",
        ExpChildCount: 1,
    }, {
        Name: "Containing multiple instances of emphasized text",
        Input: ["This is a paragraph with `emphasized` text and another `emphasized-again` text."],
        ExpContent: "This is a paragraph with $0 text and another $1 text.",
        ExpChildCount: 2,
    }, {
        Name: "Containing the same emphasized text multiple times",
        Input: ["This is a paragraph with `emphasized` text and another `emphasized` text."],
        ExpContent: "This is a paragraph with $0 text and another $1 text.",
        ExpChildCount: 2,
    }];

    testCases.forEach(testCase => {
        it(testCase.Name, () => {
            const paragraph = new Paragraph();
            paragraph.Parse(testCase.Input);
            expect(paragraph.Content).toBe(testCase.ExpContent);
            expect(paragraph.Children.length).toBe(testCase.ExpChildCount);
            for(const child of paragraph.Children) {
                expect(child.Style).toBe("emphasis");
                expect(child).toBeInstanceOf(SubParagraph);
            }
        });
    });
});

describe("Parsing a paragraph containing hyperlinks", () => {
    const testCases = [{
        Name: "Containing a single hyperlink with some text",
        Input: ["This is a paragraph with [a link](https://example.com) to a website."],
        ExpContent: "This is a paragraph with $0 to a website.",
        ExpChildCount: 1
    }, {
        Name: "Containing multiple hyperlinks with some text",
        Input: ["This is a paragraph with [a link](https://example.com) to a website and [another link](https://another-example.com)."],
        ExpContent: "This is a paragraph with $0 to a website and $1.",
        ExpChildCount: 2
    }, {
        Name: "Containing the same hyperlink multiple times",
        Input: ["This is a paragraph with [a link](https://example.com) to a website and another [a link](https://example.com)."],
        ExpContent: "This is a paragraph with $0 to a website and another $1.",
        ExpChildCount: 2
    }];

    testCases.forEach(testCase => {
        it(testCase.Name, () => {
            const paragraph = new Paragraph();
            paragraph.Parse(testCase.Input);
            expect(paragraph.Content).toBe(testCase.ExpContent);
            expect(paragraph.Children.length).toBe(testCase.ExpChildCount);
            for(const child of paragraph.Children) {
                expect(child).toBeInstanceOf(Hyperlink);
            }
        });
    });
});
