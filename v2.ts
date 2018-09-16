// export interface BaseNode { url: string, optionsAndHeaders: RequestInit }
// export interface HasGet<TReturn=any, TQuery=any> extends BaseNode {
//     get(query: TQuery): Promise<TReturn>;
// }
// export interface HasPost<TReturn=any, TData=any> extends BaseNode  {
//     post(data: TData): Promise<TReturn>;
// }
// export interface HasPut<TReturn=any, TData=any> extends BaseNode {
//     put(data: TData): Promise<TReturn>;
// }
// export interface HasPatch<TReturn=any, TData=any> extends BaseNode {
//     patch(data: TData): Promise<TReturn>;
// }
// export interface HasDelete<TReturn=any> extends BaseNode {
//     delete(): Promise<TReturn>;
// }
// export interface HasOptions<TReturn=any> extends BaseNode {
//     options(): Promise<TReturn>;
// }
//
// export interface HasAll extends HasGet, HasPost, HasPut, HasPatch, HasDelete, HasOptions{
// }
//
// export type Diff<T, U> = T extends U ? never : T;  // Remove types from T that are assignable to U
// export type Filter<T, U> = T extends U ? T : never;  // Remove types from T that are not assignable to U
//
// export type RemoveVerbs<T> = Diff<T, HasAll>
//
// export type AnyFunction = (...args: any[]) => any;
// export type ReturnType<T extends AnyFunction> =
//     T extends (...args: any[]) => infer R
//         ? R
//         : never;
//
// export const GET = "GET"
// export const POST = "POST"
// export const PUT = "PUT"
// export const PATCH = "PATCH"
// export const DELETE = "DELETE"
// export type Verb = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "PATCH";
// export type Struct = { $id: Struct } | { [resource:string]: Struct } | Verb[] | true;
// export type AddGetVerb<V extends Verb[]> = V extends "GET"[] ? HasGet : unknown;
// export type AddPostVerb<V extends Verb[]> = V extends "POST"[] ? HasPost : unknown;
// export type AddPutVerb<V extends Verb[]> = V extends "PUT"[] ? HasPut : unknown;
// export type AddDeleteVerb<V extends Verb[]> = V extends "DELETE"[] ? HasDelete : unknown;
// export type AddPatchVerb<V extends Verb[]> = V extends "PATCH"[] ? HasPatch : unknown;
// export type AddOptionsVerb<V extends Verb[]> = V extends "OPTIONS"[] ? HasOptions : unknown;
// export type InterfaceForVerbs<V extends Verb[]> =
//     AddGetVerb<V> & AddPostVerb<V> & AddPutVerb<V> & AddDeleteVerb<V> & AddPatchVerb<V> & AddOptionsVerb<V>
//
// export type ApiInterface<T> =
//     T extends true ? HasAll :
//     T extends Verb[] ? InterfaceForVerbs<T> : unknown;
//
// export type ApiIdFunction<T> =
//     T extends { $id: Struct } ?
//         (id: string) => Api<T['$id']> & { $id: (id: string) => Api<T['$id']> }:
//         unknown
//
// export type ApiChildren<T> =
//     { [K in keyof T]: Api<T[K]> };
//
// export type Api<T> =
//     ApiInterface<T> & ApiChildren<T> & ApiIdFunction<T>
//
// export function makeApi<T extends Struct>(struct: T): Api<T> {
//     throw "";
// }
//
// let struct: Struct = {
//     people: {
//         ...[GET,POST],
//         $id: {
//             ...[GET,PUT,DELETE],
//             address: [GET, POST, PUT]
//         }
//     }
// }
//
// let api = makeApi(struct);
//
// api.people('a').address;