# SearchTap Search Client

[SearchTap](https://www.searchtap.io/) is a subscription based hosted search solution for websites (eCommerce, Media and Publishing), mobile applications and enterprise software that delivers relevant results instantly. 

Search Client is a lightweight search-only client that handles only the searches. It can be used in applications that require search access to their data and don't require the full blown client `@searchtap/client`. The Search Client library makes it easy to send requests and retrieve search results from the server for you.

## Table of Contents

### 1. [Installation](#installation)

- [Browser](#browser)
- [NPM](#npm)
- [Yarn](#yarn)

### 2. [Quick Start](#quick-start)

- [Initialize the client](#initialize-the-search-client)
- [Configure Search Settings](#configure-search-settings)
- [Search](#search)
- [Search Results](#search-results)

### 3. [Search Options](#options)

- [`searchFields`](#search-fields)
- [`facetFields`](#facet-fields)
- [`textFacets`](#text-facets)
- [`textFacetFilters`](#text-facet-filters)
- [`numericFacets`](#numeric-facets)
- [`numericFacetsFilters`](#numeric-facets-filters)
- [`filter`](#filter)
- [`geo`](#geo)
- [`skip`](#skip)
- [`count`](#count)
- [`facetCount`](#facet-count)
- [`sort`](#sort)
- [`typoTolerance`](#typo-tolerance)

### 4. [Getting Help](#getting-help)

## Installation

##### Browser

`<script src='https://cdn.jsdelivr.net/npm/@searchtap/search-client/lib/index.min.js'></script>`

##### NPM

`npm install @searchtap/search-client --save`

##### YARN

`yarn add @searchtap/search-client`

## Quick Start

### Initialize the Search Client

To initiate, you will have to create a new search client which would require an **Application ID** and a **Search Token**. You can find both on your SearchTap account. 

> Always use your search-only tokens to make search operations from public clients like browser or mobile apps. Do not use your admin tokens on public facing clients. 

```
var searchClient = new SearchClient(<app-id>, <search-token>);
```

### Configure Search Settings

You can configure the default search settings by using various functions before making a search query. See an example below

```
    searchClient
        .searchFields(firstName, lastName, collegeName)
        .facets(college)
        ...
```

Look at the complete definitions for all options available [here](#options)

### Search

You can initiate search by defining a text query and the collection id in the syntax below. Collection id can be found on your SearchTap account, every collection id is associated with a specific application.

```
searchClient.search(<text-query>, <collection-id>)
```

### Search Results 

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

## Options

##### Search Fields

`searchFields(...)` `[array, optional]` :  Search would be applied on the fields defined here. For instance, Name, Price, etc. The default behaviour is to search on all fields. 

```
searchClient.searchFields(f1,f2,f3,...) 
```

##### Text Facets

`textFacets(...)` `[array, optional]` : Text facets to be retrieved. For each of the retrieved facets (eg. color; size; brand), the response will contain a list of facet values (red, blue; small, large; zara…) and associated count of records for that facet value. The default behaviour is to not fetch any facet values. 

```
searchClient.textFacets(f1,f2,f3,...)
```

##### Text Facet Filters

`textFacetFilters(...)` `[optional]` : Further refine your search results by defining specific values of a text facet. For instance, if you wish to show results for specific brands only (zara & tommy hilfiger) while applying the facet 'Brand' - use following syntax. 

The default behavior is to apply no filters.

```
searchClient.textFacetFilters('Brand',['zara','tommy hilfiger']) 
```

##### Numeric Facets

`numericFacets(...)` `[optional]`: Numeric facets as the name suggests, are facets with numeric values (eg. price, age). `numericFacets` let's you define the ranges you want to show to the end user along with count of records in that range. You can use the same to create a histogram slider for your front-end UI. 

See following example to understand how to define facet object, 

**Example**

```
searchClient.numericFacets("Price",[
    {
        min: 0,
        max: 100,
        minInclusive: true,         //default true
        maxInclusive: false         //default false
    },
    {
        min: 100,
        max: 500,
        minInclusive: true,         //default true
        maxInclusive: false         //default false
    }
   ])
```
For the above case, valid ranges would be:

- Price Rs. 0 to 99 
- Price Rs. 100 to 499

Here `min` & `max` denote minimum and maximum values respectively. 

`minInclusive` defines a minimum (inclusive) value of the facet. If true, then the defined min value will be included and if false then excluded.

`maxInclusive` defines a inclusive maximum value of the facet. If true, the defined max value will be included and if false then excluded.

##### Numeric Facets Filters

`numericFacetsFilters` `[optional]` : let's you define a lower and an upper bound value for a numeric facet to fetch results lying within the range. 

The default behavior is to apply no filter.

```
.numericFacetsFilters(price, 20, 80)
```

Here both lower-bound and upper-bound are inclusive. 

##### Filter

`filter`: Define criteria to further refine your search results. For instance, you can choose to remove Out of Stock" items from the search result page or show only the discounted products with 10% off or more by using following syntax. You can also combine multiple filter conditions by using keywords such as `AND`, `OR`, `NOT`. Feel free to group conditions using brackets `(...)`

**Simple Filter**
```
.filter('discount >=10')
```

**Combine Multiple Filter Conditions**
```
.filter('discount >= 10 AND quantity > 0')
```

**Group Filters**
```
.filter('discount >=10 AND (quantity > 0 OR isDigitalGood = 0)')
```

##### Geo

`geo(lat,lng, radius)` `[optional]`:  `lat` is latitude, `lng` is longitude, `radius` is in meters. 

Geo Search is also a way to refine search results by distance around a given `lat, lng` co-ordinates. The closer the record is to the `lat,lng` provided, the higher it is in the results. 

If no `radius` is provided, results will not be limited but still be sorted on basis of distance from provided `lat,lng`.

The default behavior is to not apply any geo filter. 

```
.geo([
    {
        lat:123.21, 
        lng:23.12, 
        radius: 30000
    }
])

```

##### Skip & Count

`skip` is used to ignore results and `count` defines how many results you want to fetch. 

```
.skip(<skip-value>)       //default 0
.count(<value>)           //default 30
```

##### Facet Count

`facetCount`: Defines the number of items you want to show for a defined facet. Default count value for facets is set as 100.

```
.facetCount(<value>)      //default 100
```

##### Sort

`sort`: It can be used to further sort the results. For example - Price low to high would display results starting from low price value to high.

```
.sort(f1,f2,f3,...)
```

##### Typo Tolerance

`typoTolerance`: Results with typos can also be shown in search results. By default, search queries with only 1 typo will be fetched.

```
.typoTolerance(<value>)    //default 1
```

## Getting Help

- **Need help?** Ask a question [here](https://github.com/searchtap/search-client-js/issues/new)
