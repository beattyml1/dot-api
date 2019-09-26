# dot-api: An ultra readible API Client Library

So readible you won't need to wrap it. Dependency free. Wrap's whatever handling you already have. Use with either fetch, axios, or whatever custom setup you have. Any thing that exposes get, post, etc functions and returns a promise should work

```sh
npm install --save dot-api
```

### Calling the API
```typescript
let result = await api.people('123').addresses.get({ city: 'Pittsburgh', state: 'PA'});
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
