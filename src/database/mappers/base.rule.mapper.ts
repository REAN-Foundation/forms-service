import { CalculationRule } from "../models/rule/calculation.rule.model";
import { SkipRuleMapper } from "./skip.rule.mapper";
import { ValidationRuleMapper } from "./validation.rule.mapper";
import { CalculationRuleMapper } from "./calculation.rule.mapper";
import { SkipRule } from "../models/rule/skip.rule.model";
import { ValidationRule } from "../models/rule/validation.rule.model";
import { RuleResponseDto } from "../../domain.types/rules/base.rule.domain.types";
import { SkipRule as ISkipRule, CalculationRule as ICalculationRule, ValidationRule as IValidationRule } from "../../domain.types/rules/base.rule.domain.types";

export class RuleMapper {

    static toRuleDto(entity: SkipRule | CalculationRule | ValidationRule): RuleResponseDto {
        if (entity instanceof SkipRule) {
            return SkipRuleMapper.toDto(entity);
        } else if (entity instanceof CalculationRule) {
            return CalculationRuleMapper.toDto(entity);
        } else if (entity instanceof ValidationRule) {
            return ValidationRuleMapper.toDto(entity);
        } else {
            // Handle LegacyRule or fallback
            return {
                undefined
            } as any; // Cast to any since this is legacy support
        }
    }

    // Note: These interface methods are deprecated since we're using string references now
    // Convert database entities to interface objects (with operation IDs only)
    static toSkipRuleInterface(entity: SkipRule): Partial<ISkipRule> {
        return {
            id: entity.id,
            Name: entity.Name,
            Description: entity.Description,
            // Operation: entity.Operation ? OperationMapper.toOperationInterface(entity.Operation as any) : null!,
            SkipWhenTrue: entity.SkipWhenTrue
            // Operation would need to be resolved separately using OperationId
        };
    }

    static toCalculationRuleInterface(entity: CalculationRule): Partial<ICalculationRule> {
        return {
            id: entity.id,
            Name: entity.Name,
            Description: entity.Description,
            // ConditionForOperation: entity.ConditionForOperation ? OperationMapper.toOperationInterface(entity.ConditionForOperation as any) : undefined,
            // Operation: entity.Operation ? OperationMapper.toOperationInterface(entity.Operation as any) : null!
        };
    }

    static toValidationRuleInterface(entity: ValidationRule): Partial<IValidationRule> {
        return {
            id: entity.id,
            Name: entity.Name,
            Description: entity.Description,
            // Operation: entity.Operation ? OperationMapper.toOperationInterface(entity.Operation as any) : null!,
            ErrorWhenFalse: entity.ErrorWhenFalse,
            ErrorMessage: entity.ErrorMessage
        };
    }

    // Convert interface objects to database entities (for creation)
    static fromSkipRuleInterface(rule: ISkipRule): Partial<SkipRule> {
        return {
            Name: rule.Name,
            Description: rule.Description,
            SkipWhenTrue: rule.SkipWhenTrue,
            OperationId: rule.Operation.id
        };
    }

    static fromCalculationRuleInterface(rule: ICalculationRule): Partial<CalculationRule> {
        return {
            Name: rule.Name,
            Description: rule.Description,
            ConditionForOperationId: rule.ConditionForOperation?.id,
            OperationId: rule.Operation.id
        };
    }

    static fromValidationRuleInterface(rule: IValidationRule): Partial<ValidationRule> {
        return {
            Name: rule.Name,
            Description: rule.Description,
            BaseOperationId: rule.Operation.id,
            ErrorWhenFalse: rule.ErrorWhenFalse,
            ErrorMessage: rule.ErrorMessage
        };
    }

    // Batch conversion methods
    static toRuleDtos(entities: (SkipRule | CalculationRule | ValidationRule)[]): RuleResponseDto[] {
        return entities.map(entity => this.toRuleDto(entity));
    }

    static toSkipRuleInterfaces(entities: SkipRule[]): Partial<ISkipRule>[] {
        return entities.map(entity => this.toSkipRuleInterface(entity));
    }

    static toCalculationRuleInterfaces(entities: CalculationRule[]): Partial<ICalculationRule>[] {
        return entities.map(entity => this.toCalculationRuleInterface(entity));
    }

    static toValidationRuleInterfaces(entities: ValidationRule[]): Partial<IValidationRule>[] {
        return entities.map(entity => this.toValidationRuleInterface(entity));
    }
}