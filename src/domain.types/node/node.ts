

export interface QuestionDto {

    nodeType?: String,
    parentNodeId?: String,
    title?: String,
    description?: String,
    sequence?: Number,
    queryType?: String,
    resolutionScore?: Number,
    providerAssessmentCode?: String,
    message?: String,
    serveListNodeChildrenAtOnce?: Boolean,
    scoringApplicable?: Boolean,
    options?: String,
}

export interface QuestionUpdateModel {
    question?: string,
    type?: String,
}

