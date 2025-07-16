import '../init';
import request from 'supertest';
import { assert, expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';

const infra = Application.instance();

describe('01 - Health Check Tests', function () {
    var agent = request.agent(infra._app);

    it('01:01 -> Health check endpoint', function (done) {
        agent
            .get('/api/v1')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.include('Form service is running successfully');
            })
            .expect(200, done);
    });

    it('01:02 -> Health check without content type', function (done) {
        agent
            .get('/api/v1')
            .expect((response) => {
                expect(response.body).to.have.property('message');
                expect(response.status).to.equal(200);
            })
            .expect(200, done);
    });

    it('01:03 -> Health check with invalid method', function (done) {
        agent
            .post('/api/v1')
            .set('Content-Type', 'application/json')
            .expect(404, done);
    });
}); 