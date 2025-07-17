import { RequestDto } from './request.dto';

export interface ResponseDto {
    Status: string;
    Message: string;
    HttpCode: number;
    Request: RequestDto;
    Data?: any;
}
