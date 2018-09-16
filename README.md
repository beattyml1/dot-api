# api-dot

## Creating and calling the api
Really cool syntax
```TS
let structured = Api(apiBaseUrl, { headers }) as MyApi; // Can use DynamicApi if dynamic typing of resources is desired
let result1 = await structured.people['123'].addresses.get({x: 'hello', y: 'world'});
```

IE Compatible syntax
```TS
let legacy = Api(apiBaseUrl, { headers}, {structure}) as MyApi;
let result3 = await legacy.people('123').addresses.get({ x: 'hello', y: 'world'})
```

## API Type Declaration
Really cool syntax
```TS
interface MyApi {
    people: HasGet<any[], any> & HasPost & {
        [id: string]: {
            addresses: HasGet<any[], any> & HasPost<any, any> & {
                [id: string]: HasDelete & HasPut<any, any>;
            }
        },
        nearMe: HasGet,
        me: HasGet & { (id): HasPut }
    };
}
```

IE Compatible Syntax
```TS
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
```

## Definining a Structure object to support IE (or move processing time from the time of API call to app init)
```TS 
let structure = {
    people: {
        $id: {
            addresses: { $id: {} }
        },
        nearMe: {},
        me: { $id: {} }
    }
} as ApiStructureMap<MyApiLegacy>
```
