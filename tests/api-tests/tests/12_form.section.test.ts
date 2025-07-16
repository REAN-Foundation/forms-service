import request from 'supertest';
import { assert, expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { generateFormSection, expectSuccessResponse, expectValidId, expectValidArray, expectValidObject } from '../utils';

const infra = Application.instance();

describe('12 - Form Section Tests', function () {
    var agent = request.agent(infra._app);

    it('12:01 -> Create new form section', function (done) {
        const sectionData = generateFormSection();
        agent
            .post('/api/v1/form-sections')
            .set('Content-Type', 'application/json')
            .send(sectionData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'sectionId');
                setTestData(response.body.Data, 'sectionData');
            })
            .expect(201, done);
    });

    it('12:02 -> Get form section by ID', function (done) {
        const sectionId = getTestData('sectionId');
        agent
            .get(`/api/v1/form-sections/${sectionId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(sectionId);
            })
            .expect(200, done);
    });

    it('12:03 -> Update form section', function (done) {
        const sectionId = getTestData('sectionId');
        const updateData = {
            name: 'Updated Section Name',
            description: 'Updated section description',
            order: 2
        };
        agent
            .put(`/api/v1/form-sections/${sectionId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expect(response.body.Data.name).to.equal('Updated Section Name');
            })
            .expect(200, done);
    });

    it('12:04 -> Search form sections', function (done) {
        agent
            .get('/api/v1/form-sections/search')
            .set('Content-Type', 'application/json')
            .query({ searchTerm: 'test' })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('12:05 -> Get sections by template ID', function (done) {
        const templateId = getTestData('templateId') || '1'; // Fallback for testing
        agent
            .get(`/api/v1/form-sections/templateId/${templateId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('12:06 -> Delete form section', function (done) {
        const sectionId = getTestData('sectionId');
        agent
            .delete(`/api/v1/form-sections/${sectionId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Negative test cases
    it('12:07 -> Create section with invalid data', function (done) {
        const invalidData = {
            name: '', // Empty name
            order: 'invalid_order' // Invalid order type
        };
        agent
            .post('/api/v1/form-sections')
            .set('Content-Type', 'application/json')
            .send(invalidData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('12:08 -> Get non-existent section', function (done) {
        agent
            .get('/api/v1/form-sections/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('12:09 -> Update non-existent section', function (done) {
        const updateData = { name: 'Updated Name' };
        agent
            .put('/api/v1/form-sections/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('12:10 -> Delete non-existent section', function (done) {
        agent
            .delete('/api/v1/form-sections/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 