import { faker } from "@faker-js/faker";
import { expect } from "chai";
import { setTestData } from "./init";

export function getRandomEnumValue<T>(en: T) {
  const values = Object.values(en as object);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

// Generate valid GUID
export function generateGuid(): string {
  return faker.string.uuid();
}

// Helper functions for API response validation
export function expectSuccessResponse(response: any) {
  expect(response.body).to.have.property('Status');
  expect(response.body.Status).to.equal('success');
  expect(response.body).to.have.property('Data');
}

export function expectFailureResponse(response: any) {
  expect(response.body).to.have.property('Status');
  expect(response.body.Status).to.equal('failure');
}

export function expectValidId(response: any) {
  expect(response.body.Data).to.have.property('id');
  expect(response.body.Data.id).to.be.a('string');
  expect(response.body.Data.id).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
}

export function expectValidArray(response: any) {
  expect(response.body.Data).to.be.an('array');
}

export function expectValidObject(response: any) {
  expect(response.body.Data).to.be.an('object');
}

export enum FieldTypes {
  'TEXT' = 'text',
  'NUMBER' = 'number',
  'EMAIL' = 'email',
  'PHONE' = 'phone',
  'DATE' = 'date',
  'DATETIME' = 'datetime',
  'BOOLEAN' = 'boolean',
  'SELECT' = 'select',
  'MULTISELECT' = 'multiselect',
  'TEXTAREA' = 'textarea',
  'FILE' = 'file',
  'RADIO' = 'radio',
  'CHECKBOX' = 'checkbox'
}

export enum FormStatus {
  'DRAFT' = 'draft',
  'PUBLISHED' = 'published',
  'ARCHIVED' = 'archived'
}

export enum SubmissionStatus {
  'LINKSHARED' = 'LinkShared',
  'SAVED' = 'Saved',
  'INPROGRESS' = 'InProgress',
  'LINKEXPIRED' = 'LinkExpired',
  'SUBMITTED' = 'Submitted'
}

export enum LogicTypes {
  'SKIP' = 'skip',
  'VALIDATION' = 'validation',
  'CALCULATION' = 'calculation'
}

export enum OperationTypes {
  'MATHEMATICAL' = 'mathematical',
  'LOGICAL' = 'logical',
  'COMPOSITION' = 'composition',
  'ITERATE' = 'iterate',
  'FUNCTION_EXPRESSION' = 'function_expression'
}

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const randomDays = faker.number.int({ min: 1, max: 365 });
const futureDate = new Date(year, month, day + randomDays);
const pastDate = new Date(year, month, day - randomDays);

const formattedMonth = month < 10 ? `0${month}` : month;
const formattedDay = day < 10 ? `0${day}` : day;

const futureYear = futureDate.getFullYear();
const pastYear = pastDate.getFullYear();

export const futureDateString = `${futureYear}-${formattedMonth}-${formattedDay}`;
export const pastDateString = `${pastYear}-${formattedMonth}-${formattedDay}`;

//Timezone
export const startDate = new Date(date.getTime() + (60 * 60 * 24 * 14) * 1000);
export const endDate = new Date(date.getTime() + (160 * 160 * 24 * 14) * 1000);

// Form-specific test data generators
export const generateFormTemplate = () => ({
  id: generateGuid(),
  name: faker.company.name(),
  description: faker.lorem.sentence(),
  version: faker.system.semver(),
  status: getRandomEnumValue(FormStatus),
  isPublic: faker.datatype.boolean(),
  metadata: {
    category: faker.commerce.department(),
    tags: [faker.word.noun(), faker.word.noun()]
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const generateFormField = (formTemplateId?: string) => ({
  id: generateGuid(),
  formTemplateId: formTemplateId || generateGuid(),
  name: faker.word.noun(),
  label: faker.lorem.words(2),
  type: getRandomEnumValue(FieldTypes),
  required: faker.datatype.boolean(),
  placeholder: faker.lorem.words(3),
  defaultValue: faker.lorem.word(),
  validationRules: {
    minLength: faker.number.int({ min: 1, max: 10 }),
    maxLength: faker.number.int({ min: 10, max: 100 }),
    pattern: '[A-Za-z0-9]{5,10}' // static regex pattern
  },
  order: faker.number.int({ min: 1, max: 10 }),
  options: faker.datatype.boolean() ? [
    { value: faker.word.noun(), label: faker.lorem.word() },
    { value: faker.word.noun(), label: faker.lorem.word() }
  ] : undefined,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

// Field Operations generators
export const generateMathematicalOperation = () => ({
  Name: faker.lorem.words(2),
  Description: faker.lorem.sentence(),
  Type: 'Mathematical',
  Operator: 'Add',
  Operands: JSON.stringify(['field1', 'field2']),
  ResultDataType: 'number'
});

export const generateLogicalOperation = () => ({
  Name: faker.lorem.words(2),
  Description: faker.lorem.sentence(),
  Type: 'Logical',
  Operator: 'Equal',
  Operands: JSON.stringify(['field1', 'field2'])
});

export const generateCompositionOperation = () => ({
  Name: faker.lorem.words(2),
  Description: faker.lorem.sentence(),
  Type: 'Composition',
  Operator: 'And',
  Operands: JSON.stringify(['condition1', 'condition2'])
});

export const generateIterateOperation = () => ({
  Name: faker.lorem.words(2),
  Description: faker.lorem.sentence(),
  Type: 'Iterate',
  CollectionField: 'numbers',
  ResultField: 'total',
  OperationId: generateGuid(),
  FilterExpression: 'value > 0'
});

export const generateFunctionExpressionOperation = () => ({
  Name: faker.lorem.words(2),
  Description: faker.lorem.sentence(),
  Type: 'FunctionExpression',
  Expression: 'field1 * field2 + field3',
  Variables: JSON.stringify({ field1: 'field1', field2: 'field2', field3: 'field3' }),
  ResultDataType: 'number'
});

// Field Rules generators
export const generateSkipRule = (operationId?: string, logicId?: string) => ({
  Name: faker.lorem.words(2),
  Description: faker.lorem.sentence(),
  Priority: faker.number.int({ min: 0, max: 10 }),
  IsActive: true,
  OperationId: operationId || generateGuid(),
  SkipWhenTrue: true,
  LogicId: logicId || generateGuid()
});

export const generateValidationRule = (operationId?: string, logicId?: string) => ({
  Name: faker.lorem.words(2),
  Description: faker.lorem.sentence(),
  Priority: faker.number.int({ min: 0, max: 10 }),
  IsActive: true,
  OperationId: operationId || generateGuid(),
  LogicId: logicId || generateGuid()
});

export const generateCalculationRule = (operationId?: string, logicId?: string) => ({
  Name: faker.lorem.words(2),
  Description: faker.lorem.sentence(),
  Priority: faker.number.int({ min: 0, max: 10 }),
  IsActive: true,
  OperationId: operationId || generateGuid(),
  LogicId: logicId || generateGuid()
});

export const generateFormSection = (formTemplateId?: string) => ({
  id: generateGuid(),
  formTemplateId: formTemplateId || generateGuid(),
  name: faker.lorem.words(2),
  description: faker.lorem.sentence(),
  order: faker.number.int({ min: 1, max: 10 }),
  isCollapsible: faker.datatype.boolean(),
  isCollapsed: faker.datatype.boolean(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const generateUser = () => ({
  id: generateGuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phone: faker.phone.number(),
  isActive: faker.datatype.boolean(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const generateFormSubmission = (formTemplateId?: string, submittedBy?: string) => ({
  id: generateGuid(),
  formTemplateId: formTemplateId || generateGuid(),
  submissionKey: faker.string.alphanumeric(16),
  status: getRandomEnumValue(SubmissionStatus),
  submittedBy: submittedBy || generateGuid(),
  submittedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const generateQuestionResponse = (formSubmissionId?: string, questionId?: string, formFieldId?: string) => ({
  id: generateGuid(),
  formSubmissionId: formSubmissionId || generateGuid(),
  questionId: questionId || generateGuid(),
  formFieldId: formFieldId || generateGuid(),
  responseType: 'text',
  sequence: faker.number.int({ min: 1, max: 10 }),
  text: faker.lorem.sentence(),
  userResponse: faker.lorem.sentence(),
  submissionTimestamp: new Date().toISOString(),
  lastSaveTimestamp: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const generateSkipLogic = (formFieldId?: string) => ({
  id: generateGuid(),
  formFieldId: formFieldId || generateGuid(),
  name: faker.lorem.words(2),
  description: faker.lorem.sentence(),
  condition: {
    field: faker.word.noun(),
    operator: 'equals',
    value: faker.lorem.word()
  },
  action: {
    type: 'hide',
    targetField: faker.word.noun()
  },
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const generateValidationLogic = (fieldId?: string) => ({
  Type: 'validation',
  FieldId: fieldId || generateGuid(),
  Enabled: true,
  DefaultSkip: false,
  FallbackValue: faker.lorem.word()
});

export const generateCalculationLogic = (fieldId?: string) => ({
  Type: 'calculation',
  FieldId: fieldId || generateGuid(),
  Enabled: true,
  DefaultSkip: false,
  FallbackValue: faker.lorem.word()
});

export const generateInputUnitList = () => ({
  id: generateGuid(),
  name: faker.lorem.words(2),
  description: faker.lorem.sentence(),
  units: ['kg', 'lbs', 'g', 'oz'],
  defaultUnit: 'kg',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const generateFavoriteTemplate = (userId?: string, formTemplateId?: string) => ({
  id: generateGuid(),
  userId: userId || generateGuid(),
  formTemplateId: formTemplateId || generateGuid(),
  name: faker.lorem.words(2),
  description: faker.lorem.sentence(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const generateFormTemplateApproval = (formTemplateId?: string, approverId?: string) => ({
  id: generateGuid(),
  formTemplateId: formTemplateId || generateGuid(),
  approverId: approverId || generateGuid(),
  status: 'pending',
  comments: faker.lorem.sentence(),
  approvedAt: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const generateTemplateFolder = (createdBy?: string) => ({
  id: generateGuid(),
  name: faker.lorem.words(2),
  description: faker.lorem.sentence(),
  parentFolderId: null,
  createdBy: createdBy || generateGuid(),
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});