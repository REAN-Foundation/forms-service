export interface QuestionDetailsCreateDto {
    QuestionId:string;
    Option: string;
    OptionSequence: number;
    FileResourceId: String;
    QuestionImageUrl: String;
    RangeMin: number;
    RangeMax: number;
}

export interface QuestionDetailsUpdateDto {
    QuestionId?:string;
    Option?: string;
    OptionSequence?: number;
    FileResourceId?: String;
    QuestionImageUrl?: String;
    RangeMin?: number;
    RangeMax?: number;
}

export interface QuestionDetailsResponseDto {
    id: String;
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
    FileResourceId: String;
    QuestionImageUrl: String;
    RangeMin: number;
    RangeMax: number;
   
}
