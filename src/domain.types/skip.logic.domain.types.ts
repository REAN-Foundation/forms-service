import {
    BaseLogicCreateModel,
    BaseLogicResponseDto,
    BaseLogicUpdateModel,
    SkipRuleResponseDto,
} from './logic.domain.types';
import { LogicType } from './logic.enums';

export interface SkipLogicCreateModel extends BaseLogicCreateModel {
    Type: LogicType.Skip;
    FieldId: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface SkipLogicUpdateModel extends BaseLogicUpdateModel {
    Type?: LogicType.Skip;
    FieldId?: string;
    Enabled?: boolean;
    DefaultSkip?: boolean;
}

export interface SkipLogicResponseDto extends BaseLogicResponseDto {
    Type: LogicType.Skip;
    Rules?: SkipRuleResponseDto[];
}
