import {HasAll} from "./ApiTypes";

export type Diff<T, U> = T extends U ? never : T; // Remove types/keys found in U
export type Filter<T, U> = T extends U ? T : never; // Remove types/keys not found in U
export type RemoveVerbs<T> = Diff<T, keyof HasAll>;

export type AnyFunction = (...args: any[]) => any;
export type ReturnType<T extends AnyFunction> =
    T extends (...args: any[]) => infer R
        ? R
        : never;

export type ApiStructureFunction<T> =
    T extends AnyFunction
        ? { $id: ApiStructureMap<ReturnType<T>> }
        : unknown;

export type ApiStructureChild<T> = (ApiStructureFunction<T> & ApiStructureMap<T>)
export type ApiStructureMap<T> = {
    [P in RemoveVerbs<keyof T>]: ApiStructureChild<T[P]>
}