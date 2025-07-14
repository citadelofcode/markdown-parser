const { existsSync, createReadStream } = require("node:fs");
const { createInterface } = require("node:readline");
const { once } = require("node:events");

const { MarkdownParseError, FileNoExistsError } = require("./errors.js");
const utils = require("./utils.js");
const Section = require("./section.js");
const { Paragraph } = require("./paragraph.js");
const Blockquote = require("./blockquote.js");
const Hyperlink = require("./hyperlink.js");
const Picture = require("./picture.js");
const Page = require("./page.js");
const constants = require("./constants.js");

/**
 * Exposes method(s) to parse markdown files and return the data within the file as a JavaScript object.
 */
class Reader {
    /**
     * Method that reads the contents of the given markdown file and returns a JavaScript object containing all the information present in the file.
     * @param {string} FilePath Complete path of the markdown file to be read and parsed.
     * @returns {Promise<Page>} a new page containing all the contents of the markdown file.
     * @throws {MarkdownParseError} If the markdown file is empty or does not contain a title.
     * @throws {FileNoExistsError} If the file does not exist at the given path.
     * @static
     * @memberof Reader
     */
    static async Parse(FilePath) {
        let page = new Page(FilePath);
        page.LinesInFile = await Reader.FetchContents(FilePath);
        if(page.LinesInFile.length === 0) {
            throw new MarkdownParseError("The markdown file cannot be empty", page.CompleteFilePath);
        }

        let firstLine = page.LinesInFile[0].trim();
        if(!firstLine.startsWith("# ")) {
            throw new MarkdownParseError("Page title is missing in the markdown file. This is usually fetched from the first line of the markdown file containing a level one heading.", page.CompleteFilePath);
        }
        let section = new Section(1);
        let index = 0;
        index = this.ParseSection(page.LinesInFile, index, section);
        if(index !== page.LinesInFile.length) {
            throw new MarkdownParseError("Unexpected content found in the markdown file after parsing all sections.", page.CompleteFilePath);
        }
        page.Children.push(section);
        return page;
    }

    /**
     * Parses section of given level from the markdown file and all its children. It returns the index in the array that should be processed next
     * @param {string[]} LinesInFile Array of lines read from the markdown file.
     * @param {number} index Next index to be parsed in the list of lines read from the file.
     * @param {Section} parent the instance whose contents are to be parsed. This can either be a section or a blockquote.
     * @returns {number} the next index in the array that should be processed.
     * @static
     * @memberof Reader
     */
    static ParseSection(LinesInFile, index, parent) {
        let sectionTitle = LinesInFile[index++];
        sectionTitle = sectionTitle.replace(constants.HEADING_LINE_REGEX, "");
        sectionTitle = utils.SanitizeValue(sectionTitle);
        parent.Title = sectionTitle;
        while(index < LinesInFile.length) {
            let currentLine = LinesInFile[index].trim();
            if(constants.HEADING_LINE_REGEX.test(currentLine)) {
                let nextLevel = Section.GetLevel(currentLine);
                if(nextLevel <= parent.Level) {
                    return index; // End of current section, return to parent section
                } else {
                    let childSection = new Section(nextLevel);
                    index = this.ParseSection(LinesInFile, index, childSection);
                    parent.Children.push(childSection);
                }
            } else if(constants.IMAGE_LINE_REGEX.test(currentLine)) {
                let newImage = new Picture();
                newImage.Parse(currentLine);
                parent.Children.push(newImage);
                index++;
            } else if(constants.LINK_LINE_REGEX.test(currentLine)) {
                let newLink = new Hyperlink();
                newLink.Parse(currentLine);
                parent.Children.push(newLink);
                index++;
            } else if(currentLine === "") {
                index++;
            } else if(constants.BLOCKQUOTE_REGEX.test(currentLine)) {
                let newBlockQuote = new Blockquote();
                index = this.ParseBlockQuote(LinesInFile, index, newBlockQuote);
                parent.Children.push(newBlockQuote);
            } else {
                let paragraph = new Paragraph();
                index = this.ParseParagraph(LinesInFile, index, paragraph);
                parent.Children.push(paragraph);
            }
        }
        return index;
    }

