export enum FormStatus {
    LinkShared,
    Presented,
    InProgress,
    Submitted,
}

export enum QueryResponseType {
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
export enum FormType {
    Survey,
    Questionnaire,
    TestPaper,
    DataCollection
  }