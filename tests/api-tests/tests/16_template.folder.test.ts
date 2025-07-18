import request from 'supertest';
import { expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import '../init';
import { getTestData, setTestData } from '../init';
import { expectSuccessResponse, expectValidId, expectValidObject, expectValidArray } from '../utils';

const infra = Application.instance();

describe('16 - Template Folder Tests', function () {
    var agent = request.agent(infra.app);

    it('16:01 -> Create new template folder', function (done) {
        const folderData = {
            name: 'Test Template Folder',
            description: 'A test folder for organizing templates',
            parentFolderId: null,
            createdBy: getTestData('userId') || 1
        };
        agent
            .post('/api/v1/template-folders')
            .set('Content-Type', 'application/json')
            .send(folderData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'folderId');
                setTestData(response.body.Data, 'folderData');
            })
            .expect(201, done);
    });

    it('16:02 -> Get template folder by ID', function (done) {
        const folderId = getTestData('folderId');
        agent
            .get(`/api/v1/template-folders/${folderId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(folderId);
            })
            .expect(200, done);
    });

    it('16:03 -> Update template folder', function (done) {
        const folderId = getTestData('folderId');
        const updateData = {
            name: 'Updated Template Folder',
            description: 'Updated folder description',
            isActive: true
        };
        agent
            .put(`/api/v1/template-folders/${folderId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expect(response.body.Data.name).to.equal('Updated Template Folder');
            })
            .expect(200, done);
    });

    it('16:04 -> Search template folders', function (done) {
        agent
            .get('/api/v1/template-folders/search')
            .set('Content-Type', 'application/json')
            .query({ searchTerm: 'test' })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('16:05 -> Delete template folder', function (done) {
        const folderId = getTestData('folderId');
        agent
            .delete(`/api/v1/template-folders/${folderId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Test nested folder structure
    it('16:06 -> Create parent folder', function (done) {
        const parentFolderData = {
            name: 'Parent Folder',
            description: 'Parent folder for organizing templates',
            parentFolderId: null,
            createdBy: getTestData('userId') || 1
        };
        agent
            .post('/api/v1/template-folders')
            .set('Content-Type', 'application/json')
            .send(parentFolderData)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'parentFolderId');
            })
            .expect(201, done);
    });

    it('16:07 -> Create child folder', function (done) {
        const childFolderData = {
            name: 'Child Folder',
            description: 'Child folder inside parent',
            parentFolderId: getTestData('parentFolderId'),
            createdBy: getTestData('userId') || 1
        };
        agent
            .post('/api/v1/template-folders')
            .set('Content-Type', 'application/json')
            .send(childFolderData)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'childFolderId');
            })
            .expect(201, done);
    });

    it('16:08 -> Create grandchild folder', function (done) {
        const grandchildFolderData = {
            name: 'Grandchild Folder',
            description: 'Grandchild folder inside child',
            parentFolderId: getTestData('childFolderId'),
            createdBy: getTestData('userId') || 1
        };
        agent
            .post('/api/v1/template-folders')
            .set('Content-Type', 'application/json')
            .send(grandchildFolderData)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'grandchildFolderId');
            })
            .expect(201, done);
    });

    // Negative test cases
    it('16:09 -> Create folder with invalid data', function (done) {
        const invalidData = {
            name: '', // Empty name
            parentFolderId: 'invalid_parent_id'
        };
        agent
            .post('/api/v1/template-folders')
            .set('Content-Type', 'application/json')
            .send(invalidData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('16:10 -> Get non-existent folder', function (done) {
        agent
            .get('/api/v1/template-folders/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('16:11 -> Update non-existent folder', function (done) {
        const updateData = { name: 'Updated Name' };
        agent
            .put('/api/v1/template-folders/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('16:12 -> Delete non-existent folder', function (done) {
        agent
            .delete('/api/v1/template-folders/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 