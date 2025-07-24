import '../init';
import request from 'supertest';
import { expect } from 'chai';
import Application from '../../../src/app';
import { describe, it, before, after } from 'mocha';

const infra = Application.instance();

describe('01 - Health Check Tests', function () {
    this.timeout(10000); // 10 second timeout for health checks
    const agent = request.agent(infra.app);

    before(function () {
        console.log('Starting Health Check Tests...');
    });

    it('01:01 -> Health check endpoint', async () => {
        console.log('Running health check endpoint test...');
        const response = await agent
            .get('/api/v1/')
            .set('Content-Type', 'application/json');

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('Status', 'success');
        expect(response.body).to.have.property('HttpCode', 200);
        expect(response.body).to.have.property('Message');
        expect(response.body).to.have.property('Data');
        console.log('Health check endpoint test completed.');
    });

    it('01:02 -> Health check without content type', async () => {
        console.log('Running health check without content type test...');
        const response = await agent
            .get('/api/v1/');

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('Status', 'success');
        expect(response.body).to.have.property('HttpCode', 200);
        console.log('Health check without content type test completed.');
    });

    it('01:03 -> Health check with invalid method', async () => {
        console.log('Running health check with invalid method test...');
        const response = await agent
            .post('/api/v1/')
            .set('Content-Type', 'application/json');

        expect(response.status).to.equal(404);
        console.log('Health check with invalid method test completed.');
    });

    after(function () {
        console.log('Health Check Tests completed.');
    });
}); 