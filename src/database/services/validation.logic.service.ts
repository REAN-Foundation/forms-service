import {
    ValidationLogicResponseDto,
    ValidationLogicCreateModel,
    ValidationLogicUpdateModel,
    ValidationLogicSearchFilters,
    ValidationLogicSearchResults,
} from '../../domain.types/logic/validation.logic.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { ValidationLogic } from '../models/logic/validation.logic.model';
import { ValidationLogicMapper } from '../mappers/validation.logic.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { LogicType } from '../../domain.types/logic.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ValidationLogicService extends BaseService {

    _validationLogicRepository: Repository<ValidationLogic> = Source.getRepository(ValidationLogic);

    // Validation Logic operations
    public create = async (createModel: ValidationLogicCreateModel)
        : Promise<ValidationLogicResponseDto> => {

        const logic = this._validationLogicRepository.create({
            Type: LogicType.Validation,
            FieldId: createModel.FieldId,
            Enabled: createModel.Enabled,
        });
        const record = await this._validationLogicRepository.save(logic);

        return ValidationLogicMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<ValidationLogicResponseDto> => {
        try {
            const logic = await this._validationLogicRepository.findOne({
                where: {
                    id: id
                }
            });

            return ValidationLogicMapper.toDto(logic);
        } catch (error) {
            logger.error(`❌ Error getting validation logic by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: ValidationLogicSearchFilters)
        : Promise<ValidationLogicSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._validationLogicRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => ValidationLogicMapper.toDto(x)) as any ,
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching validation logics: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: ValidationLogicUpdateModel)
        : Promise<ValidationLogicResponseDto> => {
        try {
            const logic = await this._validationLogicRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!logic) {
                ErrorHandler.throwNotFoundError('Validation logic not found!');
            }
            if (model.Enabled != null) {
                logic.Enabled = model.Enabled;
            }
            if (model.FieldId != null) {
                logic.FieldId = model.FieldId;
            }

            var record = await this._validationLogicRepository.save(logic);
            return ValidationLogicMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating validation logic: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._validationLogicRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._validationLogicRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting validation logic: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: ValidationLogicSearchFilters) => {

        var search: FindManyOptions<ValidationLogic> = {
            relations: {
                Rules: true,
            },
            where: {
            }
        };
        
        if (filters.FieldId) {
            search.where['FieldId'] = filters.FieldId;
        }
        if (filters.Enabled) {
            search.where['Enabled'] = filters.Enabled;
        }

        return search;
    };
}
