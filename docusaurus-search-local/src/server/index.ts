import { codeTranslationLocalesToTry } from "@docusaurus/theme-translations";
import fs from "fs-extra";
import path from "path";
import { DocusaurusContext, PluginOptions } from "../shared/interfaces";
import { generate } from "./utils/generate";
import { postBuildFactory } from "./utils/postBuildFactory";
import { processPluginOptions } from "./utils/processPluginOptions";

const PLUGIN_NAME = "@easyops-cn/docusaurus-search-local";

export default function DocusaurusSearchLocalPlugin(
  context: DocusaurusContext,
  options?: PluginOptions
): any {
  const config = processPluginOptions(options, context);

  const dir = path.join(context.generatedFilesDir, PLUGIN_NAME, "default");
  fs.ensureDirSync(dir);
  const searchIndexFilename = generate(config, dir);

  const themePath = path.resolve(__dirname, "../../client/client/theme");

  return {
    name: PLUGIN_NAME,

    getThemePath() {
      return themePath;
    },

    postBuild: postBuildFactory(config, searchIndexFilename),

    getClientModules: () => {
      return [path.resolve(__dirname, "../../client/client/index.js")];
    },

    async getDefaultCodeTranslationMessages() {
      const dirPath = path.join(__dirname, "../../locales");
      const localesToTry = codeTranslationLocalesToTry(
        context.i18n.currentLocale
      );

      // Return the content of the first file that match
      // fr_FR.json => fr.json => nothing
      for (const locale of localesToTry) {
        const filePath = path.resolve(dirPath, `${locale}.json`);
        if (await fs.pathExists(filePath)) {
          return fs.readJSON(filePath);
        }
      }
      return {};
    },
  };
}

export { validateOptions } from "./utils/validateOptions";
