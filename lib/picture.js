const { MarkdownParseError } = require("./errors.js");
const constants = require("./constants.js");

/**
 * Represents each image present inside a page.
 */
class Picture {
    /**
     * Path to the image being displayed on the page.
     */
    Path = "";
    /**
     * Alternate text to be displayed if the image is not available at the location given.
     */
    AlternateText = "";
    /**
     * Title of the image being displayed.
     */
    Title = "";

    /**
     * Parse the different components of the image.
     * @param {string} image - The image string to parse.
     */
    Parse(image) {
        image = image.trim();
        const match = image.match(constants.IMAGE_BLOCK_REGEX);
        if (!match) {
            throw new MarkdownParseError("No matches found for the image regex.", image);
        }

        this.AlternateText = match[1];
        let pathValue = match[2];
        let titleMatch = pathValue.match(constants.LINK_IMAGE_TITLE_REGEX);
        if (titleMatch) {
            this.Title = titleMatch[1];
            this.Path = pathValue.replace(titleMatch[0], '').trim();
        } else {
            this.Path = pathValue.trim();
            this.Title = "";
        }
    }
}

module.exports = Picture;
