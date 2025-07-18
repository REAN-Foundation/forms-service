import request from 'supertest';
import { expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { generateFormField, expectSuccessResponse, expectValidId, expectValidArray, expectValidObject } from '../utils';

const infra = Application.instance();

describe('04 - Form Field Tests', function () {
    var agent = request.agent(infra.app);

    it('04:01 -> Create new form field', function (done) {
        const fieldData = generateFormField();
        agent
            .post('/api/v1/form-fields')
            .set('Content-Type', 'application/json')
            .send(fieldData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'fieldId');
                setTestData(response.body.Data, 'fieldData');
            })
            .expect(201, done);
    });

    it('04:02 -> Get form field by ID', function (done) {
        const fieldId = getTestData('fieldId');
        agent
            .get(`/api/v1/form-fields/${fieldId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(fieldId);
            })
            .expect(200, done);
    });

    it('04:03 -> Update form field', function (done) {
        const fieldId = getTestData('fieldId');
        const updateData = {
            label: 'Updated Field Label',
            required: true
        };
        agent
            .put(`/api/v1/form-fields/${fieldId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expect(response.body.Data.label).to.equal('Updated Field Label');
            })
            .expect(200, done);
    });

    it('04:04 -> Search form fields', function (done) {
        agent
            .get('/api/v1/form-fields/search')
            .set('Content-Type', 'application/json')
            .query({ searchTerm: 'test' })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('04:05 -> Get fields by template ID', function (done) {
        const templateId = getTestData('templateId') || '1'; // Fallback for testing
        agent
            .get(`/api/v1/form-fields/by-template-id/${templateId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('04:06 -> Delete form field', function (done) {
        const fieldId = getTestData('fieldId');
        agent
            .delete(`/api/v1/form-fields/${fieldId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Test different field types
    it('04:07 -> Create text field', function (done) {
        const textFieldData = {
            name: 'text_field',
            label: 'Text Field',
            type: 'text',
            required: true,
            placeholder: 'Enter text here'
        };
        agent
            .post('/api/v1/form-fields')
            .set('Content-Type', 'application/json')
            .send(textFieldData)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'textFieldId');
            })
            .expect(201, done);
    });

    it('04:08 -> Create number field', function (done) {
        const numberFieldData = {
            name: 'number_field',
            label: 'Number Field',
            type: 'number',
            required: false,
            validationRules: {
                min: 0,
                max: 100
            }
        };
        agent
            .post('/api/v1/form-fields')
            .set('Content-Type', 'application/json')
            .send(numberFieldData)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'numberFieldId');
            })
            .expect(201, done);
    });

    it('04:09 -> Create select field', function (done) {
        const selectFieldData = {
            name: 'select_field',
            label: 'Select Field',
            type: 'select',
            required: true,
            options: [
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' }
            ]
        };
        agent
            .post('/api/v1/form-fields')
            .set('Content-Type', 'application/json')
            .send(selectFieldData)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'selectFieldId');
            })
            .expect(201, done);
    });

    // Negative test cases
    it('04:10 -> Create field with invalid data', function (done) {
        const invalidFieldData = {
            name: '', // Empty name
            type: 'invalid_type'
        };
        agent
            .post('/api/v1/form-fields')
            .set('Content-Type', 'application/json')
            .send(invalidFieldData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('04:11 -> Get non-existent field', function (done) {
        agent
            .get('/api/v1/form-fields/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('04:12 -> Update non-existent field', function (done) {
        const updateData = { label: 'Updated Label' };
        agent
            .put('/api/v1/form-fields/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('04:13 -> Delete non-existent field', function (done) {
        agent
            .delete('/api/v1/form-fields/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 