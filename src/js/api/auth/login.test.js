import { login } from './login';

const fetchMockTrue = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ accessToken: 'mockedToken' }),
    })
);

const fetchMockFalse = jest.fn(() =>
    Promise.resolve({
        ok: false,
        statusText: 'Login failed',
        json: () => Promise.resolve({}),
    })
);

global.localStorage = {
    mockedStorage: {},
    setItem: jest.fn(function (key, value) {
        this.mockedStorage[key] = JSON.parse(value);
        console.log('localStorage.setItem called. Stored values: ', this.mockedStorage);
    }),
    getItem: jest.fn(function (key) {
        return this.mockedStorage[key];
    }),
};

describe('Login', () => {
    it('should store the valid token in localStorage', async () => {
        global.fetch = fetchMockTrue;
        await login('not important', 'here');
        expect(localStorage.getItem('token')).toBe('mockedToken');
    });
    it('should throw an exception when response from fetch is false', async () => {
        global.fetch = fetchMockFalse;
        await expect(login('not important', 'here')).rejects.toThrow('Login failed');
    });
});
