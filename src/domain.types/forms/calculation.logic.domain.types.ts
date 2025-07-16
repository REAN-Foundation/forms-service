import {
    BaseLogicCreateModel,
    BaseLogicResponseDto,
    BaseLogicUpdateModel,
    CalculationRuleResponseDto,
} from './logic.domain.types';
import { LogicType } from './logic.enums';
export interface CalculationLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType.Calculation;
    FieldId: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
    FallbackValue?: string;
}

export interface CalculationLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Calculation;
    FieldId?: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
    FallbackValue?: string;
}

export interface CalculationLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Calculation;
    FallbackValue?: string;
    Rules?: CalculationRuleResponseDto[];
}
