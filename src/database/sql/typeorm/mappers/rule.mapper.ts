import { 
    BaseRuleResponseDto,
    SkipRuleResponseDto,
    CalculationRuleResponseDto,
    ValidationRuleResponseDto,
    LegacyRuleResponseDto
} from "../../../../domain.types/forms/rule.domain.types";

export class RuleMapper {
    static toBaseDto = (record: any): BaseRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: BaseRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Priority: record.Priority,
            IsActive: record.IsActive,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toSkipRuleDto = (record: any): SkipRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: SkipRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Priority: record.Priority,
            IsActive: record.IsActive,
            OperationId: record.OperationId,
            SkipWhenTrue: record.SkipWhenTrue,
            LogicId: record.LogicId,
            Operation: record.Operation ? {
                id: record.Operation.id,
                Name: record.Operation.Name,
                Description: record.Operation.Description
            } : undefined,
            Logic: record.Logic ? {
                id: record.Logic.id,
                Type: record.Logic.Type,
                DefaultSkip: record.Logic.DefaultSkip
            } : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toCalculationRuleDto = (record: any): CalculationRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: CalculationRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Priority: record.Priority,
            IsActive: record.IsActive,
            ConditionForOperationId: record.ConditionForOperationId,
            OperationId: record.OperationId,
            LogicId: record.LogicId,
            ConditionForOperation: record.ConditionForOperation ? {
                id: record.ConditionForOperation.id,
                Name: record.ConditionForOperation.Name,
                Description: record.ConditionForOperation.Description
            } : undefined,
            Operation: record.Operation ? {
                id: record.Operation.id,
                Name: record.Operation.Name,
                Description: record.Operation.Description
            } : undefined,
            Logic: record.Logic ? {
                id: record.Logic.id,
                Type: record.Logic.Type,
                DefaultSkip: record.Logic.DefaultSkip,
                FallbackValue: record.Logic.FallbackValue
            } : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toValidationRuleDto = (record: any): ValidationRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: ValidationRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Priority: record.Priority,
            IsActive: record.IsActive,
            OperationId: record.OperationId,
            ErrorWhenFalse: record.ErrorWhenFalse,
            ErrorMessage: record.ErrorMessage,
            LogicId: record.LogicId,
            Operation: record.Operation ? {
                id: record.Operation.id,
                Name: record.Operation.Name,
                Description: record.Operation.Description
            } : undefined,
            Logic: record.Logic ? {
                id: record.Logic.id,
                Type: record.Logic.Type,
                DefaultSkip: record.Logic.DefaultSkip
            } : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toLegacyRuleDto = (record: any): LegacyRuleResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: LegacyRuleResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            Priority: record.Priority,
            IsActive: record.IsActive,
            OperationId: record.OperationId,
            LogicId: record.LogicId,
            Operation: record.Operation ? {
                id: record.Operation.id,
                Name: record.Operation.Name,
                Description: record.Operation.Description
            } : undefined,
            Logic: record.Logic ? {
                id: record.Logic.id,
                Type: record.Logic.Type,
                DefaultSkip: record.Logic.DefaultSkip
            } : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayBaseDto(records: any[]): BaseRuleResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => RuleMapper.toBaseDto(record));
    }

    static toArraySkipRuleDto(records: any[]): SkipRuleResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => RuleMapper.toSkipRuleDto(record));
    }

    static toArrayCalculationRuleDto(records: any[]): CalculationRuleResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => RuleMapper.toCalculationRuleDto(record));
    }

    static toArrayValidationRuleDto(records: any[]): ValidationRuleResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => RuleMapper.toValidationRuleDto(record));
    }

    static toArrayLegacyRuleDto(records: any[]): LegacyRuleResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => RuleMapper.toLegacyRuleDto(record));
    }
} 