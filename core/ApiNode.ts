import {HasAll} from "./ApiTypes";
import plugins from "./plugins";
import {getUrl, queryString} from "./Urls";
import {ApiOptions} from "./ApiOptions";

export type Node = HasAll & { (id): HasAll };

export function apiNode(url: string, optionsAndHeaders: RequestInit, $id: (key: string) => any, apiOptions?: ApiOptions<any, any>) {
    let func = id => $id(id);
    let wrapResponse = (promise) => {
        promise = (apiOptions && apiOptions.processSuccess) ? promise.then(apiOptions.processSuccess) : promise;
        promise = (apiOptions && apiOptions.processError) ? promise.catch(apiOptions.processError) : promise;
        return promise;
    };
    let methods = {
        get(query) {
            let u = getUrl(url, query);
            return wrapResponse(fetch(u, optionsAndHeaders));
        },

        post(data) {
            return wrapResponse(fetch(url, {method: 'POST', body: JSON.stringify(data), ...optionsAndHeaders}));
        },

        put(data) {
            return wrapResponse(fetch(url, {method: 'PUT', body: JSON.stringify(data), ...optionsAndHeaders}));
        },

        patch(data) {
            return wrapResponse(fetch(url, {method: 'PATCH', body: JSON.stringify(data), ...optionsAndHeaders}));
        },

        delete() {
            return wrapResponse(fetch(url, {method: 'DELETE', ...optionsAndHeaders}))
        },

        options() {
            return wrapResponse(fetch(url, {method: 'OPTIONS', ...optionsAndHeaders}));
        },

        async cachedGet(query) {
            let u = getUrl(url, query);
            let cached = plugins.cache && await plugins.cache.get(u);
            return cached || await wrapResponse(fetch(u, optionsAndHeaders));
        },


        // observe(query) {
        //     if (plugins.serverSubscription&& apiOptions.generateSubscriptionStream) {
        //         return plugins.serverSubscription.getObservable(url, query, apiOptions.generateSubscriptionStream)
        //     }
        // },
    }
    return Object.assign(func, methods, {$id, $url: url, $optionsAndHeaders: optionsAndHeaders}) as Node
}