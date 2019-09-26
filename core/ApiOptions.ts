export interface ApiOptions<TResponse=Response, TError=Response> {
    structure?: any,
    // formatMultiWord?: (x: string[]) => string,
    // autoGetOnChange?: boolean,
    // generateSubscriptionStream?: (location: { pathParts: string[], query: any, queryString:string, resourcePath: string, pathWithQuery: string, webSocketUrl: string})
    //     => Subscribable<any>
}
