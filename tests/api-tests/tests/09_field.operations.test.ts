import '../init';
import { setTestData } from '../init';
import request from 'supertest';
import { expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import { 
    expectSuccessResponse, 
    generateMathematicalOperation,
    generateLogicalOperation,
    generateCompositionOperation,
    generateIterateOperation,
    generateFunctionExpressionOperation
} from '../utils';

const infra = Application.instance();

describe('09 - Field Operations Tests', function () {
    var agent = request.agent(infra.app);

    // Mathematical Operations
    describe('Mathematical Operations', function () {
        it('09:01 -> Create mathematical operation', function (done) {
            const mathOpData = generateMathematicalOperation();
            agent
                .post('/api/v1/field-mathematical-operations')
                .set('Content-Type', 'application/json')
                .send(mathOpData)
                .expect((response) => {
                    expectSuccessResponse(response);
                    setTestData(response.body.Data.id, 'mathOpId');
                })
                .expect(201, done);
        });

        it('09:02 -> Search mathematical operations', function (done) {
            agent
                .get('/api/v1/field-mathematical-operations/search')
                .set('Content-Type', 'application/json')
                .query({ searchTerm: 'add' })
                .expect((response) => {
                    expectSuccessResponse(response);
                })
                .expect(200, done);
        });
    });

    // Logical Operations
    describe('Logical Operations', function () {
        it('09:03 -> Create logical operation', function (done) {
            const logicalOpData = generateLogicalOperation();
            agent
                .post('/api/v1/field-logical-operations')
                .set('Content-Type', 'application/json')
                .send(logicalOpData)
                .expect((response) => {
                    expectSuccessResponse(response);
                    setTestData(response.body.Data.id, 'logicalOpId');
                })
                .expect(201, done);
        });

        it('09:04 -> Search logical operations', function (done) {
            agent
                .get('/api/v1/field-logical-operations/search')
                .set('Content-Type', 'application/json')
                .query({ searchTerm: 'and' })
                .expect((response) => {
                    expectSuccessResponse(response);
                })
                .expect(200, done);
        });
    });

    // Composition Operations
    describe('Composition Operations', function () {
        it('09:05 -> Create composition operation', function (done) {
            const compositionOpData = generateCompositionOperation();
            agent
                .post('/api/v1/field-composition-operations')
                .set('Content-Type', 'application/json')
                .send(compositionOpData)
                .expect((response) => {
                    expectSuccessResponse(response);
                    setTestData(response.body.Data.id, 'compositionOpId');
                })
                .expect(201, done);
        });

        it('09:06 -> Search composition operations', function (done) {
            agent
                .get('/api/v1/field-composition-operations/search')
                .set('Content-Type', 'application/json')
                .query({ searchTerm: 'concat' })
                .expect((response) => {
                    expectSuccessResponse(response);
                })
                .expect(200, done);
        });
    });

    // Iterate Operations
    describe('Iterate Operations', function () {
        it('09:07 -> Create iterate operation', function (done) {
            const iterateOpData = generateIterateOperation();
            agent
                .post('/api/v1/field-iterate-operations')
                .set('Content-Type', 'application/json')
                .send(iterateOpData)
                .expect((response) => {
                    expectSuccessResponse(response);
                    setTestData(response.body.Data.id, 'iterateOpId');
                })
                .expect(201, done);
        });

        it('09:08 -> Search iterate operations', function (done) {
            agent
                .get('/api/v1/field-iterate-operations/search')
                .set('Content-Type', 'application/json')
                .query({ searchTerm: 'sum' })
                .expect((response) => {
                    expectSuccessResponse(response);
                })
                .expect(200, done);
        });
    });

    // Function Expression Operations
    describe('Function Expression Operations', function () {
        it('09:09 -> Create function expression operation', function (done) {
            const functionOpData = generateFunctionExpressionOperation();
            agent
                .post('/api/v1/field-function-expression-operations')
                .set('Content-Type', 'application/json')
                .send(functionOpData)
                .expect((response) => {
                    expectSuccessResponse(response);
                    setTestData(response.body.Data.id, 'functionOpId');
                })
                .expect(201, done);
        });

        it('09:10 -> Search function expression operations', function (done) {
            agent
                .get('/api/v1/field-function-expression-operations/search')
                .set('Content-Type', 'application/json')
                .query({ searchTerm: 'custom' })
                .expect((response) => {
                    expectSuccessResponse(response);
                })
                .expect(200, done);
        });
    });

    // Negative test cases
    describe('Negative Test Cases', function () {
        it('09:11 -> Create operation with invalid data', function (done) {
            const invalidData = {
                name: '', // Empty name
                operation: 'invalid_operation'
            };
            agent
                .post('/api/v1/field-mathematical-operations')
                .set('Content-Type', 'application/json')
                .send(invalidData)
                .expect((response) => {
                    expect(response.status).to.be.oneOf([400, 422]);
                })
                .end(done);
        });

        it('09:12 -> Get non-existent operation', function (done) {
            agent
                .get('/api/v1/field-mathematical-operations/999999')
                .set('Content-Type', 'application/json')
                .expect((response) => {
                    expect(response.status).to.be.oneOf([404, 400, 422]);
                })
                .end(done);
        });
    });
}); 