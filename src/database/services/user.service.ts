import {
    UserCreateModel,
    UserSearchFilters,
    UserUpdateModel,
    UserResponseDto,
    UserSearchResults,
} from '../../domain.types/user.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from '../models/user/user.model';
import { UserMapper } from '../mappers/user.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserService extends BaseService {

    _userRepository: Repository<User> = Source.getRepository(User);

    // User operations
    public create = async (createModel: UserCreateModel)
        : Promise<UserResponseDto> => {

        const user = this._userRepository.create({
            FirstName: createModel.FirstName,
            LastName: createModel.LastName,
            CountryCode: createModel.CountryCode,
            Phone: createModel.Phone,
            Email: createModel.Email,
            Username: createModel.Username,
            Password: createModel.Password,
        });
        const record = await this._userRepository.save(user);

        return UserMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<UserResponseDto> => {
        try {
            const user = await this._userRepository.findOne({
                where: {
                    id: id
                }
            });

            return UserMapper.toDto(user);
        } catch (error) {
            logger.error(`❌ Error getting user by id: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public allUsers = async (): Promise<UserResponseDto[]> => {
        try {
            const users = await this._userRepository.find({
                where: {
                    DeletedAt: null
                }
            });
            return users.map(user => UserMapper.toDto(user));
        } catch (error) {
            logger.error(`❌ Error getting all users: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: UserSearchFilters)
        : Promise<UserSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._userRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map(x => UserMapper.toDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(`❌ Error searching users: ${error.message}`);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: UserUpdateModel)
        : Promise<UserResponseDto> => {
        try {
            const user = await this._userRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!user) {
                ErrorHandler.throwNotFoundError('User not found!');
            }
            if (model.FirstName != null) {
                user.FirstName = model.FirstName;
            }
            if (model.LastName != null) {
                user.LastName = model.LastName;
            }
            if (model.CountryCode != null) {
                user.CountryCode = model.CountryCode;
            }
            if (model.Phone != null) {
                user.Phone = model.Phone;
            }
            if (model.Email != null) {
                user.Email = model.Email;
            }
            if (model.Username != null) {
                user.Username = model.Username;
            }
            if (model.Password != null) {
                user.Password = model.Password;
            }
            var record = await this._userRepository.save(user);
            return UserMapper.toDto(record);
        } catch (error) {
            logger.error(`❌ Error updating user: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._userRepository.findOne({
                where: {
                    id: id
                }
            });
            var result = await this._userRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(`❌ Error deleting user: ${error.message}`);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchModel = (filters: UserSearchFilters) => {

        var search: FindManyOptions<User> = {
            where: {
            }
        };

        if (filters.FirstName) {
            search.where['FirstName'] = filters.FirstName;
        }
        if (filters.LastName) {
            search.where['LastName'] = filters.LastName;
        }
        if (filters.CountryCode) {
            search.where['CountryCode'] = filters.CountryCode;
        }
        if (filters.Phone) {
            search.where['Phone'] = filters.Phone;
        }
        if (filters.Email) {
            search.where['Email'] = filters.Email;
        }
        if (filters.Username) {
            search.where['Username'] = filters.Username;
        }

        return search;
    };
}
