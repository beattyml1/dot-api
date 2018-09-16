export function queryString(query) {
    let queryStringParamEncode = k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`
    return query && Object.keys(query).map(queryStringParamEncode).join('&');
}

export function getUrl(resource, query) {
    let qs = queryString(query)
    return qs ? `${resource}?${qs}` : resource;
}