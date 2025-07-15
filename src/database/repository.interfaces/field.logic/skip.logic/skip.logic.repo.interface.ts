import {
    SkipLogicResponseDto,
    SkipLogicCreateModel,
    SkipLogicUpdateModel,
    LogicSearchFilters
} from "../../../../domain.types/forms/logic.domain.types";

export interface ISkipLogicRepo {

    // Skip Logic operations
    createSkipLogic(model: SkipLogicCreateModel): Promise<SkipLogicResponseDto>;
    updateSkipLogic(id: string, model: SkipLogicUpdateModel): Promise<SkipLogicResponseDto>;
    getSkipLogicById(id: string): Promise<SkipLogicResponseDto>;
    deleteSkipLogic(id: string): Promise<boolean>;
    searchSkipLogic(filters: LogicSearchFilters): Promise<any>;
}