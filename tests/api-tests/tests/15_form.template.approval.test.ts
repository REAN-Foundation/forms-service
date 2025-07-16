import request from 'supertest';
import { assert, expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import { getTestData, setTestData } from '../init';
import { expectSuccessResponse, expectValidId, expectValidObject, expectValidArray } from '../utils';

import '../init';

const infra = Application.instance();

describe('15 - Form Template Approval Tests', function () {
    var agent = request.agent(infra._app);

    it('15:01 -> Create new form template approval', function (done) {
        const approvalData = {
            templateId: getTestData('templateId') || 1,
            requestedBy: getTestData('userId') || 1,
            requestedDate: new Date().toISOString(),
            status: 'pending',
            comments: 'Please review this template'
        };
        agent
            .post('/api/v1/form-template-approvals')
            .set('Content-Type', 'application/json')
            .send(approvalData)
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidId(response);
                setTestData(response.body.Data.id, 'approvalId');
                setTestData(response.body.Data, 'approvalData');
            })
            .expect(201, done);
    });

    it('15:02 -> Get form template approval by ID', function (done) {
        const approvalId = getTestData('approvalId');
        agent
            .get(`/api/v1/form-template-approvals/${approvalId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidObject(response);
                expect(response.body.Data.id).to.equal(approvalId);
            })
            .expect(200, done);
    });

    it('15:03 -> Update form template approval', function (done) {
        const approvalId = getTestData('approvalId');
        const updateData = {
            status: 'approved',
            approvedBy: getTestData('userId') || 1,
            approvedDate: new Date().toISOString(),
            comments: 'Template approved with minor changes'
        };
        agent
            .put(`/api/v1/form-template-approvals/${approvalId}`)
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expectSuccessResponse(response);
                expect(response.body.Data.status).to.equal('approved');
            })
            .expect(200, done);
    });

    it('15:04 -> Search form template approvals', function (done) {
        agent
            .get('/api/v1/form-template-approvals/search')
            .set('Content-Type', 'application/json')
            .query({ 
                searchTerm: 'pending',
                status: 'pending'
            })
            .expect((response) => {
                expectSuccessResponse(response);
                expectValidArray(response);
            })
            .expect(200, done);
    });

    it('15:05 -> Delete form template approval', function (done) {
        const approvalId = getTestData('approvalId');
        agent
            .delete(`/api/v1/form-template-approvals/${approvalId}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expectSuccessResponse(response);
            })
            .expect(200, done);
    });

    // Test different approval statuses
    it('15:06 -> Create rejected approval', function (done) {
        const rejectedApprovalData = {
            templateId: getTestData('templateId') || 1,
            requestedBy: getTestData('userId') || 1,
            requestedDate: new Date().toISOString(),
            status: 'rejected',
            comments: 'Template needs significant changes'
        };
        agent
            .post('/api/v1/form-template-approvals')
            .set('Content-Type', 'application/json')
            .send(rejectedApprovalData)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'rejectedApprovalId');
            })
            .expect(201, done);
    });

    it('15:07 -> Create approved approval', function (done) {
        const approvedApprovalData = {
            templateId: getTestData('templateId') || 1,
            requestedBy: getTestData('userId') || 1,
            requestedDate: new Date().toISOString(),
            status: 'approved',
            approvedBy: getTestData('userId') || 1,
            approvedDate: new Date().toISOString(),
            comments: 'Template approved'
        };
        agent
            .post('/api/v1/form-template-approvals')
            .set('Content-Type', 'application/json')
            .send(approvedApprovalData)
            .expect((response) => {
                expectSuccessResponse(response);
                setTestData(response.body.Data.id, 'approvedApprovalId');
            })
            .expect(201, done);
    });

    // Negative test cases
    it('15:08 -> Create approval with invalid data', function (done) {
        const invalidData = {
            templateId: 'invalid_template_id',
            status: 'invalid_status',
            comments: null
        };
        agent
            .post('/api/v1/form-template-approvals')
            .set('Content-Type', 'application/json')
            .send(invalidData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            })
            .end(done);
    });

    it('15:09 -> Get non-existent approval', function (done) {
        agent
            .get('/api/v1/form-template-approvals/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('15:10 -> Update non-existent approval', function (done) {
        const updateData = { status: 'approved' };
        agent
            .put('/api/v1/form-template-approvals/999999')
            .set('Content-Type', 'application/json')
            .send(updateData)
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });

    it('15:11 -> Delete non-existent approval', function (done) {
        agent
            .delete('/api/v1/form-template-approvals/999999')
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.status).to.be.oneOf([404, 400, 422]);
            })
            .end(done);
    });
}); 