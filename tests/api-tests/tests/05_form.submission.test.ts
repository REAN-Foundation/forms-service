import request from 'supertest';
import { assert, expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { generateFormSubmission, expectSuccessResponse, expectValidId, expectValidArray, expectValidObject } from '../utils';

const infra = Application.instance();

describe('05 - Form Submission Tests', function () {
    var agent = request.agent(infra._app);

    it('05:01 -> Create new form submission', function (done) {
        const templateId = getTestData('templateId') || '550e8400-e29b-41d4-a716-446655440001';
        const submittedBy = getTestData('userId') || '550e8400-e29b-41d4-a716-446655440000';
        const submissionData = generateFormSubmission(templateId, submittedBy);
        agent
            .post('/api/v1/form-submissions')
            .set('Content-Type', 'application/json')
            .send(submissionData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'submissionId');
                setTestData(response.body.Data, 'submissionData');
            })
            .expect(201, done);
    });

    it('05:02 -> Get form submission by ID', function (done) {
        const submissionId = getTestData('submissionId');
        agent
            .get(`/api/v1/form-submissions/${submissionId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(submissionId);
            })
            .expect(200, done);
    });

    it('05:03 -> Update form submission', function (done) {
        const submissionId = getTestData('submissionId');
        const updateData = {
            data: {
                field1: 'updated_value1',
                field2: 'updated_value2',
                field3: 'new_value3'
            },
            status: 'completed'
        };
        agent
            .put(`/api/v1/form-submissions/${submissionId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expect(response.body.Data.status).to.equal('completed');
            })
            .expect(200, done);
    });

    it('05:04 -> Submit form submission', function (done) {
        const submissionId = getTestData('submissionId');
        const submitData = {
            submissionId: submissionId,
            submittedBy: getTestData('userId') || '550e8400-e29b-41d4-a716-446655440000',
            submitDate: new Date().toISOString()
        };
        agent
            .put('/api/v1/form-submissions/submit')
            .set('Content-Type', 'application/json')
            .send(submitData)
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    it('05:05 -> Search form submissions', function (done) {
        agent
            .get('/api/v1/form-submissions/search')
            .set('Content-Type', 'application/json')
            .query({ 
                searchTerm: 'test',
                status: 'completed'
            })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('05:06 -> Delete form submission', function (done) {
        const submissionId = getTestData('submissionId');
        agent
            .delete(`/api/v1/form-submissions/${submissionId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Negative test cases
    it('05:07 -> Create submission with invalid data', function (done) {
        const invalidData = {
            templateId: 'invalid_id',
            data: null
        };
        agent
            .post('/api/v1/form-submissions')
            .set('Content-Type', 'application/json')
            .send(invalidData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('05:08 -> Get non-existent submission', function (done) {
        agent
            .get('/api/v1/form-submissions/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('05:09 -> Update non-existent submission', function (done) {
        const updateData = { status: 'completed' };
        agent
            .put('/api/v1/form-submissions/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('05:10 -> Submit non-existent submission', function (done) {
        const submitData = {
            submissionId: 999999,
            submittedBy: 1
        };
        agent
            .put('/api/v1/form-submissions/submit')
            .set('Content-Type', 'application/json')
            .send(submitData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('05:11 -> Delete non-existent submission', function (done) {
        agent
            .delete('/api/v1/form-submissions/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 