import request from 'supertest';
import { assert, expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { 
    expectSuccessResponse, 
    expectValidId, 
    expectValidObject, 
    expectValidArray,
    generateSkipRule,
    generateValidationRule,
    generateCalculationRule
} from '../utils';

const infra = Application.instance();

describe('11 - Field Rules Tests', function () {
    var agent = request.agent(infra._app);

    // Skip Rules
    describe('Skip Rules', function () {
        it('11:01 -> Create skip rule', function (done) {
            const skipRuleData = generateSkipRule();
            agent
                .post('/api/v1/field-skip-rules')
                .set('Content-Type', 'application/json')
                .send(skipRuleData)
                .expect((response) => {
                    expectSuccessResponse(response);
                    setTestData(response.body.Data.id, 'skipRuleId');
                })
                .expect(201, done);
        });

        it('11:02 -> Search skip rules', function (done) {
            agent
                .get('/api/v1/field-skip-rules/search')
                .set('Content-Type', 'application/json')
                .query({ searchTerm: 'test' })
                .expect((response) => {
                    expectSuccessResponse(response);
                })
                .expect(200, done);
        });
    });

    // Validation Rules
    describe('Validation Rules', function () {
        it('11:03 -> Create validation rule', function (done) {
            const validationRuleData = generateValidationRule();
            agent
                .post('/api/v1/field-validation-rules')
                .set('Content-Type', 'application/json')
                .send(validationRuleData)
                .expect((response) => {
                    expectSuccessResponse(response);
                    setTestData(response.body.Data.id, 'validationRuleId');
                })
                .expect(201, done);
        });

        it('11:04 -> Search validation rules', function (done) {
            agent
                .get('/api/v1/field-validation-rules/search')
                .set('Content-Type', 'application/json')
                .query({ searchTerm: 'test' })
                .expect((response) => {
                    expectSuccessResponse(response);
                })
                .expect(200, done);
        });
    });

    // Calculation Rules
    describe('Calculation Rules', function () {
        it('11:05 -> Create calculation rule', function (done) {
            const calculationRuleData = generateCalculationRule();
            agent
                .post('/api/v1/field-calculation-rules')
                .set('Content-Type', 'application/json')
                .send(calculationRuleData)
                .expect((response) => {
                    expectSuccessResponse(response);
                    setTestData(response.body.Data.id, 'calculationRuleId');
                })
                .expect(201, done);
        });

        it('11:06 -> Search calculation rules', function (done) {
            agent
                .get('/api/v1/field-calculation-rules/search')
                .set('Content-Type', 'application/json')
                .query({ searchTerm: 'test' })
                .expect((response) => {
                    expectSuccessResponse(response);
                })
                .expect(200, done);
        });
    });

    // Negative test cases
    describe('Negative Test Cases', function () {
        it('11:07 -> Create rule with invalid data', function (done) {
            const invalidData = {
                name: '', // Empty name
                condition: null
            };
            agent
                .post('/api/v1/field-skip-rules')
                .set('Content-Type', 'application/json')
                .send(invalidData)
                .expect((response) => {
                    expect(response.status).to.be.oneOf([400, 422]);
                })
                .end(done);
        });

        it('11:08 -> Get non-existent rule', function (done) {
            agent
                .get('/api/v1/field-skip-rules/999999')
                .set('Content-Type', 'application/json')
                .expect((response) => {
                    expect(response.status).to.be.oneOf([404, 400, 422]);
                })
                .end(done);
        });
    });
}); 