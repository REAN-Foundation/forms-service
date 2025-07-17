import { TemplateFolderResponseDto } from '../../../../domain.types/forms/template.folder.domain.types';

export class TemplateFolderMapper {
    static toDto = (record: any): TemplateFolderResponseDto => {
        if (record === null) {
            return null;
        }
        const dto: TemplateFolderResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            ParentFolderId: record.ParentFolderId,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): TemplateFolderResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => TemplateFolderMapper.toDto(record));
    }
}
