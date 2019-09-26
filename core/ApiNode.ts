import {HasAll} from "./ApiTypes";
import plugins from "./plugins";
import {getUrl, queryString} from "./Urls";
import {ApiOptions} from "./ApiOptions";

export type Node = HasAll & { (id): HasAll };

export function apiNode(url: string, {get, post, put, del, patch}, $id: (key: string) => any) {
    let func = id => $id(id);
    let methods = {
        get(query) {
            return get(getUrl(url, query));
        },

        post(data) {
            return post(url, data)
        },

        put(data) {
            return put(url, data);
        },

        patch(data) {
            return put(url, data);
        },

        delete() {
            return del(url);
        },

        // async cachedGet(query) {
        //     let u = getUrl(url, query);
        //     let cached = plugins.cache && await plugins.cache.get(u);
        //     return cached || await wrapResponse(fetch(u, optionsAndHeaders));
        // },


        // observe(query) {
        //     if (plugins.serverSubscription&& apiOptions.generateSubscriptionStream) {
        //         return plugins.serverSubscription.getObservable(url, query, apiOptions.generateSubscriptionStream)
        //     }
        // },
    }
    return Object.assign(func, methods, {$id, $url: url, $fetchFuncs: {get, post, put, del, patch} }) as Node
}
