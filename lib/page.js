/**
 * Contains all the contents present in a markdown file.
 * This includes, sections, paragraphs, images, links, etc.
 * It is the top-level object that represents a markdown file.
 */
class Page {
    /** @type {string} */
    CompleteFilePath = "";
    /** @type {string[]} */
    LinesInFile = [];
    /** @type {any[]} */
    Children = [];

    /**
     * Creates an instance of the Page class.
     * @constructor
     * @param {string} completeFilePath
     */
    constructor(completeFilePath) {
        this.CompleteFilePath = completeFilePath || "";
        this.CompleteFilePath = this.CompleteFilePath.trim();
    }
}

module.exports = Page;
