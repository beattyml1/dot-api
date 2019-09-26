import {apiNode, Node} from "./ApiNode";
export * from './ApiTypes'
export * from './StructureTypes'
export * from './ApiOptions'
import {ApiOptions} from "./ApiOptions";


export function Api<TResponse=Response, TError=Response>(
    url: string,
    fetchFuncs: {get, post, put, del, patch},
    options?: ApiOptions<TResponse, TError>
) {
    let { structure } = options || {structure: null};
    var apiProxy = {
        get: function (api: Node, prop: string) {
            return prop in api ? api[prop] : new Proxy(node(api.$url, prop, api.$fetchFuncs, id => Api(concatUrl(concatUrl(api.$url, prop), id), fetchFuncs)), apiProxy);
        }
    };
    return structure ?
        construct(url, fetchFuncs, structure, options) as any :
        new Proxy(apiNode(url, fetchFuncs, k => Api(concatUrl(url, k), fetchFuncs)), apiProxy) as any;
}

function node(url, key, optionsAndHeaders, id) {
    return apiNode(concatUrl(url, key), optionsAndHeaders, id);
}

function concatUrl(url, key) {
    return `${url}/${encodeURIComponent(key)}`
}

function construct(url: string, fetchFuncs: {get, post, put, del, patch}, structure: any, apiOptions) {
    return Object.keys(structure).reduce((api, k) => {
        let nodeObj = node(url, k, fetchFuncs, id => Api(concatUrl(concatUrl(url, k), id), fetchFuncs, structure[k].$id));
        let isLeaf = typeof structure[k] === "boolean";
        let nodeWithKids = isLeaf ? nodeObj : Object.assign(nodeObj, construct(concatUrl(url, k), fetchFuncs, structure[k], apiOptions))
        return { ...api, [k]: nodeWithKids };
    }, {});
}
