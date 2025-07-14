const { MarkdownParseError } = require("./errors.js");
const constants = require("./constants.js");

/**
 * Represents each link present inside a page.
 */
class Hyperlink {
    /**
     * URL represented by the hyperlink instance.
     * @type {string}
     */
    Link = "";
    /**
     * Alternate text to be displayed if the link is not available.
     * @type {string}
     */
    AlternateText = "";
    /**
     * Title of the link being displayed.
     * @type {string}
     */
    Title = "";

    /**
     * Parse the different components of the hyperlink.
     * @param {string} link - The hyperlink string to parse.
     */
    Parse(link) {
        link = link.trim();
        const match = link.match(constants.LINK_BLOCK_REGEX);
        if (!match) {
            throw new MarkdownParseError("No matches found for the hyperlink regex.", link);
        }

        this.AlternateText = match[1];
        let linkValue = match[2];
        let titleMatch = linkValue.match(constants.LINK_IMAGE_TITLE_REGEX);
        if (titleMatch) {
            this.Title = titleMatch[1];
            this.Link = linkValue.replace(titleMatch[0], '').trim();
        } else {
            this.Link = linkValue.trim();
            this.Title = "";
        }
    }
}

module.exports = Hyperlink;
