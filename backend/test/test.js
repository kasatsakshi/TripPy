import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

const assert = chai.assert;
chai.use(chaiHttp);
const expect = chai.expect;
const agent = chai.request.agent(app);

describe('User Login Test', function () {
    it('Successful login', () => {
        agent.post('/user/login')
        .send({
            "username": "aygupta",
            "password": "abcd123"
        })
        .then(function(res) {
            expect(res.status).to.equal(200);
        })
        .catch(error => {
            console.log(error);
        })
    })
})