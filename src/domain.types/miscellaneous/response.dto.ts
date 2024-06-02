import { RequestDto } from "./request.dto";

export interface ResponseDto {
    Status: String;
    Message: string;
    HttpCode: number;
    Request: RequestDto
    Data?: any;
    Trace?: string[];
    Context: string;
    ClientIps: string[];
    APIVersion: string;
    ServiceVersion: string;
}