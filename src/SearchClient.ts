import {GeoAround, Point, Range} from "./TypeDefs";
import {SearchRequest} from "./SearchRequest";
import Axios, {AxiosInstance, AxiosResponse} from "axios";

export = class SearchClient {
  public searchRequest: SearchRequest;

  private restClient: AxiosInstance;

  constructor(public appId: string, public searchToken: string) {
    this.searchRequest = new SearchRequest();

    let baseUrl = `https://${appId}-fast.searchtap.net/v2`;

    this.restClient = Axios.create({
      baseURL: baseUrl
    })
  }

  searchFields(...searchFields: string[]): this {
    this.searchRequest.searchFields = [];
    this.searchRequest.searchFields = Array.from(new Set(this.searchRequest.searchFields.concat(searchFields)));
    return this;
  }

  fields(...fields: string[]): this {
    this.searchRequest.fields = [];
    this.searchRequest.fields = Array.from(new Set(this.searchRequest.fields.concat(fields)));
    return this;
  }

  textFacets(...textFacets: string[]): this {
    this.searchRequest.textFacets = Array.from(new Set(this.searchRequest.textFacets.concat(textFacets)));
    return this;
  }

  textFacetFilters(name: string, filters: string[]): this {
    if (this.searchRequest.textFacetFilters[name] == undefined)
      this.searchRequest.textFacetFilters[name] = [];
    this.searchRequest.textFacetFilters[name] = Array.from(new Set(this.searchRequest.textFacetFilters[name].concat(filters)));
    return this;
  }

  numericFacets(name: string, ranges: Range[]): this {
    if (this.searchRequest.numericFacets[name] == undefined)
      this.searchRequest.numericFacets[name] = [];
    this.searchRequest.numericFacets[name] = Array.from(new Set(this.searchRequest.numericFacets[name].concat(ranges.map(
      function (value, index, array): string {
        let r = "";
        //preferring minInclusive to be true
        //preferring maxInclusive to be false
        if (value.minInclusive != undefined && value.minInclusive == false)
          r = r + "(";
        else
          r = r + "[";
        r = r + value.min + ",";

        r = r + value.max;
        if (value.maxInclusive != undefined && value.maxInclusive == true)
          r = r + "]";
        else
          r = r + ")";
        return r;
      }
    ))));

    return this;
  }

  numericFacetFilters(name: string, min: number, max: number): this {
    if (this.searchRequest.numericFacetFilters[name] == undefined)
      this.searchRequest.numericFacetFilters[name] = [];
    this.searchRequest.numericFacetFilters[name] = Array.from(new Set(this.searchRequest.numericFacetFilters[name].concat(`[${min},${max}]`)));
    return this;
  }

  filter(filter: string): this {
    this.searchRequest.filter = filter;
    return this;
  }

  sort(...sortFields: string[]): this {
    this.searchRequest.sort = [];
    this.searchRequest.sort = Array.from(new Set(this.searchRequest.sort.concat(sortFields)));
    return this;
  }

  typoTolerance(typo: number): this {
    this.searchRequest.typoTolerance = typo;
    return this;
  }

  geo(val: GeoAround | Point[]): this {
    if (!Array.isArray(val)) {
      this.searchRequest.geo.around = val;
      this.searchRequest.geo.polygon = undefined
    }
    else {
      this.searchRequest.geo.polygon = val.filter((value, index) => {
        return val.findIndex(x => x.lat == value.lat && x.lng == value.lng) == index
      });
      this.searchRequest.geo.around = undefined
    }
    return this;

  }

  skip(skip: number): this {
    this.searchRequest.skip = skip;
    return this;
  }

  count(count: number): this {
    this.searchRequest.count = count;
    return this;
  }

  facetCount(facetCount: number): this {
    this.searchRequest.facetCount = facetCount;
    return this;
  }


  public clear(): void {
    this.searchRequest.textFacetFilters = {};
    this.searchRequest.textFacets = [];
    this.searchRequest.numericFacets = {};
    this.searchRequest.numericFacetFilters = {};
  }

  async search(query: string, collectionId: string): Promise<{}> {
    this.searchRequest.query = query;
    this.searchRequest.collection = collectionId;

    let requestPayload = JSON.stringify(this.searchRequest.toJson());
    this.searchRequest = new SearchRequest();
    return this.restClient.post("", requestPayload, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + this.searchToken
      }
    }).then(function (value: AxiosResponse<any>) {
      return value.data;
    }, function (reason: any) {
      console.log("Failed to get Results for query: " + query + " Status: " + reason["response"]["status"]);
      return null;
    });
  }
}
