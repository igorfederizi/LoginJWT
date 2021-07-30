const request = require('supertest');
const app = require('../../src/app')
const factory = require('../factories');
const truncate = require('../utils/truncate');

describe('Teste de autenticação', () => {
    beforeEach(async () => {
        await truncate();

    })

    it('Should autenticate with valid credentials', async () => {
        const user = await factory.create('User', {
            password: '123456'

        });

        console.log(user);

        const response = await request(app)
            .post('/sessions')
            .send({
            email: user.email,
            password: "123456"
        });

        expect(response.status).toBe(200);

    });

    it('Should not autentication with invalid credentials', async() => {

     const user = await factory.create('User', {
            password: '123123'

        });

        const response = await request(app)
            .post('/sessions')
            .send({
            email: user.email,
            password: "789"
        });

        expect(response.status).toBe(401);
    });

    it('Recebimento  de token JWT', async() => {

     const user = await factory.create('User', {
            password: '123456'

        });

        const response = await request(app)
            .post('/sessions')
            .send({
            email: user.email,
            password: "123456"
        });

        expect(response.body).toHaveProperty('token');


    });

})