import '../init';
import { describe, before, after } from 'mocha';

describe('Form Service API Tests', function() {
    // Set timeout for entire test suite
    this.timeout(30000);

    before(function() {
        console.log('Starting test suite execution...');
    });

    // Health Check Tests
    describe('Health Check Module', function() {
        require('./01_health.test');
    });

    // User Tests
    describe('User Module', function() {
        require('./02_user.test');
    });

    // Form Template Tests
    describe('Form Template Module', function() {
        require('./03_form.template.test');
    });

    // Form Field Tests
    describe('Form Field Module', function() {
        require('./04_form.field.test');
    });

    // Form Submission Tests
    describe('Form Submission Module', function() {
        require('./05_form.submission.test');
    });

    // Question Response Tests
    describe('Question Response Module', function() {
        require('./06_question.response.test');
    });

    // Skip Logic Tests
    describe('Skip Logic Module', function() {
        require('./07_skip.logic.test');
    });

    // Validation Logic Tests
    describe('Validation Logic Module', function() {
        require('./08_validation.logic.test');
    });

    // Field Operations Tests
    describe('Field Operations Module', function() {
        require('./09_field.operations.test');
    });

    // Calculation Logic Tests
    describe('Calculation Logic Module', function() {
        require('./10_calculation.logic.test');
    });

    // Field Rules Tests
    describe('Field Rules Module', function() {
        require('./11_field.rules.test');
    });

    // Form Section Tests
    describe('Form Section Module', function() {
        require('./12_form.section.test');
    });

    // Input Unit List Tests
    describe('Input Unit List Module', function() {
        require('./13_input.unit.list.test');
    });

    // Favorite Template Tests
    describe('Favorite Template Module', function() {
        require('./14_favorite.template.test');
    });

    // Form Template Approval Tests
    describe('Form Template Approval Module', function() {
        require('./15_form.template.approval.test');
    });

    // Template Folder Tests
    describe('Template Folder Module', function() {
        require('./16_template.folder.test');
    });

    after(function() {
        console.log('All test suites completed.');
    });
}); 