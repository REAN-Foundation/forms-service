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
   - AddSaveButton
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
   - SaveTimestamp
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
   ```
   export enum FormType {
     Survey         = 'Survey',
     Questionnaire  = 'Questionnaire',
     TestPaper      = 'Test Paper',
     DataCollection = 'Data Collection'
   }
   ```
   
2. Response Types Supported -
   `export enum QueryResponseType {
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
   }`

3. Form Status types
   `export enum FormStatus {
     LinkShared = 'Link Shared',
     Presented  = 'Presented',
     InProgress = 'In-Progress',
     Submitted  = 'Submitted'
   }`
