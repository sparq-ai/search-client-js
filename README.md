# SearchTap Search Client

## About

Search Client is a lightweight search-only client that handles only the searches. It can be used in applications that require search access to their data and don't require the full blown client [`@searchtap/client`]()

- The Search Client library makes it easy to send requests and retrieve search results from the server for you.
- The package supports the library and handles     so that you can focus on .

## Installation

You can use the following methods to install the package

### NPM or Yarn

- `npm i --save @searchtap/searchclient`

or

- `yarn add @searchtap/searchclient`


### Browser 

- TBA

## Usage 

### Create a New Client

To initiate, you will have to create a new client which would require an Application ID and search token (API Key). You can find both on your SearchTap account. Settings can be customized to tune the search behavior. For example, you can add the following:

- searchFields: Search would be applied on the fields defined here. For instance, Name, Price, etc. 

- textFacets: Text facets to be retrieved. For each of the retrieved facets (eg. color; size; brand), the response will contain a list of facet values (red, blue; small, large; zara…)

- numericFacets: Numeric facets as the name suggests, are facets with numeric values (eg. price, age)

- filter: Define criteria to further refine your search results. For instance, you can choose to remove Out of Stock" items from the search result page or show only the discounted products with 10% off or more by adding - .filter('discount >=10')

- search(<text-query>, <collection-id>): The above rules are applied on the defined text query here. The collection id can be found on your SearchTap account, this collection id is associated with a specific Application ID.

```
var searchClient = new SearchClient(<app-id>, <search-token>);

var result = searchClient
    .searchFields(f1,f2,f3,...)
    .textFacets(f1,f2,f3,...)
    .numericFacets(f1,f2,f3,..)
    .filter('')
    ...
    ...
    .search(<text-query>, <collection-id>)

```

## Options

`.searchFields(f1,f2,f3)` 

`.fields(f1,f2,f3)` 

`.textFacets(f1,f2,f3...)`

`.textFacetFilters(f1,['value-1','value-2'])`

```
.numericFacets(f1,[
    {
        min: 0,
        max: 100,
        minInclusive: true,         //default true
        maxInclusive: false         //default false
    }
])

```
Here min & max denote minimum and maximum values respectively. 

- minInclusive defines a minimum (inclusive) value of the facet. If true, then the defined min value will be included and if false then excluded.

- maxInclusive defines a inclusive maximum value of the facet. If maxinclusive is true, the defined max value will be included and if false then excluded.

For the above case, valid values would be 0 to 99.

`.numericFacetsFilters(f1, lower-bound, upper-bound)` 

Here both lower-bound and upper-bound are inclusive. 

`.geo(lat,lng, radius)`

lat is latitude and lng is longitude. Geo Search is also a way to refine search results by distance or around certain geo-locations. Results can be retrieved by filtering and sorting around a set of latitude and longitude coordinates. the closer the record is to the lat/lng you provided, the higher it is in the results. radius is in meters.

```
.geo([
    {
        lat:123.21, 
        lng:23.12
    }
])

```
`.skip(<skip-value>)`       //default 0
`.count(<value>)`           //default 30
`.facetCount(<value>)`      //default 100
`.sort(f1,f2,f3,...)`
`typoTolerance(<value>)`    //default 1

- skip is used to ignore results and count defines how many results you want to fetch. 
- facetCount: Defines the number of items you want to show for a defined facet. Default count value for facets is set as 100.
- sort: It can be used to further sort the results. For example - Price Low to High would display results starting from low price value to high.
- typoTolerance: Results with typos can also be shown in search results. By deafult, search queries with only 1 typo would be fetched.

Results

```
{
    textFacets: {
        category: [
            {
                label: "brand1",
                value: 100,
            },
            ...
        ]
    },
    numericFacets: {
        price: [
            {
                min: 0,
                max: 100,
                count: 500
            },
            ...
        ]
    },
    query: {}
    responseTime: 10,       
    results:[{
        ...
    }],
    totalCount: 1234
}





```

