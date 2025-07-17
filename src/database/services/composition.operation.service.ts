import { inject, injectable } from 'tsyringe';
import {
    CompositionOperationResponseDto,
    CompositionOperationCreateModel,
    CompositionOperationUpdateModel,
    OperationSearchFilters,
} from '../../domain.types/forms/operation.domain.types';
import { ICompositionOperationRepo } from '../../database/repository.interfaces/field.operations/composition.operation/composition.operation.repo.interface';

@injectable()
export class CompositionOperationService {
    constructor(
        @inject('ICompositionOperationRepo')
        private _compositionOperationRepo: ICompositionOperationRepo
    ) {}

    async createCompositionOperation(
        model: CompositionOperationCreateModel
    ): Promise<CompositionOperationResponseDto> {
        return await this._compositionOperationRepo.createCompositionOperation(
            model
        );
    }

    async updateCompositionOperation(
        id: string,
        model: CompositionOperationUpdateModel
    ): Promise<CompositionOperationResponseDto> {
        return await this._compositionOperationRepo.updateCompositionOperation(
            id,
            model
        );
    }

    async getCompositionOperationById(
        id: string
    ): Promise<CompositionOperationResponseDto> {
        return await this._compositionOperationRepo.getCompositionOperationById(
            id
        );
    }

    async deleteCompositionOperation(id: string): Promise<boolean> {
        return await this._compositionOperationRepo.deleteCompositionOperation(
            id
        );
    }

    async searchCompositionOperation(
        filters: OperationSearchFilters
    ): Promise<any> {
        return await this._compositionOperationRepo.searchCompositionOperation(
            filters
        );
    }
}
