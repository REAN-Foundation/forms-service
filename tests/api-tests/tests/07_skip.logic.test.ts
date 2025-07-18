import request from 'supertest';
import { expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { generateSkipLogic, expectSuccessResponse, expectValidId, expectValidArray, expectValidObject } from '../utils';

const infra = Application.instance();

describe('07 - Skip Logic Tests', function () {
    var agent = request.agent(infra.app);

    it('07:01 -> Create new skip logic', function (done) {
        // Use a valid form field ID from test data or generate one
        const formFieldId = getTestData('testFormField')?.id || '550e8400-e29b-41d4-a716-446655440002';
        const skipLogicData = generateSkipLogic(formFieldId);
        agent
            .post('/api/v1/field-skip-logic')
            .set('Content-Type', 'application/json')
            .send(skipLogicData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'skipLogicId');
                setTestData(response.body.Data, 'skipLogicData');
            })
            .expect(201, done);
    });

    it('07:02 -> Get skip logic by ID', function (done) {
        const skipLogicId = getTestData('skipLogicId');
        agent
            .get(`/api/v1/field-skip-logic/${skipLogicId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(skipLogicId);
            })
            .expect(200, done);
    });

    it('07:03 -> Update skip logic', function (done) {
        const skipLogicId = getTestData('skipLogicId');
        const updateData = {
            name: 'Updated Skip Logic',
            description: 'Updated skip logic description',
            condition: {
                field: 'updated_field',
                operator: 'not_equals',
                value: 'no'
            }
        };
        agent
            .put(`/api/v1/field-skip-logic/${skipLogicId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.name).to.equal('Updated Skip Logic');
            })
            .expect(200, done);
    });

    it('07:04 -> Search skip logic', function (done) {
        agent
            .get('/api/v1/field-skip-logic/search')
            .set('Content-Type', 'application/json')
            .query({ searchTerm: 'test' })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('07:05 -> Delete skip logic', function (done) {
        const skipLogicId = getTestData('skipLogicId');
        agent
            .delete(`/api/v1/field-skip-logic/${skipLogicId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Negative test cases
    it('07:06 -> Create skip logic with invalid data', function (done) {
        const invalidData = {
            name: '', // Empty name
            condition: {
                field: '',
                operator: 'invalid_operator',
                value: null
            }
        };
        agent
            .post('/api/v1/field-skip-logic')
            .set('Content-Type', 'application/json')
            .send(invalidData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('07:07 -> Get non-existent skip logic', function (done) {
        agent
            .get('/api/v1/field-skip-logic/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('07:08 -> Update non-existent skip logic', function (done) {
        const updateData = { name: 'Updated Name' };
        agent
            .put('/api/v1/field-skip-logic/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('07:09 -> Delete non-existent skip logic', function (done) {
        agent
            .delete('/api/v1/field-skip-logic/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 