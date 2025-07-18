import { FormTemplateApprovalResponseDto } from '../../domain.types/form.template.approval.domain.types';

export class FormTemplateApprovalMapper {
    static toDto = (record: any): FormTemplateApprovalResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FormTemplateApprovalResponseDto = {
            id: record.id,
            ApproverUserId: record.ApproverUserId,
            TemplateId: record.TemplateId,
            Approved: record.Approved,
            ReviewComments: record.ReviewComments,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): FormTemplateApprovalResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => FormTemplateApprovalMapper.toDto(record));
    }
}
