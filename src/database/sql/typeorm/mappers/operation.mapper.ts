import { 
    BaseOperationResponseDto,
    LogicalOperationResponseDto,
    MathematicalOperationResponseDto,
    CompositionOperationResponseDto,
    IterateOperationResponseDto,
    FunctionExpressionOperationResponseDto
} from "../../../../domain.types/forms/operation.domain.types";

export class OperationMapper {
    static toBaseDto = (record: any): BaseOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: BaseOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toLogicalOperationDto = (record: any): LogicalOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: LogicalOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            OperatorType: record.OperatorType,
            LeftOperand: record.LeftOperand,
            RightOperand: record.RightOperand,
            Parameters: record.Parameters,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toMathematicalOperationDto = (record: any): MathematicalOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: MathematicalOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            OperatorType: record.OperatorType,
            LeftOperand: record.LeftOperand,
            RightOperand: record.RightOperand,
            Parameters: record.Parameters,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toCompositionOperationDto = (record: any): CompositionOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: CompositionOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            OperatorType: record.OperatorType,
            LeftOperand: record.LeftOperand,
            RightOperand: record.RightOperand,
            Parameters: record.Parameters,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toIterateOperationDto = (record: any): IterateOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: IterateOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            ArrayOperand: record.ArrayOperand,
            ItemAlias: record.ItemAlias,
            OperationId: record.OperationId,
            Operation: record.Operation ? {
                id: record.Operation.id,
                Name: record.Operation.Name,
                Description: record.Operation.Description
            } : undefined,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toFunctionExpressionOperationDto = (record: any): FunctionExpressionOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FunctionExpressionOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            FunctionName: record.FunctionName,
            Parameters: record.Parameters,
            Expression: record.Expression,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt
        };
        return dto;
    };

    static toArrayBaseDto(records: any[]): BaseOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => OperationMapper.toBaseDto(record));
    }

    static toArrayLogicalOperationDto(records: any[]): LogicalOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => OperationMapper.toLogicalOperationDto(record));
    }

    static toArrayMathematicalOperationDto(records: any[]): MathematicalOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => OperationMapper.toMathematicalOperationDto(record));
    }

    static toArrayCompositionOperationDto(records: any[]): CompositionOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => OperationMapper.toCompositionOperationDto(record));
    }

    static toArrayIterateOperationDto(records: any[]): IterateOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => OperationMapper.toIterateOperationDto(record));
    }

    static toArrayFunctionExpressionOperationDto(records: any[]): FunctionExpressionOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => OperationMapper.toFunctionExpressionOperationDto(record));
    }
} 