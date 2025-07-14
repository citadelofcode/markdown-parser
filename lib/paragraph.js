const Constants = require("./constants.js");
const Hyperlink = require("./hyperlink.js");

/**
 * Represents each child element of a paragraph along with the styling to be applied to the content of the element like bold, italics, emphasis, etc.
 */
class SubParagraph {
    Content = "";
    Style = "";

    /**
     * Creates an instance of SubParagraph.
     * @param {string} content - The content of the sub-paragraph.
     * @param {string} style - The style to be applied to the content. This can be "bold", "italics", "emphasis", etc.
     * @constructor
     */
    constructor(content, style) {
        this.Content = content.trim();
        this.Style = style.trim().toLowerCase();
    }
}

/**
 * Represents each paragraph present inside a page.
 */
class Paragraph {
    /** @type {string} */
    Content = "";
    /** @type {any[]} */
    Children = [];
    #Position = 0;

    /**
     * Returns the next placeholder for the child element.
     * @returns {string} - Returns the next placeholder for the child element.
     */
    #NextPlaceholder() {
        const placeholder = `$${this.#Position}`;
        this.#Position++;
        return placeholder;
    }

    /**
     * Parses the given lines of a paragraph and extracts the content and replaces child elements with appropriate placeholders.
     * @param {string[]} Lines - The lines of the paragraph to parse.
     */
    Parse(Lines) {
        for(let index = 0; index < Lines.length; index++) {
            let currentLine = Lines[index].trim();
            while(Constants.BOLD_ITALICS_TEXT_REGEX.test(currentLine)) {
                const match = currentLine.match(Constants.BOLD_ITALICS_TEXT_REGEX);
                if (match) {
                    const placeholder = this.#NextPlaceholder();
                    currentLine = currentLine.slice(0, match.index) + placeholder + currentLine.slice(match.index + match[0].length);
                    this.Children.push(new SubParagraph(match[1], "bold-italics"));
                }
            }

            while(Constants.BOLD_TEXT_REGEX.test(currentLine)) {
                const match = currentLine.match(Constants.BOLD_TEXT_REGEX);
                if (match) {
                    const placeholder = this.#NextPlaceholder();
                    currentLine = currentLine.slice(0, match.index) + placeholder + currentLine.slice(match.index + match[0].length);
                    this.Children.push(new SubParagraph(match[1], "bold"));
                }
            }

            while(Constants.ITALICS_TEXT_REGEX.test(currentLine)) {
                const match = currentLine.match(Constants.ITALICS_TEXT_REGEX);
                if (match) {
                    const placeholder = this.#NextPlaceholder();
                    currentLine = currentLine.slice(0, match.index) + placeholder + currentLine.slice(match.index + match[0].length);
                    this.Children.push(new SubParagraph(match[1], "italic"));
                }
            }

            while(Constants.EMPHASIS_REGEX.test(currentLine)) {
                const match = currentLine.match(Constants.EMPHASIS_REGEX);
                if (match) {
                    const placeholder = this.#NextPlaceholder();
                    currentLine = currentLine.slice(0, match.index) + placeholder + currentLine.slice(match.index + match[0].length);
                    this.Children.push(new SubParagraph(match[1], "emphasis"));
                }
            }

            while(Constants.LINK_BLOCK_REGEX.test(currentLine)) {
                const match = currentLine.match(Constants.LINK_BLOCK_REGEX);
                if(match) {
                    const placeholder = this.#NextPlaceholder();
                    currentLine = currentLine.slice(0, match.index) + placeholder + currentLine.slice(match.index + match[0].length);
                    const link = new Hyperlink();
                    link.Parse(match[0]);
                    this.Children.push(link);
                }
            }

            Lines[index] = currentLine;
        }

        this.Content = Lines.join(" ");
    }
}

module.exports = {
    Paragraph,
    SubParagraph
};
