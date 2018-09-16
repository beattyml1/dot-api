# dot-api

The core is dependency free but does depend on the ES fetch API which may need to be polyfilled for some browsers.
The Observable/WebSockets plugin (not done yet) will depend on rxjs but unless you setup your webpack/browerify or imports in an unusual way it shouldn't send it to the browser unless you actually import the plugin.

### Creating and calling the api
```TS
let api = Api(apiBaseUrl, { headers}, {structure}) as MyApi;
let result = await api.people('123').addresses.get({ x: 'hello', y: 'world'});
let data = result.json(); // Just returns a fetch result by default
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
