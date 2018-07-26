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

- numericFacets: Numeric facets as the name suggests, display items that have ranges of numeric values.

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

`.numericFacetsFilters(f1, lower-bound, upper-bound)` 

Here both lower-bound and upper-bound are inclusive. 

`.geo(lat,lng, radius)`

radius is in meters

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

