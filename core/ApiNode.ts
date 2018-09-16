import {HasAll} from "./ApiTypes";
import plugins from "./plugins";
import {getUrl, queryString} from "./Urls";

export class ApiNode implements HasAll {
    constructor(public $url: string, public $optionsAndHeaders: RequestInit, public apiOptions) {
    }

    get(query) {
        let url = getUrl(this.$url, query);
        console.log('GET', url)
        return fetch(url, this.$optionsAndHeaders);
    }

    post(data) {
        return fetch(this.$url, {method: 'POST', body: JSON.stringify(data), ...this.$optionsAndHeaders})
    }

    put(data) {
        return fetch(this.$url, {method: 'PUT', body: JSON.stringify(data), ...this.$optionsAndHeaders})
    }

    patch(data) {
        return fetch(this.$url, {method: 'PATCH', body: JSON.stringify(data), ...this.$optionsAndHeaders})
    }

    delete() {
        return fetch(this.$url, {method: 'DELETE', ...this.$optionsAndHeaders})
    }

    options() {
        return fetch(this.$url, {method: 'OPTIONS', ...this.$optionsAndHeaders})
    }

    cachedGet(query) {
        let url = getUrl(this.$url, query);
        let cached = plugins.cache && plugins.cache.get(url);
        return cached || fetch(url, this.$optionsAndHeaders);
    }

    observe(query) {
        if (plugins.serverSubscription&& this.apiOptions.generateSubscriptionStream) {
            return plugins.serverSubscription.getObservable(this.$url, query, this.apiOptions.generateSubscriptionStream)
        }
    }
}

export type Node = HasAll & { (id): HasAll };

export function apiNode(url: string, optionsAndHeaders: RequestInit, $id: (key: string) => any, apiOptions) {
    let func = id => $id(id);
    let methods = {
        get(query) {
            let u = getUrl(url, query);
            return fetch(u, optionsAndHeaders);
        },

        post(data) {
            return fetch(url, {method: 'POST', body: JSON.stringify(data), ...optionsAndHeaders})
        },

        put(data) {
            return fetch(url, {method: 'PUT', body: JSON.stringify(data), ...optionsAndHeaders})
        },

        patch(data) {
            return fetch(url, {method: 'PATCH', body: JSON.stringify(data), ...optionsAndHeaders})
        },

        delete() {
            return fetch(url, {method: 'DELETE', ...optionsAndHeaders})
        },

        options() {
            return fetch(url, {method: 'OPTIONS', ...optionsAndHeaders})
        },

        cachedGet(query) {
            let u = getUrl(url, query);
            let cached = plugins.cache && plugins.cache.get(u);
            return cached || fetch(u, optionsAndHeaders);
        },


        observe(query) {
            if (plugins.serverSubscription&& apiOptions.generateSubscriptionStream) {
                return plugins.serverSubscription.getObservable(url, query, apiOptions.generateSubscriptionStream)
            }
        },
    }
    return Object.assign(func, methods, {$id, $url: url, $optionsAndHeaders: optionsAndHeaders}) as Node
}