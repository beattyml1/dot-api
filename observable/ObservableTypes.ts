import {BaseNode} from "../core/ApiTypes";
import {Observable} from "rxjs";

export interface CanObserve<TReturn = any, TQuery = any> extends BaseNode {
    observe(query: TQuery): Observable<TReturn>
}