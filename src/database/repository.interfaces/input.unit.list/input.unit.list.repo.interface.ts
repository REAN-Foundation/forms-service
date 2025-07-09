import { InputUnitListCreateModel, InputUnitListResponseDto, InputUnitListSearchFilters, InputUnitListUpdateModel } from "../../../domain.types/forms/input.unit.list.domain.types";

export interface IInputUnitListRepo {

    create(model: InputUnitListCreateModel): Promise<InputUnitListResponseDto>;

    update(id: string, model: InputUnitListUpdateModel): Promise<InputUnitListResponseDto>;

    getById(id: string): Promise<InputUnitListResponseDto>;

    delete(id: string): Promise<boolean>;
    
    search(filters: InputUnitListSearchFilters): Promise<any>;
} 