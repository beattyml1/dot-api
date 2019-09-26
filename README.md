# dot-api

The core is dependency free but does depend on the ES fetch API which may need to be polyfilled for some browsers.
The Observable/WebSockets plugin (not done yet) will depend on rxjs but unless you setup your webpack/browerify or imports in an unusual way it shouldn't send it to the browser unless you actually import the plugin.

### Calling the API
```typescript
let result = await api.people('123').addresses.get({ x: 'hello', y: 'world'});
```

### Initializing
```typescript
let apiInner: ApiInner;
let api = Api('', apiInner, {}) as MyApi; // Strongly Typed
let api = Api('', apiInner, {structure}) as DynamicApi; // Dynamic
let api = Api('/api', apiInner, {structure }) as MyApi;
```

Where `ApiInner` is:
```typescript
interface ApiInner {
  get(params, ...args): Promise<any>;
  post(data, ...args): Promise<any>;
  put(data, ...args): Promise<any>;
  patch?(data, ...args): Promise<any>;
  del(...args): Promise<any>;
} 
```

ApiInner should handle setting headers/auth, any error handling, and it can either handle API base URL or you can have dot-api handle either works (this allows you to have a base API at one host but split into "API Modules"). 


### API Type Declaration
```typescript
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
```typescript 
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
