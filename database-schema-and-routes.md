## Database Schema

1. FormTemplate - Table name: `form_templates`
   - id
   - Title
   - Description
   - CurrentVersion: number
   - Type: enum FormType
   - DisplayCode
   - OwnerUserId
   - RootSectionId
   - DefaultSectionNumbering: boolean - e.g. 1.2, 1.1.4,..., etc.
   - CreatedAt
   - UpdatedAt
   - DeletedAt
  
2. FormSection - Table name: `form_sections`
   - id
   - TemplateId
   - SectionIdentifier 
   - Title
   - Description
   - DisplayCode
   - Sequence
   - ParentSectionId
   - CreatedAt
   - UpdatedAt
   - DeletedAt

3. Question - Table name: `questions`
   - id
   - TemplateId
   - SectionId
   - Title
   - Description
   - DisplayCode
   - ResponseType: enum QueryResponseType
   - Score
   - CorrectAnswer
   - Hint
   - CreatedAt
   - UpdatedAt
   - DeletedAt

4. QuestionOption - Table name: `question_details`
   - QuestionId
   - Option
   - OptionSequence: number (integer)
   - FileResourceId
   - QuestionImageUrl
   - RangeMin
   - RangeMax
  
5. Form - Table name: `forms`
   - id
   - TemplateId
   - FormUrl
   - AnsweredByUserId
   - Status: enum FormStatus
   - SubmissionTimestamp
   - CreatedAt
   - UpdatedAt
   - DeletedAt

6. FormSubmission - Table name: `form_submissions`
   - id
   - FormId
   - TemplateId
   - QuestionId
   - ResponseType
   - IntegerValue
   - FloatValue
   - BooleanValue
   - DateTimeValue
   - Url
   - FileResourceId
   - TextValue
   - SubmissionTimestamp
   - LastSaveTimestamp
   - CreatedAt
   - UpdatedAt
   - DeletedAt

7. User - Table name: `users`
   - id
   - FirstName
   - LastName
   - CountryCode
   - Phone
   - Email
   - Username
   - Password
   - CreatedAt
   - UpdatedAt
   - DeletedAt

8. UserLoginSession - Table name: `user_login_sessions`
   - id
   - UserId
   - IsActiveSession
   - StartedAt
   - ValidTill
   - CreatedAt
   - UpdatedAt
   - DeletedAt

## Enums

1. Form types
   ``` typescript
   export enum FormType {
     Survey         = 'Survey',
     Questionnaire  = 'Questionnaire',
     TestPaper      = 'Test Paper',
     DataCollection = 'Data Collection'
   }
   ```
   
2. Response Types Supported -
   ``` typescript
   export enum QueryResponseType {
      Text                  = 'Text',
      Float                 = 'Float',
      Integer               = 'Integer',
      Boolean               = 'Boolean',
      Object                = 'Object',
      TextArray             = 'Text Array',
      FloatArray            = 'Float Array',
      IntegerArray          = 'Integer Array',
      BooleanArray          = 'Boolean Array',
      ObjectArray           = 'Object Array',
      SingleChoiceSelection = 'Single Choice Selection',
      MultiChoiceSelection  = 'Multi Choice Selection',
      File                  = 'File',
      Date                  = 'Date',
      DateTime              = 'DateTime',
      Rating                = 'Rating',
      Location              = 'Location',
      Range                 = 'Range',
      Ok                    = 'Ok', //Acknowledgement
      None                  = 'None', //Not expecting response
   }
   ```

3. Form Status types
   ``` typescript
   export enum FormStatus {
     LinkShared = 'Link Shared',
     Presented  = 'Presented',
     InProgress = 'In-Progress',
     Submitted  = 'Submitted'
   }
   ```

## Routes

1. FormTemplate routes - `form.template.routes.ts`
   - POST: Create form template - `/api/v1/form-templates/`
   - PUT: Update form template - `/api/v1/form-templates/:id`
   - GET: Get form template - `/api/v1/form-templates/:id`
   - GET: Serach form templates - `/api/v1/form-templates/search?`
   - DELETE: Delete form template - `/api/v1/form-templates/:id`
   - GET: Get all submissions for the template - `/api/v1/form-templates/:id/submissions`
  
2. FormSection routes - `form.section.routes.ts`
   - POST: Create form section - `/api/v1/form-sections`
   - PUT: Update form section - `/api/v1/form-sections/:id`
   - GET: Get form section - `/api/v1/form-sections/:id`
   - DELETE: Delete form section - `/api/v1/form-sections/:id`
  
3. FormQuestion routes - `form.question.routes.ts`
   - GET: Get questions for section - `/api/v1/form-questions/by-section:sectionId`
   - POST: Create question - `/api/v1/form-questions`
   - PUT: Update question - `/api/v1/form-questions/:id`
   - GET: Get question - `/api/v1/form-questions/:id`
   - DELETE: Delete question - `/api/v1/form-questions/:id`

3. Form routes - `form.routes.ts`
   - POST: Create form - `/api/v1/forms`
   - PUT: Update form - `/api/v1/forms/:id` - This saves current state of the form
   - GET: Get form - `/api/v1/forms/:id`
   - DELETE: Delete form - `/api/v1/forms/:id`
   - GET: Get forms for template - `/api/v1/forms/by-template:templateId`
   - GET: Get form question response details - `/api/v1/forms/:id/questions/:questionId`
   - POST: Submit form - `/api/v1/forms/:id/submit`

  
   
