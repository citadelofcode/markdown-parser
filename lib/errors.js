/**
 * Returns an instance of a custom error to denote that no file exists at the given file path.
 * @param {string} FilePath
 * @returns {Error} Returns the custom error instance.
 */
const FileNoExistsError = (FilePath) => {
    return new Error(`No file exists at path - ${FilePath}`)
};

/**
 * Returns a custom error to indicate that an unexpected error was encountred while parsing the markdown file.
 */
class MarkdownParseError extends Error {
    /**
     * Create a new instance of "MarkdownParseError".
     * @param {string} message the complete error message.
     * @param {string} filePath complete file path for the markdown file that was being processed.
     */
    constructor(message, filePath) {
        super(message);
        this.FilePath = filePath.trim();
    }
}

module.exports = {
    FileNoExistsError,
    MarkdownParseError
};
