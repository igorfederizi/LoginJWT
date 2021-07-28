const {User} = require("../../src/app/models");

describe('Teste de autenticação', () => {
    it('Should be login', async () => {
        const user = await User.create({
            name: 'Igor',
            email: 'igor.federizi@gmail.com',
            password: '123456'

        });

        console.log(user);

        expect(user.email).toBe('igor.federizi@gmail.com');


    })

})