import 'isomorphic-fetch';
import {Api, DynamicApi} from './index'
import fetchMock  from 'fetch-mock';
declare const describe, it, expect;

describe('api', () => {
    fetchMock.config.overwriteRoutes = true;
    it('should call GET /api/persons/123/address?city=Pittsburgh&state=PA without a structure map, using[]', async () => {
        expect.assertions(2)
        const myMock = fetchMock.get('http://localhost/api/persons/123/address?city=Pittsburgh&state=PA', { address: '1 PPG Place'});

        const api = Api('http://localhost/api', { headers: { ['auth']: '123'}}) as DynamicApi;

        let result = await api.persons[123].address.get({city: "Pittsburgh", state: 'PA'});

        expect(myMock.called('http://localhost/api/persons/123/address?city=Pittsburgh&state=PA')).toBe(true);
        expect(JSON.parse(result.body)).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });

    it('should call GET /api/persons/123/address?city=Pittsburgh&state=PA without a structure map, using()', async () => {
        expect.assertions(2)
        const myMock = fetchMock.get('http://localhost/api/persons/123/address?city=Pittsburgh&state=PA', { address: '1 PPG Place'});

        const api = Api('http://localhost/api', { headers: { ['auth']: '123'}}) as DynamicApi;

        let result = await api.persons(123).address.get({city: "Pittsburgh", state: 'PA'});

        expect(myMock.called('http://localhost/api/persons/123/address?city=Pittsburgh&state=PA')).toBe(true);
        expect(JSON.parse(result.body)).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });

    it('should call GET /api/persons/123/address?city=Pittsburgh&state=PA with a structure map', async () => {
        expect.assertions(2)
        const myMock = fetchMock.get('http://localhost/api/persons/123/address?city=Pittsburgh&state=PA', { address: '1 PPG Place'});

        const api = Api('http://localhost/api', { headers: { ['auth']: '123'}}, { structure: {
            persons: { $id: { address: true } }
            }
        }) as DynamicApi;

        let result = await api.persons(123).address.get({city: "Pittsburgh", state: 'PA'});

        expect(myMock.called('http://localhost/api/persons/123/address?city=Pittsburgh&state=PA')).toBe(true);
        expect(JSON.parse(result.body)).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });

    it('should call POST /api/persons/123/address without a structure map, using[]', async () => {
        expect.assertions(2)
        const myMock = fetchMock.post('http://localhost/api/persons/123/address', { address: '1 PPG Place'});

        const api = Api('http://localhost/api', { headers: { ['auth']: '123'}}) as DynamicApi;

        let result = await api.persons[123].address.post({city: "Pittsburgh", state: 'PA'});

        expect(myMock.called('http://localhost/api/persons/123/address', {method: 'POST'})).toBe(true);
        expect(JSON.parse(result.body)).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });

    it('should call POST /api/persons/123/address without a structure map, using()', async () => {
        expect.assertions(2)
        const myMock = fetchMock.post('http://localhost/api/persons/123/address', { address: '1 PPG Place'});

        const api = Api('http://localhost/api', { headers: { ['auth']: '123'}}) as DynamicApi;

        let result = await api.persons(123).address.post({city: "Pittsburgh", state: 'PA'});

        expect(myMock.called('http://localhost/api/persons/123/address', {method: 'POST'})).toBe(true);
        expect(JSON.parse(result.body)).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });

    it('should call POST /api/persons/123/address with a structure map', async () => {
        expect.assertions(2)
        const myMock = fetchMock.post('http://localhost/api/persons/123/address', { address: '1 PPG Place'});

        const api = Api('http://localhost/api', { headers: { ['auth']: '123'}}, { structure: {
                persons: { $id: { address: true } }
            }
        }) as DynamicApi;

        let result = await api.persons(123).address.post({city: "Pittsburgh", state: 'PA'});

        expect(myMock.called('http://localhost/api/persons/123/address', {method: 'POST'})).toBe(true);
        expect(JSON.parse(result.body)).toMatchObject({ address: '1 PPG Place'});
        fetchMock.restore();
    });
});