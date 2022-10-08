import { translate } from "@docusaurus/Translate";
import { iconNoResults } from "./icons";
// import styles from "./SearchBar.module.css";
const styles = {
  noResults: "no-results",
  noResultsIcon: "no-results--icon",
};

export function EmptyTemplate(): string {
  if (process.env.NODE_ENV === "production") {
    return `<span class="${styles.noResults}"><span class="${
      styles.noResultsIcon
    }">${iconNoResults}</span><span>${translate({
      id: "theme.SearchBar.noResultsText",
      message: "No results",
    })}</span></span>`;
  }
  return `<span class="${styles.noResults}">No results. ⚠️ On development mode you should run build and copy the index file (build/search-index.json) to the static directory.</span>`;
}
