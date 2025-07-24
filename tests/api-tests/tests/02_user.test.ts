import request from 'supertest';
import { expect } from 'chai';
import Application from '../../../src/app';
import { describe, it, before, after } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { generateUser, expectSuccessResponse, expectValidId, expectValidArray, expectValidObject } from '../utils';

const infra = Application.instance();

describe('02 - User Management Tests', function () {
    this.timeout(10000); // 10 second timeout for user tests
    const agent = request.agent(infra.app);

    before(function () {
        console.log('Starting User Management Tests...');
    });

    it('02:01 -> Create new user', async () => {
        console.log('Running create user test...');
        const userData = generateUser();
        const response = await agent
            .post('/api/v1/users')
            .set('Content-Type', 'application/json')
            .send(userData);

        expectSuccessResponse(response);
        expectValidId(response);
        setTestData(response.body.Data.id, 'userId');
        setTestData(response.body.Data, 'userData');
        expect(response.status).to.equal(201);
        console.log('Create user test completed.');
    });

    it('02:02 -> Get user by ID', async () => {
        console.log('Running get user test...');
        const userId = getTestData('userId');
        const response = await agent
            .get(`/api/v1/users/${userId}`)
            .set('Content-Type', 'application/json');

        expectSuccessResponse(response);
        expectValidObject(response);
        expect(response.body.Data.id).to.equal(userId);
        expect(response.status).to.equal(200);
        console.log('Get user test completed.');
    });

    it('02:03 -> Update user', async () => {
        console.log('Running update user test...');
        const userId = getTestData('userId');
        const updateData = {
            firstName: 'Updated',
            lastName: 'Name'
        };
        const response = await agent
            .put(`/api/v1/users/${userId}`)
            .set('Content-Type', 'application/json')
            .send(updateData);

        expectSuccessResponse(response);
        expectValidObject(response);
        expect(response.body.Data.firstName).to.equal('Updated');
        expect(response.status).to.equal(200);
        console.log('Update user test completed.');
    });

    it('02:04 -> Search users', async () => {
        console.log('Running search users test...');
        const response = await agent
            .get('/api/v1/users/search')
            .set('Content-Type', 'application/json')
            .query({ searchTerm: 'test' });

        expectSuccessResponse(response);
        expectValidArray(response);
        expect(response.status).to.equal(200);
        console.log('Search users test completed.');
    });

    it('02:05 -> Get all users', async () => {
        console.log('Running get all users test...');
        const response = await agent
            .get('/api/v1/users/all')
            .set('Content-Type', 'application/json');

        expectSuccessResponse(response);
        expectValidArray(response);
        expect(response.status).to.equal(200);
        console.log('Get all users test completed.');
    });

    it('02:06 -> Delete user', async () => {
        console.log('Running delete user test...');
        const userId = getTestData('userId');
        const response = await agent
            .delete(`/api/v1/users/${userId}`)
            .set('Content-Type', 'application/json');

        expectSuccessResponse(response);
        expect(response.status).to.equal(200);
        console.log('Delete user test completed.');
    });

    // Negative test cases
    it('02:07 -> Create user with invalid data', async () => {
        console.log('Running create user with invalid data test...');
        const invalidUserData = {
            email: 'invalid-email',
            phone: 'invalid-phone'
        };
        const response = await agent
            .post('/api/v1/users')
            .set('Content-Type', 'application/json')
            .send(invalidUserData);

        expect(response.status).to.be.oneOf([400, 422]);
        console.log('Create user with invalid data test completed.');
    });

    it('02:08 -> Get non-existent user', async () => {
        console.log('Running get non-existent user test...');
        const response = await agent
            .get('/api/v1/users/999999')
            .set('Content-Type', 'application/json');

        expect(response.status).to.be.oneOf([404, 400, 422]);
        console.log('Get non-existent user test completed.');
    });

    it('02:09 -> Update non-existent user', async () => {
        console.log('Running update non-existent user test...');
        const updateData = { firstName: 'Updated' };
        const response = await agent
            .put('/api/v1/users/999999')
            .set('Content-Type', 'application/json')
            .send(updateData);

        expect(response.status).to.be.oneOf([404, 400, 422]);
        console.log('Update non-existent user test completed.');
    });

    it('02:10 -> Delete non-existent user', async () => {
        console.log('Running delete non-existent user test...');
        const response = await agent
            .delete('/api/v1/users/999999')
            .set('Content-Type', 'application/json');

        expect(response.status).to.be.oneOf([404, 400, 422]);
        console.log('Delete non-existent user test completed.');
    });

    after(function () {
        console.log('User Management Tests completed.');
    });
}); 