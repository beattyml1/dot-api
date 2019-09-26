import 'isomorphic-fetch';
import {Api, DynamicApi} from './index'
import fetchMock  from 'fetch-mock';
declare const describe, it, expect;

describe('api', () => {
    fetchMock.config.overwriteRoutes = true;
    it('should call GET /api/persons/123/address?city=Pittsburgh&state=PA without a structure map, using[]', async () => {
        expect.assertions(1)

        const api = Api('http://localhost/api', { get: () => Promise.resolve({ address: '1 PPG Place'}), del:null, post:null, put:null, patch:null}) as DynamicApi;

        let result = await api.persons[123].address.get({city: "Pittsburgh", state: 'PA'});

        expect(result).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });

    it('should call GET /api/persons/123/address?city=Pittsburgh&state=PA without a structure map, using()', async () => {
        expect.assertions(1)

        const api = Api('http://localhost/api', { get: () => Promise.resolve({ address: '1 PPG Place'}), del:null, post:null, put:null, patch:null}) as DynamicApi;

        let result = await api.persons(123).address.get({city: "Pittsburgh", state: 'PA'});

        expect(result).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });

    it('should call GET /api/persons/123/address?city=Pittsburgh&state=PA with a structure map', async () => {
        expect.assertions(1)
        const api = Api('http://localhost/api', { get: () => Promise.resolve({ address: '1 PPG Place'}), del:null, post:null, put:null, patch:null}, { structure: {
            persons: { $id: { address: true } }
            }
        }) as DynamicApi;

        let result = await api.persons(123).address.get({city: "Pittsburgh", state: 'PA'});

        expect(result).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });

    it('should call POST /api/persons/123/address without a structure map, using[]', async () => {
        expect.assertions(1)

        const api = Api('http://localhost/api', { post: () => Promise.resolve({ address: '1 PPG Place'}), del:null, get:null, put:null, patch:null}) as DynamicApi;

        let result = await api.persons[123].address.post({city: "Pittsburgh", state: 'PA'});

        expect(result).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });

    it('should call POST /api/persons/123/address without a structure map, using()', async () => {
        expect.assertions(1)

        const api = Api('http://localhost/api', {post: () => Promise.resolve({ address: '1 PPG Place'}), del:null, get:null, put:null, patch:null}) as DynamicApi;

        let result = await api.persons(123).address.post({city: "Pittsburgh", state: 'PA'});

        expect(result).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });

    it('should call POST /api/persons/123/address with a structure map', async () => {
        expect.assertions(1)

        const api = Api('http://localhost/api', { post: () => Promise.resolve({ address: '1 PPG Place'}), del:null, get:null, put:null, patch:null}, { structure: {
                persons: { $id: { address: true } }
            }
        }) as DynamicApi;

        let result = await api.persons(123).address.post({city: "Pittsburgh", state: 'PA'});

        expect(result).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });
});
