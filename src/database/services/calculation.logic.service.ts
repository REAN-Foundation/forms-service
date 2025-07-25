import {
    CalculationLogicResponseDto,
    CalculationLogicCreateModel,
    CalculationLogicUpdateModel,
    CalculationLogicSearchFilters,
    CalculationLogicSearchResults,
} from '../../domain.types/logic/calculation.logic.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { CalculationLogic } from '../models/logic/calculation.logic.model';
import { CalculationLogicMapper } from '../mappers/calculation.logic.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { LogicType } from '../../domain.types/enums/logic.enums';

///////////////////////////////////////////////////////////////////////////////////////////////


export class CalculationLogicService extends BaseService {

    _calculationLogicRepository: Repository<CalculationLogic> = Source.getRepository(CalculationLogic);

    // Calculation Logic operations
    public create = async (createModel: CalculationLogicCreateModel)
        : Promise<CalculationLogicResponseDto> => {

        const logic = this._calculationLogicRepository.create({
            Type: LogicType.Calculation,
            FieldId: createModel.FieldId,
            Enabled: createModel.Enabled,
            FallbackValue: createModel.FallbackValue,
        });
        const record = await this._calculationLogicRepository.save(logic);

        return CalculationLogicMapper.toDto(record);
    };


    public getById = async (id: uuid): Promise<CalculationLogicResponseDto> => {
        try {
            const logic = await this._calculationLogicRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    Rules: true,
                }
            });

            if (!logic) {
                ErrorHandler.throwNotFoundError('Calculation logic not found!');
            }

            return CalculationLogicMapper.toDto(logic);
        } catch (error) {
            logger.error(`❌ Error getting calculation logic by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getByIdWithRules = async (id: uuid): Promise<CalculationLogicResponseDto> => {
        try {
            const logic = await this._calculationLogicRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    Rules: true,
                }
            });

            if (!logic) {
                ErrorHandler.throwNotFoundError('Calculation logic not found!');
            }

            return CalculationLogicMapper.toDto(logic);
        } catch (error) {
            logger.error(`❌ Error getting calculation logic with rules by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getAllWithRules = async (): Promise<CalculationLogicResponseDto[]> => {
        try {
            const logics = await this._calculationLogicRepository.find({
                relations: {
                    Rules: true,
                }
            });

            return logics.map(logic => CalculationLogicMapper.toDto(logic));
        } catch (error) {
            logger.error(`❌ Error getting all calculation logics with rules: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getByFieldIdWithRules = async (fieldId: uuid): Promise<CalculationLogicResponseDto[]> => {
        try {
            const logics = await this._calculationLogicRepository.find({
                where: {
                    FieldId: fieldId
                },
                relations: {
                    Rules: true,
                }
            });

            return logics.map(logic => CalculationLogicMapper.toDto(logic));
        } catch (error) {
            logger.error(`❌ Error getting calculation logics by field id with rules: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: CalculationLogicSearchFilters)
        : Promise<CalculationLogicSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._calculationLogicRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => CalculationLogicMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching calculation logics: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };



    public update = async (id: uuid, model: CalculationLogicUpdateModel)
        : Promise<CalculationLogicResponseDto> => {
        try {
            const logic = await this._calculationLogicRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!logic) {
                ErrorHandler.throwNotFoundError('Calculation logic not found!');
            }
            if (model.FallbackValue != null) {
                logic.FallbackValue = model.FallbackValue;
            }
            if (model.Enabled != null) {
                logic.Enabled = model.Enabled;
            }
            if (model.FieldId != null) {
                logic.FieldId = model.FieldId;
            }
            var record = await this._calculationLogicRepository.save(logic);
            return CalculationLogicMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating calculation logic: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };


    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._calculationLogicRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._calculationLogicRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting calculation logic: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: CalculationLogicSearchFilters) => {

        var search: FindManyOptions<CalculationLogic> = {
            relations: {
                Rules: true,
            },
            where: {
            }
        };

        if (filters.FallbackValue) {
            search.where['FallbackValue'] = filters.FallbackValue;
        }
        if (filters.Enabled) {
            search.where['Enabled'] = filters.Enabled;
        }
        if (filters.FieldId) {
            search.where['FieldId'] = filters.FieldId;
        }

        return search;
    };
}
