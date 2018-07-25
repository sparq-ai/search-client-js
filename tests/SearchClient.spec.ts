import {suite, test, timeout} from "mocha-typescript";
import SearchClient from "../src/SearchClient";
import {expect} from "chai";

@suite("SearchClientSpec", timeout(100000))
class SearchClientSpec {
  @test("Get Search Results")
  async testSearchRequest() {
    let searchToken: string = process.env["searchToken"] as string;
    let appId: string = process.env["appId"] as string;
    let collectionId: string = process.env["collectionId"] as string;

    let searchClient = new SearchClient(appId, searchToken)
      .searchFields("id")
      .searchFields("name")
      .fields("id")
      .fields("name", "facetField1")
      .textFacets("facetField1")
      .textFacets("facetField2", "facetField3")
      .textFacetFilters("facetField3", ["100", "200"])
      .textFacetFilters("facetField2", ["100", "200", "300", "400", "500", "600", "700", "800"])
      .numericFacets("histogramField1", [{min: 0, max: 100}, {min: 100, max: 200}, {min: 200, max: 300}])
      .numericFacets("histogramField1", [{min: 300, max: 400}, {min: 400, max: 500}, {min: 500, max: 600}])
      .numericFacets("histogramField1", [{min: 600, max: 700}, {min: 700, max: 800}])
      .numericFacetFilters("histogramField3", 0, 100)
      .numericFacetFilters("histogramField3", 100, 200)
      .numericFacetFilters("histogramField2", 0, 800)
      .sort("name")
      .skip(30)
      .count(40)
      .typoTolerance(2);

    let result = await searchClient.search("name", collectionId);
    expect(<any[]>(<any>result)["results"].length).greaterThan(0)
  }

}