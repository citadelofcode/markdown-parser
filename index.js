const Reader = require('./lib/reader.js');
const {SubParagraph, Paragraph} = require('./lib/paragraph.js');
const Hyperlink = require('./lib/hyperlink.js');
const Picture = require('./lib/picture.js');
const Section = require('./lib/section.js');
const Blockquote = require('./lib/blockquote.js');
const Page = require('./lib/page.js');

const { FileNoExistsError, MarkdownParseError } = require('./lib/errors.js');
const { GetType } = require('./lib/utils.js');

module.exports = {
    Reader,
    SubParagraph,
    Paragraph,
    Hyperlink,
    Picture,
    Section,
    Blockquote,
    Page,
    FileNoExistsError,
    MarkdownParseError,
    GetType
};
