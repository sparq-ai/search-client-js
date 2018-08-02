export declare type ObjOfStringArray = {
    [propName: string]: string[];
};
export declare type Range = {
    min: number;
    minInclusive?: boolean;
    max: number;
    maxInclusive?: boolean;
};
export declare type GeoAround = {
    lat: number;
    lng: number;
    radius: number;
};
export declare type Point = {
    lat: number;
    lng: number;
};
export declare type GeoType = {
    around?: GeoAround;
    polygon?: Point[];
};
