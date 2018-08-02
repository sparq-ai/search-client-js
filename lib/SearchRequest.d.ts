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
    typoTolerance: number;
    textFacetFilters: ObjOfStringArray;
    numericFacets: ObjOfStringArray;
    numericFacetFilters: ObjOfStringArray;
    geo: GeoType;
    toJson(): {};
}
