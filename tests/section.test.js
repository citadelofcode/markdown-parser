const Section = require('../lib/section.js');

describe("sanitizing the section title", () => {
    const testCases = [{
        Name: "Section title with a single word",
        Input: "Title",
        ExpOutput: "Title"
    }, {
        Name: "Section title with multiple words",
        Input: "Section title",
        ExpOutput: "Section Title"
    }, {
        Name: "Section title with more than one space between words",
        Input: "Section   title",
        ExpOutput: "Section Title"
    }];

    testCases.forEach((testCase) => {
        it(testCase.Name, () => {
            const section = new Section(0);
            section.Title = testCase.Input;
            expect(section.Title).toBe(testCase.ExpOutput);
        });
    });
});

describe("Validating section level parsing", () => {
    const testCases = [{
        Name: "Heading level 1",
        Input: "# Heading 1",
        ExpOutput: 1
    }, {
        Name: "Heading level 2",
        Input: "## Heading 2",
        ExpOutput: 2
    }, {
        Name: "Heading level 3",
        Input: "### Heading 3",
        ExpOutput: 3
    }, {
        Name: "Heading level 4",
        Input: "#### Heading 4",
        ExpOutput: 4
    }, {
        Name: "Heading level 5",
        Input: "##### Heading 5",
        ExpOutput: 5
    }, {
        Name: "Heading level 6",
        Input: "###### Heading 6",
        ExpOutput: 6
    }, {
        Name: "Invalid heading line",
        Input: "This is not a heading",
        ExpOutput: 0
    }];

    testCases.forEach((testCase) => {
        it(testCase.Name, () => {
            const level = Section.GetLevel(testCase.Input);
            expect(level).toBe(testCase.ExpOutput);
        });
    });
});
