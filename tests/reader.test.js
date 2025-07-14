const { MarkdownParseError } = require("../lib/errors.js");

jest.mock("node:fs");

describe('Validate methods exposed by reader for markdown parsing', () => {
    beforeEach(() => {
        require("node:fs").__setFiles();
    });

     it("Validate content returned from the file system", async () => {
        const Reader = require("../lib/reader.js");
        let Lines = await Reader.FetchContents("file-one.md");
        expect(Lines.length).toBe(11);
        Lines = await Reader.FetchContents("file-two.md");
        expect(Lines.length).toBe(10);
        Lines = await Reader.FetchContents("file-three.md");
        expect(Lines.length).toBe(4);
        Lines = await Reader.FetchContents("file-four.md");
        expect(Lines.length).toBe(0);
    });

    it("Should throw an error if the markdown file does not contain a title", async () => {
        const Reader = require("../lib/reader.js");
        try {
            await Reader.Parse("file-three.md");
        } catch (error) {
            expect(error).toBeInstanceOf(MarkdownParseError);
        }
    });

    it("Should throw an error if the file contents are empty", async () => {
        const Reader = require("../lib/reader.js");
        try {
            await Reader.Parse("file-four.md");
        } catch (error) {
            expect(error).toBeInstanceOf(MarkdownParseError);
        }
    });
});
