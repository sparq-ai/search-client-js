import {suite, test, timeout} from "mocha-typescript";
import SearchClient from "../src/SearchClient";
import {expect} from "chai";

const nock = require('nock');

@suite("SearchClientSpec", timeout(100000))
class SearchClientSpec {
  async before() {
    nock(`https://sampleAppId-fast.searchtap.net/v2`)
      .post('')
      .reply(function (uri, requestBody) {
        return [
          200,
          {'query': requestBody, "results": [], "totalHits": 0}
        ];
      });
  }

  @test("Get Search Results")
  async testFetchSearchResults() {
    let searchClient = new SearchClient("sampleAppId", "sampleSearchToken")
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
    let result = await searchClient.search("name", "sampleCollectionId");
    expect(result["query"] !== undefined).equal(true);
    expect(result["results"] !== undefined).equal(true)
  }

  @test("Test Search Request")
  async testSearchRequest() {
    let searchClient = new SearchClient("", "")
      .searchFields("sf1", "sf2", "sf2")
      .searchFields("sf3", "sf4", "sf3")
      .fields("f1", "f2", "f3")
      .fields("f3", "f4", "f3")
      .textFacets("tf1", "tf2", "tf1")
      .textFacets("tf1", "tf2", "tf1")
      .textFacets("tf3", "tf2", "tf2")
      .numericFacets("nf1", [{min: 0, max: 100}, {min: 100, max: 200}, {min: 0, max: 100}])
      .numericFacets("nf1", [{min: 0, max: 100}, {min: 200, max: 300}])
      .numericFacets("nf2", [{min: 400, max: 500}, {min: 500, max: 600}, {min: 400, max: 500}])
      .textFacetFilters("tf1", ["v11", "v12", "v11"])
      .textFacetFilters("tf1", ["v11", "v13", "v11"])
      .textFacetFilters("tf2", ["v21", "v23", "v21"])
      .numericFacetFilters("nf1", 0, 100)
      .numericFacetFilters("nf1", 100, 200)
      .numericFacetFilters("nf1", 0, 100)
      .numericFacetFilters("nf2", 200, 300)
      .numericFacetFilters("nf2", 200, 300)
      .sort("sortF1", "sortF2", "sortF2")
      .sort("sortF3", "sortF4", "sortF3")
      .geo({lat: 0, lng: 0, radius: 0})
      .geo([{lat: 0, lng: 0}, {lat: 0, lng: 0}, {lat: 0, lng: 1}]);

    expect(searchClient.searchRequest.searchFields.length).equal(2);
    expect(searchClient.searchRequest.searchFields.findIndex(x => x == "sf3") < 0).equal(false);
    expect(searchClient.searchRequest.searchFields.findIndex(x => x == "sf4") < 0).equal(false);

    expect(searchClient.searchRequest.fields.length).equal(2);
    expect(searchClient.searchRequest.fields.findIndex(x => x == "f4") < 0).equal(false);
    expect(searchClient.searchRequest.fields.findIndex(x => x == "f4") < 0).equal(false);


    expect(searchClient.searchRequest.textFacets.length).equal(3);
    expect(searchClient.searchRequest.textFacets.findIndex(x => x == "tf1") < 0).equal(false);
    expect(searchClient.searchRequest.textFacets.findIndex(x => x == "tf2") < 0).equal(false);
    expect(searchClient.searchRequest.textFacets.findIndex(x => x == "tf3") < 0).equal(false);

    expect(Object.keys(searchClient.searchRequest.numericFacets).length).equal(2);
    expect(searchClient.searchRequest.numericFacets["nf1"].length).equal(3);
    expect(searchClient.searchRequest.numericFacets["nf1"].findIndex(x => x == "[0,100)") < 0).equal(false);
    expect(searchClient.searchRequest.numericFacets["nf1"].findIndex(x => x == "[100,200)") < 0).equal(false);
    expect(searchClient.searchRequest.numericFacets["nf1"].findIndex(x => x == "[200,300)") < 0).equal(false);
    expect(searchClient.searchRequest.numericFacets["nf2"].length).equal(2);
    expect(searchClient.searchRequest.numericFacets["nf2"].findIndex(x => x == "[400,500)") < 0).equal(false);
    expect(searchClient.searchRequest.numericFacets["nf2"].findIndex(x => x == "[500,600)") < 0).equal(false);

    expect(Object.keys(searchClient.searchRequest.textFacetFilters).length).equal(2);
    expect(searchClient.searchRequest.textFacetFilters["tf1"].length).equal(3);
    expect(searchClient.searchRequest.textFacetFilters["tf1"].findIndex(x => x == "v11") < 0).equal(false);
    expect(searchClient.searchRequest.textFacetFilters["tf1"].findIndex(x => x == "v12") < 0).equal(false);
    expect(searchClient.searchRequest.textFacetFilters["tf1"].findIndex(x => x == "v13") < 0).equal(false);
    expect(searchClient.searchRequest.textFacetFilters["tf2"].length).equal(2);
    expect(searchClient.searchRequest.textFacetFilters["tf2"].findIndex(x => x == "v21") < 0).equal(false);
    expect(searchClient.searchRequest.textFacetFilters["tf2"].findIndex(x => x == "v23") < 0).equal(false);

    expect(Object.keys(searchClient.searchRequest.numericFacetFilters).length).equal(2);
    expect(searchClient.searchRequest.numericFacetFilters["nf1"].length).equal(2);
    expect(searchClient.searchRequest.numericFacetFilters["nf1"].findIndex(x => x == "[0,100]") < 0).equal(false);
    expect(searchClient.searchRequest.numericFacetFilters["nf1"].findIndex(x => x == "[100,200]") < 0).equal(false);
    expect(searchClient.searchRequest.numericFacetFilters["nf2"].length).equal(1);
    expect(searchClient.searchRequest.numericFacetFilters["nf2"].findIndex(x => x == "[200,300]") < 0).equal(false);
    expect(searchClient.searchRequest.numericFacetFilters["nf2"].findIndex(x => x == "[200,300]") < 0).equal(false);

    expect(searchClient.searchRequest.sort.length).equal(2);
    expect(searchClient.searchRequest.sort.findIndex(x => x == "sortF3") < 0).equal(false);
    expect(searchClient.searchRequest.sort.findIndex(x => x == "sortF4") < 0).equal(false);

    expect(searchClient.searchRequest.geo.around).equal(undefined);
    expect(searchClient.searchRequest.geo.polygon != undefined).equal(true);
    expect(searchClient.searchRequest.geo.polygon ? searchClient.searchRequest.geo.polygon.length : 0).equal(2);
    expect(searchClient.searchRequest.geo.polygon ? searchClient.searchRequest.geo.polygon.findIndex(x => x.lat == 0 && x.lng == 0) < 0 : true).equal(false);
    expect(searchClient.searchRequest.geo.polygon ? searchClient.searchRequest.geo.polygon.findIndex(x => x.lat == 0 && x.lng == 1) < 0 : true).equal(false);

  }



}
