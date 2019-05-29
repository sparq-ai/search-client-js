export interface TrackingData {
  queryId: string;
  collection: string;
  items: [{ rank: number, label: string }],
  meta: {
    "ip"?: string,        //IP ADDRESS
    "ua"?: string,        //User Agent
    "lng"?: string,       // Language
    "cd"?: number,        //Color Depth
    "sr"?: string,       // Screen Resolution
    "vp"?: string,       //View Port
    "tz"?: string,       // Time Zone
    "tzo"?: string,      // Time Zone Offset,
    "os"?: string,         // Operating System
    "st"?: string,         //Search  Time (ms) as recorded for entire transaction to complete on browser/client side
    "ref"?: string,       // Referrer for this page. Only applicable for browsers
    "s"?: string,          // The current URL/app/server side script which has triggered the search request
    "c"?: string,         // The name of the SDK client which has been used to trigger the search/analytics request
    "cv"?: string         //The version of the client to be used
  }
}