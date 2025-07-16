import request from 'supertest';
import { assert, expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { generateUser, expectSuccessResponse, expectValidId, expectValidArray, expectValidObject } from '../utils';

const infra = Application.instance();

describe('02 - User Management Tests', function () {
    var agent = request.agent(infra._app);

    it('02:01 -> Create new user', function (done) {
        const userData = generateUser();
        agent
            .post('/api/v1/users')
            .set('Content-Type', 'application/json')
            .send(userData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'userId');
                setTestData(response.body.Data, 'userData');
            })
            .expect(201, done);
    });

    it('02:02 -> Get user by ID', function (done) {
        const userId = getTestData('userId');
        agent
            .get(`/api/v1/users/${userId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(userId);
            })
            .expect(200, done);
    });

    it('02:03 -> Update user', function (done) {
        const userId = getTestData('userId');
        const updateData = {
            firstName: 'Updated',
            lastName: 'Name'
        };
        agent
            .put(`/api/v1/users/${userId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.firstName).to.equal('Updated');
            })
            .expect(200, done);
    });

    it('02:04 -> Search users', function (done) {
        agent
            .get('/api/v1/users/search')
            .set('Content-Type', 'application/json')
            .query({ searchTerm: 'test' })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('02:05 -> Get all users', function (done) {
        agent
            .get('/api/v1/users/all')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('02:06 -> Delete user', function (done) {
        const userId = getTestData('userId');
        agent
            .delete(`/api/v1/users/${userId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Negative test cases
    it('02:07 -> Create user with invalid data', function (done) {
        const invalidUserData = {
            email: 'invalid-email',
            phone: 'invalid-phone'
        };
        agent
            .post('/api/v1/users')
            .set('Content-Type', 'application/json')
            .send(invalidUserData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('02:08 -> Get non-existent user', function (done) {
        agent
            .get('/api/v1/users/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('02:09 -> Update non-existent user', function (done) {
        const updateData = { firstName: 'Updated' };
        agent
            .put('/api/v1/users/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('02:10 -> Delete non-existent user', function (done) {
        agent
            .delete('/api/v1/users/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 