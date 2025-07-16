import request from 'supertest';
import { assert, expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { generateValidationLogic, expectSuccessResponse, expectValidId, expectValidArray, expectValidObject } from '../utils';

const infra = Application.instance();

describe('08 - Validation Logic Tests', function () {
    var agent = request.agent(infra._app);

    it('08:01 -> Create new validation logic', function (done) {
        const validationLogicData = generateValidationLogic();
        agent
            .post('/api/v1/field-validation-logic')
            .set('Content-Type', 'application/json')
            .send(validationLogicData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'validationLogicId');
                setTestData(response.body.Data, 'validationLogicData');
            })
            .expect(201, done);
    });

    it('08:02 -> Get validation logic by ID', function (done) {
        const validationLogicId = getTestData('validationLogicId');
        agent
            .get(`/api/v1/field-validation-logic/${validationLogicId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(validationLogicId);
            })
            .expect(200, done);
    });

    it('08:03 -> Update validation logic', function (done) {
        const validationLogicId = getTestData('validationLogicId');
        const updateData = {
            name: 'Updated Validation Logic',
            description: 'Updated validation logic description',
            rule: {
                type: 'min_length',
                message: 'Minimum length is 5 characters'
            }
        };
        agent
            .put(`/api/v1/field-validation-logic/${validationLogicId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expect(response.body.Data.name).to.equal('Updated Validation Logic');
            })
            .expect(200, done);
    });

    it('08:04 -> Search validation logic', function (done) {
        agent
            .get('/api/v1/field-validation-logic/search')
            .set('Content-Type', 'application/json')
            .query({ searchTerm: 'test' })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('08:05 -> Delete validation logic', function (done) {
        const validationLogicId = getTestData('validationLogicId');
        agent
            .delete(`/api/v1/field-validation-logic/${validationLogicId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Negative test cases
    it('08:06 -> Create validation logic with invalid data', function (done) {
        const invalidData = {
            name: '', // Empty name
            rule: {
                type: 'invalid_type',
                message: null
            }
        };
        agent
            .post('/api/v1/field-validation-logic')
            .set('Content-Type', 'application/json')
            .send(invalidData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('08:07 -> Get non-existent validation logic', function (done) {
        agent
            .get('/api/v1/field-validation-logic/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('08:08 -> Update non-existent validation logic', function (done) {
        const updateData = { name: 'Updated Name' };
        agent
            .put('/api/v1/field-validation-logic/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('08:09 -> Delete non-existent validation logic', function (done) {
        agent
            .delete('/api/v1/field-validation-logic/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 