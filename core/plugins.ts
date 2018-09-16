import {Subscribable} from 'rxjs'

export default {
    cache: null as { get(url): Promise<any>, set(url, val: any)}|null,
    serverSubscription: null as { getObservable(url, query, setup: (x) => Subscribable<any>) } | null
}