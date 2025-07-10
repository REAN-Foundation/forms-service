import { 
    BaseLogicResponseDto,
    SkipLogicResponseDto,
    CalculationLogicResponseDto,
    ValidationLogicResponseDto,
    LegacyLogicResponseDto
} from "../../../../domain.types/forms/logic.domain.types";

export class LogicMapper {
    static toBaseDto = (record: any): BaseLogicResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: BaseLogicResponseDto = {
            id: record.id,
            Type: record.Type,
            DefaultSkip: record.DefaultSkip,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toSkipLogicDto = (record: any): SkipLogicResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: SkipLogicResponseDto = {
            id: record.id,
            Type: record.Type,
            DefaultSkip: record.DefaultSkip,
            Rules: record.Rules ? record.Rules.map((rule: any) => ({
                id: rule.id,
                OperationId: rule.OperationId,
                SkipWhenTrue: rule.SkipWhenTrue,
                LogicId: rule.LogicId,
                CreatedAt: rule.CreatedAt,
                UpdatedAt: rule.UpdatedAt
            })) : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toCalculationLogicDto = (record: any): CalculationLogicResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: CalculationLogicResponseDto = {
            id: record.id,
            Type: record.Type,
            DefaultSkip: record.DefaultSkip,
            FallbackValue: record.FallbackValue,
            Rules: record.Rules ? record.Rules.map((rule: any) => ({
                id: rule.id,
                ConditionForOperationId: rule.ConditionForOperationId,
                OperationId: rule.OperationId,
                LogicId: rule.LogicId,
                CreatedAt: rule.CreatedAt,
                UpdatedAt: rule.UpdatedAt
            })) : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toValidationLogicDto = (record: any): ValidationLogicResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: ValidationLogicResponseDto = {
            id: record.id,
            Type: record.Type,
            DefaultSkip: record.DefaultSkip,
            Rules: record.Rules ? record.Rules.map((rule: any) => ({
                id: rule.id,
                OperationId: rule.OperationId,
                ErrorWhenFalse: rule.ErrorWhenFalse,
                ErrorMessage: rule.ErrorMessage,
                LogicId: rule.LogicId,
                CreatedAt: rule.CreatedAt,
                UpdatedAt: rule.UpdatedAt
            })) : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toLegacyLogicDto = (record: any): LegacyLogicResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: LegacyLogicResponseDto = {
            id: record.id,
            Type: record.Type,
            DefaultSkip: record.DefaultSkip,
            Rules: record.Rules ? record.Rules.map((rule: any) => ({
                id: rule.id,
                OperationId: rule.OperationId,
                LogicId: rule.LogicId,
                CreatedAt: rule.CreatedAt,
                UpdatedAt: rule.UpdatedAt
            })) : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayBaseDto(records: any[]): BaseLogicResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => LogicMapper.toBaseDto(record));
    }

    static toArraySkipLogicDto(records: any[]): SkipLogicResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => LogicMapper.toSkipLogicDto(record));
    }

    static toArrayCalculationLogicDto(records: any[]): CalculationLogicResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => LogicMapper.toCalculationLogicDto(record));
    }

    static toArrayValidationLogicDto(records: any[]): ValidationLogicResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => LogicMapper.toValidationLogicDto(record));
    }

    static toArrayLegacyLogicDto(records: any[]): LegacyLogicResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => LogicMapper.toLegacyLogicDto(record));
    }
} 