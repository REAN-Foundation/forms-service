import {
    BaseSearchFilters,
    BaseSearchResults,
} from '../miscellaneous/base.search.types';
import { uuid } from '../miscellaneous/system.types';

export interface FormTemplateApprovalCreateModel {
    ApproverUserId: string;
    TemplateId: string;
    Approved: boolean;
    ReviewComments?: string;
}

export interface FormTemplateApprovalUpdateModel {
    ApproverUserId?: string;
    TemplateId?: string;
    Approved?: boolean;
    ReviewComments?: string;
}

export interface FormTemplateApprovalResponseDto {
    id: string;
    ApproverUserId: string;
    TemplateId: string;
    Approved: boolean;
    ReviewComments?: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface FormTemplateApprovalSearchFilters extends BaseSearchFilters {
    id?: string;
    ApproverUserId?: uuid;
    TemplateId?: uuid;
    Approved?: boolean;
}

export interface FormTemplateApprovalSearchResults extends BaseSearchResults {
    Items: FormTemplateApprovalResponseDto[];
}
