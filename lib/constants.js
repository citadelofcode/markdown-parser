const IMAGE_LINE_REGEX = /^!\[[^\]]+\]\([^\)]+\)$/;
const IMAGE_BLOCK_REGEX = /!\[([^\]]+)\]\(([^)]+)\)/;
const LINK_LINE_REGEX = /^\[[^\]]+\]\([^\)]+\)$/;
const LINK_BLOCK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/;
const LINK_IMAGE_TITLE_REGEX = /"(.*?)"/;
const HEADING_LINE_REGEX = /^#+/;
const BLOCKQUOTE_REGEX = /^>+/;
const EMPHASIS_REGEX = /`([^`]+)`/;
const BOLD_TEXT_REGEX = /\*\*([^*]+)\*\*/;
const ITALICS_TEXT_REGEX = /\*([^*]+)\*/;
const BOLD_ITALICS_TEXT_REGEX = /\*\*\*([^*]+)\*\*\*/;

module.exports = {
    IMAGE_LINE_REGEX,
    IMAGE_BLOCK_REGEX,
    LINK_LINE_REGEX,
    LINK_BLOCK_REGEX,
    LINK_IMAGE_TITLE_REGEX,
    HEADING_LINE_REGEX,
    BLOCKQUOTE_REGEX,
    EMPHASIS_REGEX,
    BOLD_TEXT_REGEX,
    ITALICS_TEXT_REGEX,
    BOLD_ITALICS_TEXT_REGEX
};
