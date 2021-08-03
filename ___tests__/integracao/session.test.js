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

    it('Should be able to access private routes when autenthicated', async () => {

         const user = await factory.create('User', {
            password: '123456'

        });

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);

    });

    it('should not be able to access private routes whithout jwt token', async () => {

        const response = await request(app)
        .get("/dashboard");

        expect(response.status).toBe(401);

    });

    it('Should not be able to acces pricate routes with invalid jwt token', async () => {

        const response = await request(app)
        .get("/dashboard")
        .set("Autorization", `Bearer 123456`);

        expect(response.status).toBe(401);


    });
});