    /**
     * Parses a blockquote section from the markdown file. This method considers only one level of blockquote. If there are nested blockquotes, they will be treated as one blockquote section.
     * @param {string[]} LinesInFile Array of lines read from the markdown file.
     * @param {number} index Next index to be parsed in the list of lines read from the file.
     * @param {any} parent the parent component which contains this blockquote. This can be a section or another blockquote.
     * @returns {number} the next index in the markdown file that should be processed.
     * @static
     * @memberof Reader
     */
    static ParseBlockQuote(LinesInFile, index, parent) {
        const BlockQuoteLines = [];
        while(index < LinesInFile.length) {
            let currentLine = LinesInFile[index].trim();
            if(constants.BLOCKQUOTE_REGEX.test(currentLine)) {
                currentLine = currentLine.replace(constants.BLOCKQUOTE_REGEX, "").trim();
                BlockQuoteLines.push(currentLine);
                index++;
            } else {
                break; // End of blockquote section
            }
        }
        let blockIndex = 0;
        while(blockIndex < BlockQuoteLines.length) {
            let currentLine = BlockQuoteLines[blockIndex].trim();
            if(constants.HEADING_LINE_REGEX.test(currentLine)) {
                let newLevel = Section.GetLevel(currentLine);
                let section = new Section(newLevel);
                blockIndex = this.ParseSection(BlockQuoteLines, blockIndex, section);
                parent.Children.push(section);
            } else if(constants.IMAGE_LINE_REGEX.test(currentLine)) {
                let newImage = new Picture();
                newImage.Parse(currentLine);
                parent.Children.push(newImage);
                blockIndex++;
            } else if (constants.LINK_LINE_REGEX.test(currentLine)) {
                let newLink = new Hyperlink();
                newLink.Parse(currentLine);
                parent.Children.push(newLink);
                blockIndex++;
            } else if (currentLine === "") {
                blockIndex++;
            } else {
                let paragraph = new Paragraph();
                blockIndex = this.ParseParagraph(BlockQuoteLines, blockIndex, paragraph);
                parent.Children.push(paragraph);
            }
        }

        return index;
    }

    /**
     * Parses a paragraph section from the markdown file.
     * @param {string[]} LinesInFile Array of lines read from the markdown file.
     * @param {number} index Next index to be parsed in the list of lines read from the file.
     * @param {any} parent The parent component which contains this paragraph. This can be a section or another blockquote.
     * @returns {number} The next index in the markdown file that should be processed.
     */
    static ParseParagraph(LinesInFile, index, parent) {
        const ParagraphLines = [];
        while(index < LinesInFile.length) {
            let currentLine = LinesInFile[index].trim();
            if(currentLine === "") {
                break;
            }
            ParagraphLines.push(currentLine);
            index++;
        }

        parent.Parse(ParagraphLines);
        return index;
    }

    /**
     * Reads the markdown file, fetches its contents and stores them as a list of string values in the current instance of Reader.
     * @param {string} FilePath Complete path of the markdown file to be read and parsed.
     * @returns {Promise<string[]>} A promise that returns an array of strings containing the contents of the markdown file.
     * @throws {FileNoExistsError} If the file does not exist at the given path.
     * @static
     * @memberof Reader
     */
    static async FetchContents(FilePath) {
        const LinesInFile = []
        if(existsSync(FilePath)) {
            const rl = createInterface({
                input: createReadStream(FilePath),
                crlfDelay: Infinity
            });

            rl.on('line', line => {
                line = line.trim();
                LinesInFile.push(line);
            });

            await once(rl, 'close');
            return LinesInFile;
        } else {
            throw FileNoExistsError(FilePath);
        }
    }
}

module.exports = Reader;
