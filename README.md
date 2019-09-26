# dot-api: An ultra readible API Client Library

So readible you won't need to wrap it. Dependency free. Wrap's whatever handling you already have. Use with either fetch, axios, or whatever custom setup you have. Any thing that exposes get, post, etc functions and returns a promise should work

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
