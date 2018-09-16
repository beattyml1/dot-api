import {Api} from "./core/index";
import {DynamicApi, HasDelete, HasGet, HasOptions, HasPatch, HasPost, HasPut} from "./core/ApiTypes";
import {ApiStructureMap} from "./core/StructureTypes";

type StandardResource = HasOptions & HasGet<any[], any> & HasPost<any, any> & {
    [id: string]: HasGet<any, any> & HasPut<any, any> & HasDelete;
}

interface MyApi {
    people: StandardResource & {
        [id: string]: {
            addresses: HasOptions & HasGet<any[], any> & HasPost<any, any> & {
                [id: string]: HasDelete & HasPut<any, any>;
            }
        }
    };
}

interface MyApiLegacy {
    people: HasGet<any[], any> & HasPost & {
        (id): HasPut & HasDelete & {
            addresses: HasGet<any[], any> & HasPost<any, any> & {
                (id): HasDelete & HasPut<any, any>;
            }
        };
        nearMe: HasGet,
        me: HasGet & { (id): HasPut }
    };
}


let structure = {
    people: {
        $id: {
            addresses: { $id: {} }
        },
        nearMe: {},
        me: { $id: {} }
    }
} as ApiStructureMap<MyApiLegacy>

async function doStuff() {
    let headers = { ['authorization']: 'Bearer...' };

    let structured = Api('/api', { headers }) as MyApi;
    let result1 = await structured.people['123'].addresses.get({x: 'hello', y: 'world'});

    let dynamic = Api('/api', { headers }) as DynamicApi;
    let result2 = await dynamic.people['123'].addresses.get({ x: 'hello', y: 'world'})

    let legacy = Api('/api', { headers}, {structure}) as MyApiLegacy;
    let result3 = await legacy.people('123').addresses.get({ x: 'hello', y: 'world'})
}