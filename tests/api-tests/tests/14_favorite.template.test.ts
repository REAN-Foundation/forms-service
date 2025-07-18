import request from 'supertest';
import { expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { expectSuccessResponse, expectValidId, expectValidObject, expectValidArray } from '../utils';

const infra = Application.instance();

describe('14 - Favorite Template Tests', function () {
    var agent = request.agent(infra.app);

    it('14:01 -> Create new favorite template', function (done) {
        const favoriteData = {
            userId: getTestData('userId') || 1,
            templateId: getTestData('templateId') || 1,
            name: 'My Favorite Template',
            description: 'This is my favorite template'
        };
        agent
            .post('/api/v1/favorite-templates')
            .set('Content-Type', 'application/json')
            .send(favoriteData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'favoriteTemplateId');
                setTestData(response.body.Data, 'favoriteTemplateData');
            })
            .expect(201, done);
    });

    it('14:02 -> Get favorite template by ID', function (done) {
        const favoriteTemplateId = getTestData('favoriteTemplateId');
        agent
            .get(`/api/v1/favorite-templates/${favoriteTemplateId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(favoriteTemplateId);
            })
            .expect(200, done);
    });

    it('14:03 -> Search favorite templates', function (done) {
        agent
            .get('/api/v1/favorite-templates/search')
            .set('Content-Type', 'application/json')
            .query({ 
                searchTerm: 'favorite',
                userId: getTestData('userId') || 1
            })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('14:04 -> Delete favorite template', function (done) {
        const favoriteTemplateId = getTestData('favoriteTemplateId');
        agent
            .delete(`/api/v1/favorite-templates/${favoriteTemplateId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Test multiple favorites
    it('14:05 -> Create multiple favorite templates', function (done) {
        const favoriteData1 = {
            userId: getTestData('userId') || 1,
            templateId: getTestData('templateId') || 1,
            name: 'Favorite Template 1',
            description: 'First favorite template'
        };
        agent
            .post('/api/v1/favorite-templates')
            .set('Content-Type', 'application/json')
            .send(favoriteData1)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'favoriteTemplateId1');
            })
            .expect(201, done);
    });

    it('14:06 -> Create another favorite template', function (done) {
        const favoriteData2 = {
            userId: getTestData('userId') || 1,
            templateId: getTestData('templateId') || 1,
            name: 'Favorite Template 2',
            description: 'Second favorite template'
        };
        agent
            .post('/api/v1/favorite-templates')
            .set('Content-Type', 'application/json')
            .send(favoriteData2)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'favoriteTemplateId2');
            })
            .expect(201, done);
    });

    // Negative test cases
    it('14:07 -> Create favorite template with invalid data', function (done) {
        const invalidData = {
            userId: 'invalid_user_id',
            templateId: null,
            name: '' // Empty name
        };
        agent
            .post('/api/v1/favorite-templates')
            .set('Content-Type', 'application/json')
            .send(invalidData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('14:08 -> Get non-existent favorite template', function (done) {
        agent
            .get('/api/v1/favorite-templates/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('14:09 -> Delete non-existent favorite template', function (done) {
        agent
            .delete('/api/v1/favorite-templates/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 