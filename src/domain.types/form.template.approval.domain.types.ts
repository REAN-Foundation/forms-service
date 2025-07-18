import {
    BaseSearchFilters,
    BaseSearchResults,
} from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

// Form Template Approval DTOs
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
    ApproverUserId?: uuid;
    TemplateId?: uuid;
    Approved?: boolean;
    ReviewComments?: string;
}

export interface FormTemplateApprovalSearchResults extends BaseSearchResults {
    Items: FormTemplateApprovalResponseDto[];
}
