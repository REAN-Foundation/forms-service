import request from 'supertest';
import { assert, expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { expectSuccessResponse, expectValidId, expectValidObject, expectValidArray } from '../utils';

const infra = Application.instance();

describe('13 - Input Unit List Tests', function () {
    var agent = request.agent(infra._app);

    it('13:01 -> Create new input unit list', function (done) {
        const unitListData = {
            name: 'Test Unit List',
            description: 'Test input unit list',
            units: [
                { value: 'kg', label: 'Kilograms' },
                { value: 'lbs', label: 'Pounds' },
                { value: 'g', label: 'Grams' }
            ],
            defaultUnit: 'kg'
        };
        agent
            .post('/api/v1/input-unit-lists')
            .set('Content-Type', 'application/json')
            .send(unitListData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'unitListId');
                setTestData(response.body.Data, 'unitListData');
            })
            .expect(201, done);
    });

    it('13:02 -> Get input unit list by ID', function (done) {
        const unitListId = getTestData('unitListId');
        agent
            .get(`/api/v1/input-unit-lists/${unitListId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(unitListId);
            })
            .expect(200, done);
    });

    it('13:03 -> Update input unit list', function (done) {
        const unitListId = getTestData('unitListId');
        const updateData = {
            name: 'Updated Unit List',
            description: 'Updated input unit list',
            units: [
                { value: 'km', label: 'Kilometers' },
                { value: 'miles', label: 'Miles' },
                { value: 'm', label: 'Meters' }
            ],
            defaultUnit: 'km'
        };
        agent
            .put(`/api/v1/input-unit-lists/${unitListId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expect(response.body.Data.name).to.equal('Updated Unit List');
            })
            .expect(200, done);
    });

    it('13:04 -> Search input unit lists', function (done) {
        agent
            .get('/api/v1/input-unit-lists/search')
            .set('Content-Type', 'application/json')
            .query({ searchTerm: 'test' })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('13:05 -> Delete input unit list', function (done) {
        const unitListId = getTestData('unitListId');
        agent
            .delete(`/api/v1/input-unit-lists/${unitListId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Test different unit types
    it('13:06 -> Create weight unit list', function (done) {
        const weightUnitData = {
            name: 'Weight Units',
            description: 'Common weight units',
            units: [
                { value: 'kg', label: 'Kilograms' },
                { value: 'lbs', label: 'Pounds' },
                { value: 'g', label: 'Grams' },
                { value: 'oz', label: 'Ounces' }
            ],
            defaultUnit: 'kg'
        };
        agent
            .post('/api/v1/input-unit-lists')
            .set('Content-Type', 'application/json')
            .send(weightUnitData)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'weightUnitListId');
            })
            .expect(201, done);
    });

    it('13:07 -> Create length unit list', function (done) {
        const lengthUnitData = {
            name: 'Length Units',
            description: 'Common length units',
            units: [
                { value: 'km', label: 'Kilometers' },
                { value: 'miles', label: 'Miles' },
                { value: 'm', label: 'Meters' },
                { value: 'cm', label: 'Centimeters' },
                { value: 'in', label: 'Inches' }
            ],
            defaultUnit: 'm'
        };
        agent
            .post('/api/v1/input-unit-lists')
            .set('Content-Type', 'application/json')
            .send(lengthUnitData)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'lengthUnitListId');
            })
            .expect(201, done);
    });

    // Negative test cases
    it('13:08 -> Create unit list with invalid data', function (done) {
        const invalidData = {
            name: '', // Empty name
            units: [] // Empty units array
        };
        agent
            .post('/api/v1/input-unit-lists')
            .set('Content-Type', 'application/json')
            .send(invalidData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('13:09 -> Get non-existent unit list', function (done) {
        agent
            .get('/api/v1/input-unit-lists/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('13:10 -> Update non-existent unit list', function (done) {
        const updateData = { name: 'Updated Name' };
        agent
            .put('/api/v1/input-unit-lists/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('13:11 -> Delete non-existent unit list', function (done) {
        agent
            .delete('/api/v1/input-unit-lists/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 