/**
 * Formats the given value by removing multiple spaces between words and capitalizes the first letter of each word.
 *  @param {string} line The string value to be formatted.
 *  @returns {string} the formatted string.
 */
const SanitizeValue = (line) => {
    line = line.trim();
    line = line.replace(/\s+/g, " ");
    let words = line.split(/\s/);
    words = words.map((word) => {
        return (word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase());
    });
    return words.join(" ");
};

/**
 * Returns the type of the given object.
 * This is useful to determine the type of the object at runtime.
 * @param {any} obj The instance whose type is to be determined.
 * @returns {string} The type of the object.
 */
const GetType = (obj) => {
    return obj.constructor.name.trim().toUpperCase();
}

module.exports = {
    SanitizeValue,
    GetType
};
