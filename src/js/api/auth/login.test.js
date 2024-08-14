import { login } from './login';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ accessToken: 'mockedToken' }),
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
        await login('validEmail@noroff.no', 'validPassword');
        expect(localStorage.getItem('token')).toBe('mockedToken');
    });
});
