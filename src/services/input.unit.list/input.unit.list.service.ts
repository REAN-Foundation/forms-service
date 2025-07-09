import {
    InputUnitListCreateModel,
    InputUnitListResponseDto,
    InputUnitListSearchFilters,
    InputUnitListUpdateModel
} from "../../domain.types/forms/input.unit.list.domain.types";
import { IInputUnitListRepo } from "../../database/repository.interfaces/input.unit.list/input.unit.list.repo.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class InputUnitListService {
    constructor(@inject('IInputUnitListRepo') private _inputUnitListRepo: IInputUnitListRepo) { }

    create = async (model: InputUnitListCreateModel): Promise<InputUnitListResponseDto> => {
        return await this._inputUnitListRepo.create(model);
    };

    update = async (id: string, model: InputUnitListUpdateModel): Promise<InputUnitListResponseDto> => {
        return await this._inputUnitListRepo.update(id, model);
    };

    getById = async (id: string): Promise<InputUnitListResponseDto> => {
        return await this._inputUnitListRepo.getById(id);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._inputUnitListRepo.delete(id);
    };

    search = async (filters: InputUnitListSearchFilters): Promise<any> => {
        return await this._inputUnitListRepo.search(filters);
    };
}