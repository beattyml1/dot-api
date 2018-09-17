# dot-api: An ultra readible API Client Library

So readible you won't need to wrap it. Dependency free but does depend on the ES fetch API which may need to be polyfilled for some browsers.

```sh
npm install --save dot-api
```

### Calling the API
```TS
let result = await api.people('123').addresses.get({ city: 'Pittsburgh', state: 'PA'});
```

### Initializing
```TS
let api = Api(apiBaseUrl, { headers}, {processSuccess: r => r.json()}) as MyApi; // Strongly Typed
let api = Api(apiBaseUrl, { headers}, {structure}) as DynamicApi; // Dynamic
let api = Api('/api', { headers}, {structure, processSuccess: r => r.json() }) as MyApi;
```

### API Type Declaration
```TS
interface MyApi {
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

### Definining a Structure object to support IE (or move processing time from the time of API call to app init)
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
