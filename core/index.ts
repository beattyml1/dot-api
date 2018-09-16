import {apiNode, Node} from "./ApiNode";
export * from './ApiTypes'
export * from './StructureTypes'
export * from './StructureTypes'
import {ApiOptions} from "./ApiOptions";


export function Api<TResponse=Response, TError=Response>(
    url: string,
    optionsAndHeaders: RequestInit,
    options?: ApiOptions<TResponse, TError>
) {
    let { structure, processSuccess, processError } = options || {structure: null, processSuccess: x=>x, processError: e => { throw e; } };
    var apiProxy = {
        get: function (api: Node, prop: string) {
            return prop in api ? api[prop] : new Proxy(node(api.$url, prop, api.$optionsAndHeaders, id => Api(concatUrl(concatUrl(api.$url, prop), id), optionsAndHeaders), options), apiProxy);
        }
    };
    return structure ?
        construct(url, optionsAndHeaders, structure, options) as any :
        new Proxy(apiNode(url, optionsAndHeaders, k => Api(concatUrl(url, k), optionsAndHeaders), options), apiProxy) as any;
}

function node(url, key, optionsAndHeaders, id, apiOptions) {
    return apiNode(concatUrl(url, key), optionsAndHeaders, id, apiOptions);
}

function concatUrl(url, key) {
    return `${url}/${encodeURIComponent(key)}`
}

function construct(url: string, optionsAndHeaders: RequestInit, structure: any, apiOptions) {
    return Object.keys(structure).reduce((api, k) => {
        let nodeObj = node(url, k, optionsAndHeaders, id => Api(concatUrl(concatUrl(url, k), id), optionsAndHeaders, structure[k].$id), apiOptions);
        let isLeaf = typeof structure[k] === "boolean";
        let nodeWithKids = isLeaf ? nodeObj : Object.assign(nodeObj, construct(concatUrl(url, k), optionsAndHeaders, structure[k], apiOptions))
        return { ...api, [k]: nodeWithKids };
    }, {});
}


// Remove types from T that are assignable to U
// Remove types from T that are not assignable to U



// export type ApiStructureChild<T> =
//     T extends AnyFunction
//         ? { $: ApiStructureMap<ReturnType<T>> } | ApiStructureMap<ReturnType<T>> | ApiStructureMap<T> | true
//         : ApiStructureMap<T> | true