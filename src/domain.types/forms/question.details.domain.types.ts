export interface QuestionDetailsCreateModel {
    QuestionId:string;
    Option: string;
    OptionSequence: number;
    FileResourceId: string;
    QuestionImageUrl: string;
    RangeMin: number;
    RangeMax: number;
}

export interface QuestionDetailsUpdateModel {
    QuestionId?:string;
    Option?: string;
    OptionSequence?: number;
    FileResourceId?: string;
    QuestionImageUrl?: string;
    RangeMin?: number;
    RangeMax?: number;
}

export interface QuestionDetailsResponseDto {
    id: string;
    Question: {
        id: string;
        Title: string;
        Description: string;
        DisplayCode: string;
        ResponseType: string;
        TemplateId:string
        SectionId:string;
        CreatedAt: Date;
    }
    Option: string;
    OptionSequence: number;
    FileResourceId: string;
    QuestionImageUrl: string;
    RangeMin: number;
    RangeMax: number;
   
}
