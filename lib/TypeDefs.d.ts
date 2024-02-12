export type ObjOfStringArray = {
    [propName: string]: string[];
};
export type Range = {
    min: number;
    minInclusive?: boolean;
    max: number;
    maxInclusive?: boolean;
};
export type GeoAround = {
    lat: number;
    lng: number;
    radius: number;
};
export type Point = {
    lat: number;
    lng: number;
};
export type GeoType = {
    around?: GeoAround;
    polygon?: Point[];
};
