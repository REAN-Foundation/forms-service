import request from 'supertest';
import { expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import { getTestData, setTestData } from '../init';
import { generateCalculationLogic, expectSuccessResponse, expectValidId, expectValidArray, expectValidObject } from '../utils';

const infra = Application.instance();

describe('10 - Calculation Logic Tests', function () {
    var agent = request.agent(infra.app);

    it('10:01 -> Create new calculation logic', function (done) {
        const calculationLogicData = generateCalculationLogic();
        agent
            .post('/api/v1/field-calculation-logic')
            .set('Content-Type', 'application/json')
            .send(calculationLogicData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'calculationLogicId');
                setTestData(response.body.Data, 'calculationLogicData');
            })
            .expect(201, done);
    });

    it('10:02 -> Get calculation logic by ID', function (done) {
        const calculationLogicId = getTestData('calculationLogicId');
        agent
            .get(`/api/v1/field-calculation-logic/${calculationLogicId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(calculationLogicId);
            })
            .expect(200, done);
    });

    it('10:03 -> Update calculation logic', function (done) {
        const calculationLogicId = getTestData('calculationLogicId');
        const updateData = {
            name: 'Updated Calculation Logic',
            description: 'Updated calculation logic description',
            formula: 'field1 * field2 / field3',
            targetField: 'updated_result'
        };
        agent
            .put(`/api/v1/field-calculation-logic/${calculationLogicId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expect(response.body.Data.name).to.equal('Updated Calculation Logic');
            })
            .expect(200, done);
    });

    it('10:04 -> Search calculation logic', function (done) {
        agent
            .get('/api/v1/field-calculation-logic/search')
            .set('Content-Type', 'application/json')
            .query({ searchTerm: 'test' })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('10:05 -> Delete calculation logic', function (done) {
        const calculationLogicId = getTestData('calculationLogicId');
        agent
            .delete(`/api/v1/field-calculation-logic/${calculationLogicId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Negative test cases
    it('10:06 -> Create calculation logic with invalid data', function (done) {
        const invalidData = {
            name: '', // Empty name
            formula: null,
            targetField: ''
        };
        agent
            .post('/api/v1/field-calculation-logic')
            .set('Content-Type', 'application/json')
            .send(invalidData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('10:07 -> Get non-existent calculation logic', function (done) {
        agent
            .get('/api/v1/field-calculation-logic/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('10:08 -> Update non-existent calculation logic', function (done) {
        const updateData = { name: 'Updated Name' };
        agent
            .put('/api/v1/field-calculation-logic/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('10:09 -> Delete non-existent calculation logic', function (done) {
        agent
            .delete('/api/v1/field-calculation-logic/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 