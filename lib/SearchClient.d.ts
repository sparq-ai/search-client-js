import { GeoAround, Point, Range } from "./TypeDefs";
import { SearchRequest } from "./SearchRequest";
export declare class SearchClient {
    appId: string;
    searchToken: string;
    searchRequest: SearchRequest;
    private restClient;
    constructor(appId: string, searchToken: string);
    searchFields(...searchFields: string[]): this;
    fields(...fields: string[]): this;
    highlightFields(...highlightFields: string[]): this;
    textFacets(...textFacets: string[]): this;
    textFacetFilters(name: string, filters: string[]): this;
    numericFacets(name: string, ranges: Range[]): this;
    numericFacetFilters(name: string, min: number, max: number): this;
    filter(filter: string): this;
    sort(...sortFields: string[]): this;
    typoTolerance(typo: number): this;
    geo(val: GeoAround | Point[]): this;
    groupBy(groupBy: string): this;
    skip(skip: number): this;
    count(count: number): this;
    facetCount(facetCount: number): this;
    groupCount(groupCount: number): this;
    clear(): void;
    facetSearch(query: string, facetName: string, facetQuery: string, count: number, collectionId: string): Promise<{}>;
    search(query: string, collectionId: string): Promise<{}>;
}
