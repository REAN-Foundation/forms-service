import { BaseOperationResponseDto, OperationResponseDto } from '../../domain.types/operations/base.operation.domain.types';
import { CompositionOperation } from '../models/operation/composition.operation.model';
import { FunctionExpressionOperation } from '../models/operation/function.expression.operation.model';
import { IterateOperation } from '../models/operation/iterate.operation.model';
import { MathematicalOperation } from '../models/operation/mathematical.operation.model';
import { LogicalOperation } from '../models/operation/logical.operation.model';
import { LogicalOperationMapper } from './logical.operation.mapper';
import { CompositionOperationMapper } from './composition.operation.mapper';
import { IterateOperationMapper } from './iterate.operation.mapper';
import { FunctionExpressionOperationMapper } from './function.expression.operation.mapper';
import { MathematicalOperationMapper } from './mathematical.operation.mapper';
import { OperationType } from '../../domain.types/enums/operation.enums';
import { Operand } from '../../domain.types/operations/base.operation.domain.types';
import { LogicalOperation as ILogicalOperation, MathematicalOperation as IMathematicalOperation, CompositionOperation as ICompositionOperation, IterateOperation as IIterateOperation, FunctionExpressionOperation as IFunctionExpressionOperation, Operation as IOperation } from '../../domain.types/operations/base.operation.domain.types';

export class BaseOperationMapper {
    static toDto = (record: any): BaseOperationResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: BaseOperationResponseDto = {
            id: record.id,
            Name: record.Name,
            Description: record.Description,
            // Type: record.Type,
            CreatedAt: record.CreatedAt,
            UpdatedAt: record.UpdatedAt,
        };
        return dto;
    };

    static toArrayDto(records: any[]): BaseOperationResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => BaseOperationMapper.toDto(record));
    }
}

export class OperationMapper {
    static toOperationDto(entity: LogicalOperation | MathematicalOperation | CompositionOperation | IterateOperation | FunctionExpressionOperation): OperationResponseDto {
        if (entity instanceof LogicalOperation) {
            return LogicalOperationMapper.toDto(entity);
        } else if (entity instanceof MathematicalOperation) {
            return MathematicalOperationMapper.toDto(entity);
        } else if (entity instanceof CompositionOperation) {
            return CompositionOperationMapper.toDto(entity);
        } else if (entity instanceof IterateOperation) {
            return IterateOperationMapper.toDto(entity);
        } else if (entity instanceof FunctionExpressionOperation) {
            return FunctionExpressionOperationMapper.toDto(entity);
        }

        throw new Error(`Unknown operation type for entity: ${JSON.stringify(entity)}`);
    }

    // Convert database entities to interface objects
    static toLogicalOperationInterface(entity: LogicalOperation): ILogicalOperation {
        return {
            id: entity.id,
            Type: OperationType.Logical,
            Operator: entity.Operator,
            Operands: JSON.parse(entity.Operands) as Operand[],
            ValueDefinition: entity.ValueDefinition
        };
    }

    static toMathematicalOperationInterface(entity: MathematicalOperation): IMathematicalOperation {
        return {
            id: entity.id,
            Type: OperationType.Mathematical,
            Operator: entity.Operator,
            Operands: JSON.parse(entity.Operands) as Operand[]
        };
    }

    static toCompositionOperationInterface(entity: CompositionOperation, childOperations?: IOperation[]): ICompositionOperation {
        return {
            id: entity.id,
            Type: OperationType.Composition,
            Operator: entity.Operator,
            Children: childOperations || JSON.parse(entity.Children) as IOperation[]
        };
    }

    static toIterateOperationInterface(entity: IterateOperation, childOperation?: IOperation): IIterateOperation {
        return {
            id: entity.id,
            Type: OperationType.Iterate,
            ArrayOperand: JSON.parse(entity.ArrayOperand) as Operand,
            ItemAlias: entity.ItemAlias,
            Operation: childOperation || {} as IOperation // This should be resolved by the service
        };
    }

    static toFunctionExpressionOperationInterface(entity: FunctionExpressionOperation): IFunctionExpressionOperation {
        return {
            id: entity.id,
            Type: OperationType.FunctionExpression,
            Expression: entity.Expression,
            Variables: JSON.parse(entity.Variables) as Record<string, Operand>
        };
    }

    static toOperationInterface(entity: LogicalOperation | MathematicalOperation | CompositionOperation | IterateOperation | FunctionExpressionOperation): IOperation {
        if (entity instanceof LogicalOperation) {
            return this.toLogicalOperationInterface(entity);
        } else if (entity instanceof MathematicalOperation) {
            return this.toMathematicalOperationInterface(entity);
        } else if (entity instanceof CompositionOperation) {
            return this.toCompositionOperationInterface(entity);
        } else if (entity instanceof IterateOperation) {
            return this.toIterateOperationInterface(entity);
        } else if (entity instanceof FunctionExpressionOperation) {
            return this.toFunctionExpressionOperationInterface(entity);
        }

        throw new Error(`Unknown operation type for entity: ${JSON.stringify(entity)}`);
    }

    // Convert interface objects to database entities (for creation)
    static fromLogicalOperationInterface(operation: ILogicalOperation): Partial<LogicalOperation> {
        return {
            Type: OperationType.Logical,
            Operator: operation.Operator,
            Operands: JSON.stringify(operation.Operands),
            ValueDefinition: operation.ValueDefinition
        };
    }

    static fromMathematicalOperationInterface(operation: IMathematicalOperation): Partial<MathematicalOperation> {
        return {
            Type: OperationType.Mathematical,
            Operator: operation.Operator,
            Operands: JSON.stringify(operation.Operands)
        };
    }

    static fromCompositionOperationInterface(operation: ICompositionOperation): Partial<CompositionOperation> {
        // For composition operations, we need to convert child operations to IDs
        const childIds = operation.Children.map(child => child.id);
        return {
            Type: OperationType.Composition,
            Operator: operation.Operator,
            Children: JSON.stringify(childIds)
        };
    }

    static fromIterateOperationInterface(operation: IIterateOperation): Partial<IterateOperation> {
        return {
            Type: OperationType.Iterate,
            ArrayOperand: JSON.stringify(operation.ArrayOperand),
            ItemAlias: operation.ItemAlias,
            OperationId: operation.Operation.id
        };
    }

    static fromFunctionExpressionOperationInterface(operation: IFunctionExpressionOperation): Partial<FunctionExpressionOperation> {
        return {
            Type: OperationType.FunctionExpression,
            Expression: operation.Expression,
            Variables: JSON.stringify(operation.Variables)
        };
    }

    // Batch conversion methods
    static toOperationDtos(entities: (LogicalOperation | MathematicalOperation | CompositionOperation | IterateOperation | FunctionExpressionOperation)[]): OperationResponseDto[] {
        return entities.map(entity => this.toOperationDto(entity));
    }

    static toOperationInterfaces(entities: (LogicalOperation | MathematicalOperation | CompositionOperation | IterateOperation | FunctionExpressionOperation)[]): IOperation[] {
        return entities.map(entity => this.toOperationInterface(entity));
    }

}