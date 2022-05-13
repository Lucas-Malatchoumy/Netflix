const request = require('supertest');
const {jwt, verify }= require('jsonwebtoken');

const baseUrl = 'http://127.0.0.1:3001/Netflix/user';
const mock_user = require('./mock/user');
const user = {
    firstName: null,
    lastName: 'ElRancho',
    email: 'elrancho@gmail.com',
    password: '12345',
    adress: 'Rue de la paix',
    city: 'Franconville',
    zipCode: 'toto',
    profile: 'test.jpg'
}



describe(`${baseUrl}/user/`, () => {
    describe('POST register/ =>', () => {
        test('Should return status code 404 and an error because user already exist', async () => {
            const res = await request(baseUrl)
            .post('/register')
            .send(user);
            expect(res.statusCode).toBe(404)
            expect(JSON.stringify(res.body.error)).toBe(JSON.stringify('This user already exist'))
        }); 
        test("Should return status code 404 and an error because email doesn't have '@'", async () => {
            user.email = 'elranchaogmail.com';
            const res = await request(baseUrl)
            .post('/register')
            .send(user);
            expect(res.statusCode).toBe(404)
            expect(JSON.stringify(res.body.error)).toBe(JSON.stringify('some values are incorrect'))
        });
        test('Should return status code 404 and an error because firstname is empty', async () => {
            user.email = 'elranchao@gmail.com';
            const res = await request(baseUrl)
            .post('/register')
            .send(user);
            expect(res.statusCode).toBe(404)
            expect(JSON.stringify(res.body.error)).toBe(JSON.stringify('some values are incorrect'))
        });
        test('Should return status code 404 and an error because ZipCode is not a number', async () => {
            user.firstName = 'LuKas';
            const res = await request(baseUrl)
            .post('/register')
            .send(user);
            expect(res.statusCode).toBe(404)
            expect(JSON.stringify(res.body.error)).toBe(JSON.stringify('some values are incorrect'))
        });
        test('Should return status code 201, result and a token when create user with specific body', async () => {
            user.zipCode = 95;
            const res = await request(baseUrl)
            .post('/register')
            .send(user);
            const array = res.body;
            mock_user.user.body.id = array.body.id;
            mock_user.user.body.password = array.body.password;
            expect(res.statusCode).toBe(201)
            expect(JSON.stringify(res.body.message)).toBe(JSON.stringify('The user has been registered'))
            expect(JSON.stringify(array.body)).toBe(JSON.stringify(mock_user.user.body));
            mock_user.user.token = res.body.token;

        });
    });
    describe('GET login/ =>', () => {
        test('Should return status code 401 because email is not registered', async () => {
            const res = await request(baseUrl)
            .post('/login')
            .send({email: 'toto@gmail.com', password: mock_user.user.body.password});
            expect(res.statusCode).toBe(401)
            expect(JSON.stringify(res.body.error)).toBe(JSON.stringify("User doesn't exist"))
        });
        test('Should return status code 401 because password is incorrect', async () => {
            const res = await request(baseUrl)
            .post('/login')
            .send({email: mock_user.user.body.email, password: 'lala'});
            expect(res.statusCode).toBe(401)
            expect(JSON.stringify(res.body.error)).toBe(JSON.stringify("Password is incorrect!"))
        });
        test('Should get user with specific body', async () => {
            mock_user.user.body.password = '12345';
            const res = await request(baseUrl)
            .post('/login')
            .send({email: mock_user.user.body.email, password: mock_user.user.body.password});
            const goodToken = verify(res.body.token, 'mysecretToken');
            expect(JSON.stringify(goodToken.id)).toBe(JSON.stringify(mock_user.user.body.id))
        });
    });
    describe('DELETE register/ =>', () => {
        test('Should delete user', async () => {
            const res = await request(baseUrl)
            .delete('/delete').set('token', mock_user.user.token);
            const array = res.body.result;
            mock_user.user.body.password = array.password;
            expect(res.statusCode).toBe(200)
            expect(JSON.stringify(array)).toBe(JSON.stringify(mock_user.user.body));
            expect(JSON.stringify(res.body.message)).toBe(JSON.stringify('user has been deleted'))
        });
    });
})