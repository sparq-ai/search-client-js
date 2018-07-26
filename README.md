# SearchTap Search Client

Search Client is a light weight search-only client to be used in applications which require search access to their SearchTap data and do not require full blown client [`@searchtap/client`]()

## Installation

Use following methods to install the package

### Yarn or NPM

- `yarn add @searchtap/searchclient`

- `npm i --save @searchtap/searchclient`

### Browser 

- TBA

## Usage 

### Create a New Client

```
var searchClient = new SearchClient(<app-id>, <search-token>);

var result = searhClient
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

