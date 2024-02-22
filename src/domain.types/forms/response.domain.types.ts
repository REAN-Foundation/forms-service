export interface ResponseCreateDto {
    FormId: string;
    FormTemplateId: string;
    QuestionId: String;
    ResponseType: QueryResponseType;
    IntegerValue: number;
    FloatValue: GLfloat;
    BooleanValue: boolean;
    DateTimeValue: Date;
    Url: string;
    FileResourceId: string;
    TextValue: string;
    SubmissionTimestamp: Date;
    LastSaveTimestamp: Date
    CreatedAt: Date;
}

export interface ResponseUpdateDto {
    FormId?: string;
    FormTemplateId?: string;
    QuestionId?: String;
    ResponseType?: QueryResponseType;
    IntegerValue?: number;
    FloatValue?: GLfloat;
    BooleanValue?: boolean;
    DateTimeValue?: Date;
    Url?: string;
    FileResourceId?: string;
    TextValue?: string;
    SubmissionTimestamp?: Date;
    LastSaveTimestamp?: Date
    CreatedAt?: Date;
}

export interface ResponseResponseDto {
    id: String;
    Form: {
        id: String;
        TemplateId: string;
        FormUrl: string;
        UserId: string;
        Status: FormStatus;
        SubmissionTimestamp: Date;
        CreatedAt: Date;
    }
    FormTemplate: {
        id: String;
        Title: String;
        Description: String;
        CurrentVersion: number;
        Type: String;
        DisplayCode: String;
        OwnerUserId: String;
        RootSectionId: String;
        DefaultSectionNumbering: Boolean
        CreatedAt: Date;
    }
    Question: {
        id: string;
        Title: string;
        Description: string;
        DisplayCode: string;
        ResponseType: QueryResponseType;
        Score: number;
        CorrectAnswer: String;
        Hint: String;
        TemplateId: string;
        SectionId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
    }
    ResponseType: QueryResponseType;
    IntegerValue: number;
    FloatValue: GLfloat;
    BooleanValue: boolean;
    DateTimeValue: Date;
    Url: string;
    FileResourceId: string;
    TextValue: string;
    SubmissionTimestamp: Date;
    LastSaveTimestamp: Date
}

enum FormStatus {
    LinkShared,
    Presented,
    InProgress,
    Submitted,
}

enum QueryResponseType {
    Text,
    Float,
    Integer,
    Boolean,
    Object,
    TextArray,
    // FloatArray
    // IntegerArray
    // BooleanArray
    // ObjectArray
    SinglehoiceSelection,
    MultiChoiceSelection,
    File,
    Date,
    DateTime,
    Rating,
    Location,
    Range,
    //ok//Acknowledgement
    None //Not expecting response
}