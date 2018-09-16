export interface BaseNode {
    $url: string,
    $optionsAndHeaders: RequestInit
}

export interface HasGet<TReturn = any, TQuery = any> extends BaseNode {
    get(query: TQuery): Promise<TReturn>;
}

export interface HasPost<TReturn = any, TData = any> extends BaseNode {
    post(data: TData): Promise<TReturn>;
}

export interface HasPut<TReturn = any, TData = any> extends BaseNode {
    put(data: TData): Promise<TReturn>;
}

export interface HasPatch<TReturn = any, TData = any> extends BaseNode {
    patch(data: TData): Promise<TReturn>;
}

export interface HasDelete<TReturn = any> extends BaseNode {
    delete(): Promise<TReturn>;
}

export interface HasOptions<TReturn = any> extends BaseNode {
    options(): Promise<TReturn>;
}

export interface HasAll extends HasGet, HasPost, HasPut, HasPatch, HasDelete, HasOptions {
}

export interface HasGetCached <TReturn = any, TQuery = any> extends BaseNode {
    cachedGet(query: TQuery): Promise<TReturn>;
}

export interface DynamicApi extends HasAll {
    [id: string]: DynamicApi | any
}