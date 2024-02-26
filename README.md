# Sparq Search Client

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7b750a903df8454bbe0747aa74b23d54)](https://www.codacy.com/app/naveensky/search-client-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=sparq/search-client-js&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/sparq/search-client-js.svg?branch=master)](https://travis-ci.org/sparq/search-client-js) 
[![npm](https://img.shields.io/npm/dm/@sparq/search-client.svg)](https://www.npmjs.com/package/@sparq/search-client) 
[![NpmVersion](https://img.shields.io/npm/v/@sparq/search-client.svg)](https://www.npmjs.com/package/@sparq/search-client) 


[Sparq](https://www.sparq.ai/) is a subscription based hosted search solution for websites (eCommerce, Media and Publishing), mobile applications and enterprise software that delivers relevant results instantly. 

Search Client is a lightweight search-only client that handles only the searches. It can be used in applications that require search access to their data and don't require the full blown client `@sparq/client`. The Search Client library makes it easy to send requests and retrieve search results from the server for you.


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
- [`groupBy`](#group-by)
- [`groupCount`](#group-count)
- [`typoTolerance`](#typo-tolerance)

### 4. [Getting Help](#getting-help)

## Installation

##### Browser

`<script src='https://cdn.jsdelivr.net/npm/@sparq/search-client/lib/index.min.js'></script>`

##### NPM

`npm install @sparq/search-client --save`

##### YARN

`yarn add @sparq/search-client`

## Quick Start

### Initialize the Search Client

To initiate, you will have to create a new search client which would require an **Application ID** and a **Search Token**. You can find both on your [Sparq account](https://app.sparq.ai/login). 

> Always use your search-only tokens to make search operations from public clients like browser or mobile apps. Do not use your admin tokens on public facing clients. 

```
import SearchClient from "@sparq/search-client";
var searchClient = new SearchClient(<app-id>, <search-token>)
```

### Configure Search Settings

You can configure the default search settings by using various functions before making a search query. See an example below

```
    searchClient
        .searchFields(firstName, lastName, collegeName)
        .facets(college)
        ...
```

Look at the complete definitions for all methods available [here](#options)

### Search

You can initiate search by defining a text query and the collection id in the syntax below. Collection id can be found on your Sparq account, every collection id is associated with a specific application.

```
searchClient.search(<text-query>, <collection-id>)
```

### Search Results 

On a successful completion of search query, data in the following structure is returned. The textFacets and numericFacets might be empty depending if they were requested in the original query. 

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

## Methods

##### Search

`.search(...)` : Let's you execute a free text query for a given collection id.

``` 
searchClient.search(<text-query>, <collection-id>) 
```

##### Search Fields

`.searchFields(...)` `[array, optional]` : Search would be applied on the fields defined here. For instance - Name, Price, Category can be made searchable fields. See example below:

```
searchClient.searchFields(Name,Price,Category) 
```
The default behaviour is to search on all fields. 

##### Text Facets

`.textFacets(...)` `[array, optional]` : Text facets to be retrieved. For each of the retrieved facets (eg. color; size; brand), the response will contain a list of facet values (red, blue; small, large; zara…) and associated count of records for that facet value. 

> You would be require to configure facets on the Sparq dashboard for the collection before fetching its data. If not configured, you would receive an error. 

The default behaviour is to not fetch any facet values. 

```
searchClient.textFacets('color', 'size', 'brand')
```

##### Text Facet Filters

`.textFacetFilters(...)` `[optional]` : Further refine your search results by defining specific values of a text facet. For instance, if you wish to show results for specific brands only (zara & tommy hilfiger) while applying the facet 'Brand' - use following syntax. 

The default behavior is to apply no filters.

```
searchClient.textFacetFilters('Brand',['zara','tommy hilfiger']) 
```

##### Numeric Facets

`.numericFacets(...)` `[optional]`: Numeric facets as the name suggests, are facets with numeric values (eg. price, age). `.numericFacets` let's you define the ranges you want to show to the end user along with count of records in that range. You can use the same to create a histogram slider for your front-end UI. 

> You would be require to configure facets on the Sparq dashboard for the collection before fetching its data. If not configured, you would receive an error. 

The default behavior is to not fetch any numeric facet value. 

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

- `minInclusive` defines a minimum (inclusive) value of the facet. If true, then the defined min value will be included and if false then excluded.

- `maxInclusive` defines a inclusive maximum value of the facet. If true, the defined max value will be included and if false then excluded.

##### Numeric Facets Filters

`.numericFacetsFilters(...)` `[optional]` : Let's you define a lower and an upper bound value for a numeric facet to fetch results lying within the range. 

The default behavior is to apply no filter.

```
searchClient.numericFacetsFilters(price, 20, 80)
```

Here both lower-bound and upper-bound are inclusive. 

##### Filter

`.filter(...)` `[String, optional]` : Define criteria to further refine your search results. For instance, you can choose to remove Out of Stock" items from the search result page or show only the discounted products with 10% off or more by using following syntax. You can also combine multiple filter conditions by using keywords such as `AND`, `OR`, `NOT`. Feel free to group conditions using brackets `(...)`

- Simple Filter
```
searchClient.filter('discount >=10')
```

- Combine Multiple Filter Conditions
```
searchClient.filter('discount >= 10 AND quantity > 0')
```

- Group Filters
```
searchClient.filter ('discount >=10 AND (quantity > 0 OR isDigitalGood = 0)')
```

##### Geo (within circle)

`.geo(...)` `[optional]` : Geo Search is a way to refine search results by distance around a given `lat, lng` co-ordinates. The function is defined as - `searchClient.geo(lat,lng, radius)`, where `lat` is latitude, `lng` is longitude and `radius` is the maximum radius to search around the position (in meters).

When provided `.geo(...)` filter, results are sorted distance wise from the provided `lat,lng`, upto the `radius` provided. All results beyond the provided `radius` are removed from the results. If no `radius` is provided, results will not be limited but still be sorted on basis of distance from provided `lat,lng`. 

The default behavior is to not apply any geo filter. 

```
searchClient.geo(36.77, -119.41, 10000)
```

##### Geo (in a polygon)

`.geo(...)` also allows you to search within a provided polygonal area. You can define a polygon by providing multiple geo co-ordinates and results within those are returned. 

```
.geo([
    {
        lat:48.09, 
        lng:-104.82, 
    },
    {
        lat:46.85, 
        lng:-114.01, 
    },
    {
        lat:42.85, 
        lng:-106.31, 
    }
])
```

##### Skip

`.skip(...)` `[number, optional]` : `.skip(...)` is used in pagination to bypass a specified number of search results and then return the remaining results. The default value set for `skip` is 0. 

```
searchClient.skip(0)    
```

##### Count

`.count(...)` `[number, optional]` : Defines how many results you want to fetch for the given search query. The default value is 30. 

```
searchClient.count(30)         
```

##### Facet Count

`.facetCount(...)` `[number, optional]` : Defines the number of items you want to fetch for a defined facet. The default count value for facets is 100.

```
searchClient.facetCount(100)  
```

##### Sort

`.sort(...)` `[String, optional]` : It can be used to further sort the results. For example `-Price` low to high would display results starting from low price value to high.

```
searchClient.sort('-Price')
```
The above function can be used to sort search results by price in descending order.


##### Group By

`.groupBy(...)` `[String, optional]` : It can be used to club results into a group where records of same data field are combined. For eg. if you group results on a field `brand`, all results of same brand will appear together, followed by next group. 

```
searchClient.groupBy('brand')
```

##### Group Count

`.groupCount(...)` `[Number, optional]` : This defines the upper limit of records for a group. For eg. if groupCount value is set to 10, maximum of 10 results will be fetched in each group. 

```
searchClient.groupCount(10)
```


##### Typo Tolerance

`.typoTolerance(...)` `[number, optional]` : Results with typos can also be shown in search results. By default, search queries with only 1 typo will be fetched.

```
searchClient.typoTolerance(1)
```

## Getting Help

- **Need help?** Ask a question [here](https://github.com/sparq-ai/search-client-js/issues/new)
