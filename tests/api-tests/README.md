# Forms Service API Test Suite

This directory contains comprehensive Mocha tests for the Forms Service API endpoints. The test suite covers all major functionality including form templates, fields, submissions, skip logic, validation, and more.

## 📁 Test Structure

```
tests/api-tests/
├── init.ts                 # Test initialization and setup
├── utils.ts               # Test utilities and data generators
├── .mocharc.json          # Mocha configuration
├── test.data/             # Test data files
│   └── test.data.json     # Static test data
└── tests/                 # Test files
    ├── 01_health.test.ts                    # Health check tests
    ├── 02_user.test.ts                      # User management tests
    ├── 03_form.template.test.ts             # Form template tests
    ├── 04_form.field.test.ts                # Form field tests
    ├── 05_form.submission.test.ts           # Form submission tests
    ├── 06_question.response.test.ts         # Question response tests
    ├── 07_skip.logic.test.ts                # Skip logic tests
    ├── 08_validation.logic.test.ts          # Validation logic tests
    ├── 09_field.operations.test.ts          # Field operations tests
    ├── 10_calculation.logic.test.ts         # Calculation logic tests
    ├── 11_field.rules.test.ts               # Field rules tests
    ├── 12_form.section.test.ts              # Form section tests
    ├── 13_input.unit.list.test.ts           # Input unit list tests
    ├── 14_favorite.template.test.ts         # Favorite template tests
    ├── 15_form.template.approval.test.ts    # Form template approval tests
    └── 16_template.folder.test.ts           # Template folder tests
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Forms Service running locally

### Installation

1. Install test dependencies:
```bash
npm install --save-dev mocha chai supertest @types/mocha @types/chai @types/supertest faker nyc
```

2. Ensure the Forms Service is running:
```bash
npm start
```

### Running Tests

#### Run All Tests
```bash
npm test
```

#### Run Specific Test File
```bash
npx mocha tests/api-tests/tests/01_health.test.ts
```

#### Run Tests with Coverage
```bash
npx nyc mocha tests/api-tests/tests/**/*.test.ts
```

#### Run Tests in Watch Mode
```bash
npx mocha --watch tests/api-tests/tests/**/*.test.ts
```

## 📋 Test Coverage

### Core Functionality
- **Health Checks**: API availability and basic functionality
- **User Management**: CRUD operations for users
- **Form Templates**: Template creation, management, and publishing
- **Form Fields**: Field configuration and validation
- **Form Submissions**: Data collection and processing
- **Question Responses**: Response handling and export

### Advanced Features
- **Skip Logic**: Conditional field visibility
- **Validation Logic**: Field validation rules
- **Calculation Logic**: Mathematical operations
- **Field Operations**: Mathematical, logical, composition, iterate, and function expression operations
- **Field Rules**: Skip, validation, and calculation rules

### Organization Features
- **Form Sections**: Section management and organization
- **Input Unit Lists**: Unit conversion and management
- **Favorite Templates**: User favorites management
- **Template Approvals**: Approval workflow
- **Template Folders**: Hierarchical organization

## 🧪 Test Categories

### Positive Tests
- ✅ Create operations
- ✅ Read operations (get by ID, search)
- ✅ Update operations
- ✅ Delete operations
- ✅ Special endpoints (export, preview, submit)

### Negative Tests
- ❌ Invalid data validation
- ❌ Non-existent resource handling
- ❌ Invalid request formats
- ❌ Missing required fields

### Edge Cases
- 🔄 Complex data structures
- 🔄 Nested relationships
- 🔄 Multiple operations
- 🔄 Different data types

## 📊 Test Data Management

### Test Data Flow
1. **Setup**: Tests create necessary data (users, templates, etc.)
2. **Execution**: Tests perform operations using created data
3. **Cleanup**: Tests clean up created data (optional)

### Data Sharing
- Tests can share data using the `setTestData()` and `getTestData()` functions
- Data persists across test files in the same run
- Each test run starts with a clean state

### Test Data Generators
The `utils.ts` file contains functions to generate realistic test data:
- `generateUser()` - User data
- `generateFormTemplate()` - Form template data
- `generateFormField()` - Form field data
- `generateFormSection()` - Form section data
- `generateSkipLogic()` - Skip logic data
- `generateValidationLogic()` - Validation logic data
- `generateCalculationLogic()` - Calculation logic data

## 🔧 Configuration

### Mocha Configuration
The `.mocharc.json` file configures Mocha behavior:
- Timeout settings
- Test file patterns
- Reporter configuration
- Environment setup

### Test Environment
- Tests run against the local Forms Service instance
- Database should be configured for testing
- Environment variables can be set in test setup

## 🐛 Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure Forms Service is running
   - Check port configuration
   - Verify firewall settings

2. **Database Errors**
   - Check database connection
   - Ensure test database is configured
   - Verify schema migrations

3. **Test Timeouts**
   - Increase timeout in `.mocharc.json`
   - Check for long-running operations
   - Verify network connectivity

4. **Data Conflicts**
   - Ensure tests clean up after themselves
   - Use unique identifiers for test data
   - Check for concurrent test execution

### Debug Mode
Run tests with verbose output:
```bash
npx mocha --reporter spec --timeout 10000 tests/api-tests/tests/**/*.test.ts
```

## 📈 Continuous Integration

### GitHub Actions
The test suite can be integrated into CI/CD pipelines:

```yaml
- name: Run API Tests
  run: |
    npm install
    npm test
```

### Test Reports
- Test results are displayed in the console
- Coverage reports can be generated with NYC
- Failed tests provide detailed error information

## 🤝 Contributing

### Adding New Tests
1. Create a new test file following the naming convention
2. Import required dependencies and utilities
3. Write comprehensive positive and negative tests
4. Update this README with new test coverage

### Test Guidelines
- Use descriptive test names
- Include both positive and negative test cases
- Clean up test data when necessary
- Follow the existing code style
- Add comments for complex test scenarios

## 📚 Additional Resources

- [Mocha Documentation](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [Supertest HTTP Testing](https://github.com/visionmedia/supertest)
- [Forms Service API Documentation](../docs/api/overview.md) 