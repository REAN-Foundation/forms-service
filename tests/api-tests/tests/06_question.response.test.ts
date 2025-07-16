import request from 'supertest';
import { assert, expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { expectSuccessResponse, expectValidId, expectValidObject, expectValidArray } from '../utils';

const infra = Application.instance();

describe('06 - Question Response Tests', function () {
    var agent = request.agent(infra._app);

    it('06:01 -> Create new question response', function (done) {
        const responseData = {
            questionId: getTestData('fieldId') || 1,
            submissionId: getTestData('submissionId') || 1,
            value: 'Test response value',
            responseType: 'text'
        };
        agent
            .post('/api/v1/question-responses')
            .set('Content-Type', 'application/json')
            .send(responseData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'responseId');
                setTestData(response.body.Data, 'responseData');
            })
            .expect(201, done);
    });

    it('06:02 -> Get question response by ID', function (done) {
        const responseId = getTestData('responseId');
        agent
            .get(`/api/v1/question-responses/${responseId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(responseId);
            })
            .expect(200, done);
    });

    it('06:03 -> Update question response', function (done) {
        const responseId = getTestData('responseId');
        const updateData = {
            value: 'Updated response value',
            responseType: 'text'
        };
        agent
            .put(`/api/v1/question-responses/${responseId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expect(response.body.Data.value).to.equal('Updated response value');
            })
            .expect(200, done);
    });

    it('06:04 -> Save question response', function (done) {
        const saveData = {
            questionId: getTestData('fieldId') || 1,
            submissionId: getTestData('submissionId') || 1,
            value: 'Saved response value',
            responseType: 'text'
        };
        agent
            .post('/api/v1/question-responses/save')
            .set('Content-Type', 'application/json')
            .send(saveData)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'savedResponseId');
            })
            .expect(201, done);
    });

    it('06:05 -> Search question responses', function (done) {
        agent
            .get('/api/v1/question-responses/search')
            .set('Content-Type', 'application/json')
            .query({ 
                searchTerm: 'test',
                submissionId: getTestData('submissionId') || 1
            })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('06:06 -> Export responses to CSV', function (done) {
        agent
            .get('/api/v1/question-responses/exportcsv/export')
            .set('Content-Type', 'application/json')
            .query({ 
                submissionId: getTestData('submissionId') || 1,
                format: 'csv'
            })
            .expect((response) => {
                expect(response.status).to.equal(200);
            })
            .end(done);
    });

    it('06:07 -> Export responses to PDF', function (done) {
        agent
            .get('/api/v1/question-responses/exportpdf/export')
            .set('Content-Type', 'application/json')
            .query({ 
                submissionId: getTestData('submissionId') || 1,
                format: 'pdf'
            })
            .expect((response) => {
                expect(response.status).to.equal(200);
            })
            .end(done);
    });

    it('06:08 -> Delete question response', function (done) {
        const responseId = getTestData('responseId');
        agent
            .delete(`/api/v1/question-responses/${responseId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Negative test cases
    it('06:09 -> Create response with invalid data', function (done) {
        const invalidData = {
            questionId: 'invalid_id',
            value: null
        };
        agent
            .post('/api/v1/question-responses')
            .set('Content-Type', 'application/json')
            .send(invalidData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('06:10 -> Get non-existent response', function (done) {
        agent
            .get('/api/v1/question-responses/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('06:11 -> Update non-existent response', function (done) {
        const updateData = { value: 'Updated value' };
        agent
            .put('/api/v1/question-responses/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('06:12 -> Delete non-existent response', function (done) {
        agent
            .delete('/api/v1/question-responses/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 