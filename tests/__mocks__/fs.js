const { Readable } = require('stream');
const mockfs = jest.createMockFromModule('node:fs');
const FilesInFileSystem = new Map();

mockfs.__setFiles = () => {
    FilesInFileSystem.set('file-one.md', ["# My Markdown Document","","## Section 1","This is a **bold** paragraph with some *italic* text and some ***bold and italic*** text.","![Section 1 Image](section1-image.png \"Section 1 Image Title\")","[Section 1 Link](https://example.com/section1)","","## Section 2","Here is another paragraph with **bold**, *italic*, and ***bold italic*** formatting.","![Section 2 Image](section2-image.jpg \"Section 2 Image Title\")","[Section 2 Link](https://example.com/section2)"]);

    FilesInFileSystem.set('file-two.md', ["# Sample Markdown With Blockquotes","","## Introduction","This is a paragraph with `emphasized text` and some normal text.","","## Insights","> This is a blockquote in Section 2.","> It can span multiple lines.","","Here is another paragraph with `inline emphasis` and more text.",""]);

    FilesInFileSystem.set('file-three.md', ["## Section Title", "This is a paragraph with some text.", "![Invalid Image](invalid-image.png \"Invalid Image Title\")", "[Invalid Link](https://example.com/invalid)"]);

    FilesInFileSystem.set('file-four.md', []);
};

mockfs.existsSync = (path) => {
    return FilesInFileSystem.has(path);
};

mockfs.createReadStream = (path) => {
    if (!FilesInFileSystem.has(path)) {
        throw new Error(`File not found: ${path}`);
    }
    const content = FilesInFileSystem.get(path).join('\n');
    return Readable.from(content);
};

module.exports = mockfs;
