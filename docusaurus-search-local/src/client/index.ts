import {
  SearchDocument,
  SearchDocumentType,
  SearchResult,
} from "../shared/interfaces";
import { fetchIndexes } from "./lib/fetchIndexes";
import { getStemmedPositions } from "./utils/getStemmedPositions";
import { highlightStemmed } from "./utils/highlightStemmed";
import { SearchSourceFactory } from "./utils/SearchSourceFactory";
import * as proxied from "./utils/proxiedGenerated";

const loadIndex = async (params: { versionUrl: string }) => {
  const { wrappedIndexes, zhDictionary } = await fetchIndexes(
    params.versionUrl
  );

  return { wrappedIndexes, zhDictionary };
};

class Search {
  public baseUrl: string;
  public loading = false;

  public source:
    | ((input: string, callback: (result: SearchResult[]) => void) => void)
    | null = null;

  constructor(private config: SearchConfig) {
    this.baseUrl = config.preferredVersionPath;
  }

  init = async () => {
    this.loading = true;

    const { wrappedIndexes, zhDictionary } = await loadIndex({
      versionUrl: this.baseUrl,
    });

    this.source = SearchSourceFactory(
      wrappedIndexes,
      zhDictionary,
      this.config.resultsLimit
    );
  };

  query = async (input: string) => {
    if (!this.source) throw new Error("Not initialized");

    const { promise, callback } = createPromise<SearchResult[]>();

    this.source && this.source(input, callback);

    const response = await promise;

    return {
      results: response.map((result) => this.formatResult(result)),
    };
  };

  formatResult = (result: SearchResult) => {
    return {
      ...result,
      type: this.resultTypeToString(result.type),
      page: result.page ? this.formatDocument(result.page) : null,
      document: result.document ? this.formatDocument(result.document) : null,
      highlighted: highlightStemmed(
        result.document.t,
        getStemmedPositions(result.metadata, "t"),
        result.tokens
      ),
    };
  };

  resultTypeToString = (type: SearchDocumentType) =>
    ({ 0: ResultType.Title, 1: ResultType.Heading, 2: ResultType.Paragraph }[
      type
    ]);

  formatDocument = (doc: SearchDocument) => {
    return {
      id: doc.i,
      title: doc.t,
      url: doc.u,
      hash: doc.h,
      parentId: doc.p,
      breadcrumb: doc.b,
      sectionTitle: doc.s,
    };
  };
}

export enum ResultType {
  Title = "title",
  Heading = "heading",
  Paragraph = "paragraph",
}

export type SearchConfig = {
  resultsLimit: number;
  preferredVersionPath: string;
};

export const createPromise = <T = any>() => {
  let resolve: any, reject: any;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const callback = (data: T, error?: Error) => {
    if (error) return void reject(error);
    resolve(data);
  };

  return {
    reject,
    resolve,
    promise,

    callback,
  };
};

const main = async () => {
  if (typeof window === "undefined") return;

  const win = window as any;

  win.getProxiedGeneratedData = () => proxied;

  win.createSearchInstance = async (config: SearchConfig) => {
    const search = new Search(config);

    return search;
  };
};

main();
