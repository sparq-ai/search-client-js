import { GeoType, ObjOfStringArray } from "./TypeDefs";
export declare class SearchRequest {
    query: string;
    fields: string[];
    textFacets: string[];
    highlightFields: string[];
    searchFields: string[];
    filter: string;
    sort: string[];
    skip: number;
    count: number;
    collection: string;
    facetCount: number;
    groupBy?: string;
    groupCount: number;
    typoTolerance: number;
    textFacetFilters: ObjOfStringArray;
    numericFacets: ObjOfStringArray;
    numericFacetFilters: ObjOfStringArray;
    textFacetQuery: TextFacetQuery | null;
    geo: GeoType;
    toJson(): {};
}
export declare class TextFacetQuery {
    query: string;
    count: number;
    constructor(query: string, count: number);
}
