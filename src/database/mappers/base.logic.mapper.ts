import { CalculationLogic } from "../models/logic/calculation.logic.model";
import { SkipLogic } from "../models/logic/skip.logic.model";
import { ValidationLogic } from "../models/logic/validation.logic.model";
import { CalculationLogicMapper } from "./calculation.logic.mapper";
import { SkipLogicMapper } from "./skip.logic.mapper";
import { ValidationLogicMapper } from "./validation.logic.mapper";
import { SkipLogic as ISkipLogic, CalculationLogic as ICalculationLogic, ValidationLogic as IValidationLogic } from "../../domain.types/logic/base.logic.domain.types";
import { LogicType } from "../../domain.types/enums/logic.enums";
import { RuleMapper } from "./base.rule.mapper";
import { LogicResponseDto } from "../../domain.types/logic/base.logic.domain.types";



export class LogicMapper {

    static toLogicDto(entity: SkipLogic | CalculationLogic | ValidationLogic): LogicResponseDto {
        if (entity instanceof SkipLogic) {
            return SkipLogicMapper.toDto(entity);
        } else if (entity instanceof CalculationLogic) {
            return CalculationLogicMapper.toDto(entity);
        } else if (entity instanceof ValidationLogic) {
            return ValidationLogicMapper.toDto(entity);
        } else {
            null
        }
    }

    // Convert database entities to interface objects
    static toSkipLogicInterface(entity: SkipLogic): ISkipLogic {
        return {
            id: entity.id,
            Type: LogicType.Skip,
            FieldId: entity.FieldId,
            Enabled: entity.Enabled,
            // Rules: entity.Rules ? RuleMapper.toSkipRuleInterfaces(entity.Rules) : [],
            DefaultSkip: entity.DefaultSkip
        };
    }

    static toCalculationLogicInterface(entity: CalculationLogic): ICalculationLogic {
        return {
            id: entity.id,
            Type: LogicType.Calculation,
            FieldId: entity.FieldId,
            Enabled: entity.Enabled,
            // Rules: entity.Rules ? RuleMapper.toCalculationRuleInterfaces(entity.Rules) : [],
            FallbackValue: entity.FallbackValue ? JSON.parse(entity.FallbackValue) : undefined
        };
    }

    static toValidationLogicInterface(entity: ValidationLogic): IValidationLogic {
        return {
            id: entity.id,
            Type: LogicType.Validation,
            FieldId: entity.FieldId,
            Enabled: entity.Enabled,
            // Rules: entity.Rules ? RuleMapper.toValidationRuleInterfaces(entity.Rules) : []
        };
    }


    // Convert interface objects to database entities (for creation)
    static fromSkipLogicInterface(logic: ISkipLogic): Partial<SkipLogic> {
        return {
            Type: LogicType.Skip,
            FieldId: logic.FieldId,
            Enabled: logic.Enabled,
            DefaultSkip: logic.DefaultSkip
        };
    }

    static fromCalculationLogicInterface(logic: ICalculationLogic): Partial<CalculationLogic> {
        return {
            Type: LogicType.Calculation,
            FieldId: logic.FieldId,
            Enabled: logic.Enabled,
            FallbackValue: logic.FallbackValue ? JSON.stringify(logic.FallbackValue) : undefined
        };
    }

    static fromValidationLogicInterface(logic: IValidationLogic): Partial<ValidationLogic> {
        return {
            Type: LogicType.Validation,
            FieldId: logic.FieldId,
            Enabled: logic.Enabled
        };
    }

    // Batch conversion methods
    static toLogicDtos(entities: (SkipLogic | CalculationLogic | ValidationLogic)[]): LogicResponseDto[] {
        return entities.map(entity => this.toLogicDto(entity));
    }

    static toSkipLogicInterfaces(entities: SkipLogic[]): ISkipLogic[] {
        return entities.map(entity => this.toSkipLogicInterface(entity));
    }

    static toCalculationLogicInterfaces(entities: CalculationLogic[]): ICalculationLogic[] {
        return entities.map(entity => this.toCalculationLogicInterface(entity));
    }

    static toValidationLogicInterfaces(entities: ValidationLogic[]): IValidationLogic[] {
        return entities.map(entity => this.toValidationLogicInterface(entity));
    }
}