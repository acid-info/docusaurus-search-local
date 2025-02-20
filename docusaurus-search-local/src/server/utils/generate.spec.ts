import fs from "fs";
import { getIndexHash } from "./getIndexHash";
import { generate } from "./generate";
import { ProcessedPluginOptions } from "../../shared/interfaces";

jest.mock("./getIndexHash");

const mockWriteFileSync = jest
  .spyOn(fs, "writeFileSync")
  .mockImplementation(() => void 0);

(getIndexHash as jest.MockedFunction<typeof getIndexHash>).mockReturnValue(
  "abc"
);

describe("generate", () => {
  test.each<[string[], any[]]>([
    [
      ["en"],
      [
        expect.stringMatching(/^import lunr from ".+\/lunr\/lunr\.js";$/),
        'export const language = ["en"];',
        "export const removeDefaultStopWordFilter = false;",
        "export const removeDefaultStemmer = false;",
        "export const Mark = null;",
        'export const searchIndexUrl = "search-index.json?_=abc";',
        "export const searchResultLimits = 8;",
        "export const searchResultContextMaxLength = 50;",
        "export const explicitSearchResultPath = false;",
        "export const searchBarShortcut = true;",
        "export const searchBarShortcutHint = true;",
        'export const searchBarPosition = "auto";',
        "export const docsPluginIdForPreferredVersion = undefined;",
        "export const indexDocs = true;",
      ],
    ],
    [
      ["zh"],
      [
        expect.stringMatching(/^import lunr from ".+\/lunr\/lunr\.js";$/),
        expect.stringMatching(
          /^require\(".+\/lunr-languages\/lunr\.stemmer\.support\.js"\)\(lunr\);$/
        ),
        'require("@easyops-cn/docusaurus-search-local/dist/client/shared/lunrLanguageZh").lunrLanguageZh(lunr);',
        'export const language = ["zh"];',
        "export const removeDefaultStopWordFilter = false;",
        "export const removeDefaultStemmer = false;",
        "export const Mark = null;",
        'export const searchIndexUrl = "search-index.json?_=abc";',
        "export const searchResultLimits = 8;",
        "export const searchResultContextMaxLength = 50;",
        "export const explicitSearchResultPath = false;",
        "export const searchBarShortcut = true;",
        "export const searchBarShortcutHint = true;",
        'export const searchBarPosition = "auto";',
        "export const docsPluginIdForPreferredVersion = undefined;",
        "export const indexDocs = true;",
      ],
    ],
    [
      ["es"],
      [
        expect.stringMatching(/^import lunr from ".+\/lunr\/lunr\.js";$/),
        expect.stringMatching(
          /^require\(".+\/lunr-languages\/lunr\.stemmer\.support\.js"\)\(lunr\);$/
        ),
        expect.stringMatching(
          /^require\(".+\/lunr-languages\/lunr\.es\.js"\)\(lunr\);$/
        ),
        'export const language = ["es"];',
        "export const removeDefaultStopWordFilter = false;",
        "export const removeDefaultStemmer = false;",
        "export const Mark = null;",
        'export const searchIndexUrl = "search-index.json?_=abc";',
        "export const searchResultLimits = 8;",
        "export const searchResultContextMaxLength = 50;",
        "export const explicitSearchResultPath = false;",
        "export const searchBarShortcut = true;",
        "export const searchBarShortcutHint = true;",
        'export const searchBarPosition = "auto";',
        "export const docsPluginIdForPreferredVersion = undefined;",
        "export const indexDocs = true;",
      ],
    ],
    [
      ["ja"],
      [
        expect.stringMatching(/^import lunr from ".+\/lunr\/lunr\.js";$/),
        expect.stringMatching(
          /^require\(".+\/lunr-languages\/lunr\.stemmer\.support\.js"\)\(lunr\);$/
        ),
        expect.stringMatching(
          /^require\(".+\/lunr-languages\/tinyseg\.js"\)\(lunr\);$/
        ),
        expect.stringMatching(
          /^require\(".+\/lunr-languages\/lunr\.ja\.js"\)\(lunr\);$/
        ),
        'export const language = ["ja"];',
        "export const removeDefaultStopWordFilter = false;",
        "export const removeDefaultStemmer = false;",
        "export const Mark = null;",
        'export const searchIndexUrl = "search-index.json?_=abc";',
        "export const searchResultLimits = 8;",
        "export const searchResultContextMaxLength = 50;",
        "export const explicitSearchResultPath = false;",
        "export const searchBarShortcut = true;",
        "export const searchBarShortcutHint = true;",
        'export const searchBarPosition = "auto";',
        "export const docsPluginIdForPreferredVersion = undefined;",
        "export const indexDocs = true;",
      ],
    ],
    [
      ["en", "zh"],
      [
        expect.stringMatching(/^import lunr from ".+\/lunr\/lunr\.js";$/),
        expect.stringMatching(
          /^require\(".+\/lunr-languages\/lunr\.stemmer\.support\.js"\)\(lunr\);$/
        ),
        'require("@easyops-cn/docusaurus-search-local/dist/client/shared/lunrLanguageZh").lunrLanguageZh(lunr);',
        expect.stringMatching(
          /^require\(".+\/lunr-languages\/lunr\.multi\.js"\)\(lunr\);$/
        ),
        'export const language = ["en","zh"];',
        "export const removeDefaultStopWordFilter = false;",
        "export const removeDefaultStemmer = false;",
        "export const Mark = null;",
        'export const searchIndexUrl = "search-index.json?_=abc";',
        "export const searchResultLimits = 8;",
        "export const searchResultContextMaxLength = 50;",
        "export const explicitSearchResultPath = false;",
        "export const searchBarShortcut = true;",
        "export const searchBarShortcutHint = true;",
        'export const searchBarPosition = "auto";',
        "export const docsPluginIdForPreferredVersion = undefined;",
        "export const indexDocs = true;",
      ],
    ],
    [
      ["en", "es", "zh"],
      [
        expect.stringMatching(/^import lunr from ".+\/lunr\/lunr\.js";$/),
        expect.stringMatching(
          /^require\(".+\/lunr-languages\/lunr\.stemmer\.support\.js"\)\(lunr\);$/
        ),
        expect.stringMatching(
          /^require\(".+\/lunr-languages\/lunr\.es\.js"\)\(lunr\);$/
        ),
        'require("@easyops-cn/docusaurus-search-local/dist/client/shared/lunrLanguageZh").lunrLanguageZh(lunr);',
        expect.stringMatching(
          /^require\(".+\/lunr-languages\/lunr\.multi\.js"\)\(lunr\);$/
        ),
        'export const language = ["en","es","zh"];',
        "export const removeDefaultStopWordFilter = false;",
        "export const removeDefaultStemmer = false;",
        "export const Mark = null;",
        'export const searchIndexUrl = "search-index.json?_=abc";',
        "export const searchResultLimits = 8;",
        "export const searchResultContextMaxLength = 50;",
        "export const explicitSearchResultPath = false;",
        "export const searchBarShortcut = true;",
        "export const searchBarShortcutHint = true;",
        'export const searchBarPosition = "auto";',
        "export const docsPluginIdForPreferredVersion = undefined;",
        "export const indexDocs = true;",
      ],
    ],
  ])("generate({ language: %j }, dir) should work", (language, contents) => {
    generate(
      {
        language,
        removeDefaultStopWordFilter: false,
        removeDefaultStemmer: false,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        explicitSearchResultPath: false,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarPosition: "auto",
        indexDocs: true,
      } as ProcessedPluginOptions,
      "/tmp"
    );
    expect(mockWriteFileSync).toBeCalledWith(
      "/tmp/generated.js",
      expect.any(String)
    );
    const calledContents = (mockWriteFileSync.mock.calls[0][1] as string).split(
      "\n"
    );
    expect(calledContents).toEqual(contents);
  });

  test("highlightSearchTermsOnTargetPage", () => {
    generate(
      {
        language: ["en"],
        removeDefaultStopWordFilter: false,
        removeDefaultStemmer: false,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        explicitSearchResultPath: false,
      } as ProcessedPluginOptions,
      "/tmp"
    );

    expect(mockWriteFileSync).toBeCalledWith(
      "/tmp/generated.js",
      expect.stringContaining("export { default as Mark } from")
    );
  });

  test("searchBarShortcut", () => {
    generate(
      {
        language: ["en"],
        removeDefaultStopWordFilter: false,
        searchBarShortcut: false,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      } as ProcessedPluginOptions,
      "/tmp"
    );

    expect(mockWriteFileSync).toBeCalledWith(
      "/tmp/generated.js",
      expect.stringContaining("export const searchBarShortcut = false")
    );
  });

  test("searchBarShortcutHint", () => {
    generate(
      {
        language: ["en"],
        removeDefaultStopWordFilter: false,
        searchBarShortcutHint: false,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      } as ProcessedPluginOptions,
      "/tmp"
    );

    expect(mockWriteFileSync).toBeCalledWith(
      "/tmp/generated.js",
      expect.stringContaining("export const searchBarShortcutHint = false")
    );
  });

  test("docsPluginIdForPreferredVersion", () => {
    generate(
      {
        language: ["en"],
        removeDefaultStopWordFilter: false,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        docsPluginIdForPreferredVersion: "product",
      } as ProcessedPluginOptions,
      "/tmp"
    );

    expect(mockWriteFileSync).toBeCalledWith(
      "/tmp/generated.js",
      expect.stringContaining(
        'export const docsPluginIdForPreferredVersion = "product"'
      )
    );
  });

  test("hashed with filename", () => {
    generate(
      {
        language: ["en"],
        removeDefaultStopWordFilter: false,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        hashed: "filename",
      } as ProcessedPluginOptions,
      "/tmp"
    );

    expect(mockWriteFileSync).toBeCalledWith(
      "/tmp/generated.js",
      expect.stringContaining(
        'export const searchIndexUrl = "search-index-abc.json"'
      )
    );
  });
});
