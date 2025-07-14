const { SanitizeValue } = require("./utils.js");

/**
 * Section represents all contents present under a particular heading in the markdown file. The heading can be of any levels from 1 to 6.
 */
class Section {
    #Title = "";
    /** @type {any[]} */
    Children = [];
    /**
     * Section level of the data stored in the instance.
     * @type {number}
     */
    Level = 0;

    /**
     * Creates a new instance for section of given level.
     * @param {number} level the section level.
     * @constructor
     */
    constructor(level) {
        this.Level = level || 0;
    }

    /**
     * Sets the title of the section. This title denoted the nature of information present in the section.
     * @param {string} value value to be formatted and assigned as the section title.
     */
    set Title(value) {
        value = value || "";
        value = value.trim();
        value = SanitizeValue(value);
        this.#Title = value;
    }

    /**
     * Fetches the title of the section.
     * @returns {string} title of the section.
     */
    get Title() {
        return this.#Title;
    }

    /**
     * Gets the level of the heading from the line.
     * @param {string} line heading line from the markdown file.
     * @returns {number} level of the heading.
     */
    static GetLevel(line) {
        line = line || "";
        line = line.trim();
        if(line.startsWith("# ")) {
            return 1;
        } else if(line.startsWith("## ")) {
            return 2;
        }
        else if(line.startsWith("### ")) {
            return 3;
        }
        else if(line.startsWith("#### ")) {
            return 4;
        }
        else if(line.startsWith("##### ")) {
            return 5;
        } else if(line.startsWith("###### ")) {
            return 6;
        } else {
            return 0;
        }
    }
}

module.exports = Section;
