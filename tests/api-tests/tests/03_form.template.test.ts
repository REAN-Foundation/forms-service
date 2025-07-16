import request from 'supertest';
import { assert, expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { generateFormTemplate, expectSuccessResponse, expectValidId, expectValidArray, expectValidObject } from '../utils';

const infra = Application.instance();

describe('03 - Form Template Tests', function () {
    var agent = request.agent(infra._app);

    it('03:01 -> Create new form template', function (done) {
        const templateData = generateFormTemplate();
        agent
            .post('/api/v1/form-templates')
            .set('Content-Type', 'application/json')
            .send(templateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'templateId');
                setTestData(response.body.Data, 'templateData');
            })
            .expect(201, done);
    });

    it('03:02 -> Get form template by ID', function (done) {
        const templateId = getTestData('templateId');
        agent
            .get(`/api/v1/form-templates/${templateId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(templateId);
            })
            .expect(200, done);
    });

    it('03:03 -> Get form template details by ID', function (done) {
        const templateId = getTestData('templateId');
        agent
            .get(`/api/v1/form-templates/${templateId}/details`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(templateId);
            })
            .expect(200, done);
    });

    it('03:04 -> Update form template', function (done) {
        const templateId = getTestData('templateId');
        const updateData = {
            name: 'Updated Template Name',
            description: 'Updated description'
        };
        agent
            .put(`/api/v1/form-templates/${templateId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.name).to.equal('Updated Template Name');
            })
            .expect(200, done);
    });

    it('03:05 -> Search form templates', function (done) {
        agent
            .get('/api/v1/form-templates/search')
            .set('Content-Type', 'application/json')
            .query({ searchTerm: 'test' })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('03:06 -> Get template submissions', function (done) {
        const templateId = getTestData('templateId');
        agent
            .get(`/api/v1/form-templates/${templateId}/submissions`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('03:07 -> Export form template', function (done) {
        const templateId = getTestData('templateId');
        agent
            .get(`/api/v1/form-templates/${templateId}/export`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.equal(200);
            })
            .end(done);
    });

    it('03:08 -> Preview form template', function (done) {
        const templateId = getTestData('templateId');
        agent
            .get(`/api/v1/form-templates/${templateId}/preview`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(templateId);
            })
            .expect(200, done);
    });

    it('03:09 -> Delete form template', function (done) {
        const templateId = getTestData('templateId');
        agent
            .delete(`/api/v1/form-templates/${templateId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Negative test cases
    it('03:10 -> Create template with invalid data', function (done) {
        const invalidTemplateData = {
            name: '', // Empty name
            description: 'Test description'
        };
        agent
            .post('/api/v1/form-templates')
            .set('Content-Type', 'application/json')
            .send(invalidTemplateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('03:11 -> Get non-existent template', function (done) {
        agent
            .get('/api/v1/form-templates/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('03:12 -> Update non-existent template', function (done) {
        const updateData = { name: 'Updated Name' };
        agent
            .put('/api/v1/form-templates/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('03:13 -> Delete non-existent template', function (done) {
        agent
            .delete('/api/v1/form-templates/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 