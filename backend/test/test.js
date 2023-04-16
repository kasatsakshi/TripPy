import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index.js';

const assert = chai.assert;
chai.use(chaiHttp);
const expect = chai.expect;
const agent = chai.request.agent(app);

describe('User Login Test', function () {
    it('Successful login', () => {
        agent.post('/user/login')
        .send({
            "email": "atest2@sjsu.edu",
            "password": "abcd1234"
        })
        .then(function(res) {
            expect(res.status).to.equal(200);
        })
        .catch(error => {
            console.log(error);
        })
    })

    it('Invalid login', () => {
        agent.post('/user/login')
        .send({
            "email": "atest1@sjsu.edu",
            "password": "abcd1234"
        })
        .then(function(res) {
            expect(res.status).to.equal(400);
        })
        .catch(error => {
            console.log(error);
        })
    })
})

describe('User Signup Test', function () {
    // it('Successful login', () => {
    //     agent.post('/user/login')
    //     .send({
    //         "email": "atest2@sjsu.edu",
    //         "password": "abcd1234"
    //     })
    //     .then(function(res) {
    //         expect(res.status).to.equal(200);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // })
    // Unique Email and Username
    it('Invalid Signup', () => {
        agent.post('/user/signup')
        .send({
            "username": "aygupta",
            "email": "ayush.gupta@sjsu.edu",
            "password": "abcd123"
        })
        .then(function(res) {
            expect(res.status).to.equal(400);
        })
        .catch(error => {
            console.log(error);
        })
    })
})