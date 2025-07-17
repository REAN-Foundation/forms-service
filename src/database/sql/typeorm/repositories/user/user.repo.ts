import { UserCreateModel } from '../../../../../domain.types/forms/user.domain.types';
import { IUserRepo } from '../../../../repository.interfaces/user/user.repo.interface';
import { UserResponseDto } from '../../../../../domain.types/forms/user.domain.types';
import { UserUpdateModel } from '../../../../../domain.types/forms/user.domain.types';
import { UserSearchFilters } from '../../../../../domain.types/forms/user.domain.types';
import { Source } from '../../database.connector.typeorm';
import { User } from '../../models/user/user.model';
import { UserMapper } from '../../mappers/user.mapper';
import { Logger } from '../../../../../common/logger';
import { ErrorHandler } from '../../../../../common/res.handlers/error.handler';
import { FindManyOptions, Repository } from 'typeorm';
import { BaseRepo } from '../base.repo';

export class UserRepo extends BaseRepo implements IUserRepo {
    _userRepo: Repository<User> = Source.getRepository(User);

    allUsers = async () => {
        const response = await this._userRepo.find({
            where: {
                DeletedAt: null,
            },
        });
        return UserMapper.toArrayDto(response);
    };

    create = async (model: UserCreateModel): Promise<UserResponseDto> => {
        try {
            const data = this._userRepo.create({
                FirstName: model.FirstName,
                LastName: model.LastName,
                CountryCode: model.CountryCode,
                Phone: model.Phone,
                Email: model.Email,
                Username: model.Username,
                Password: model.Password,
            });
            const record = await this._userRepo.save(data);
            return UserMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    update = async (
        id: string,
        model: UserUpdateModel
    ): Promise<UserResponseDto> => {
        try {
            const updateData = await this._userRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!updateData) {
                ErrorHandler.throwNotFoundError(
                    'Question Response Data not found!'
                );
            }

            if (model.FirstName) {
                updateData.FirstName = model.FirstName;
            }
            if (model.LastName) {
                updateData.LastName = model.LastName;
            }
            if (model.CountryCode) {
                updateData.CountryCode = model.CountryCode;
            }

            if (model.Phone) {
                updateData.Phone = model.Phone;
            }

            if (model.Email) {
                updateData.Email = model.Email;
            }

            if (model.Username) {
                updateData.Username = model.Username;
            }

            if (model.Password) {
                updateData.Password = model.Password;
            }

            updateData.UpdatedAt = new Date();

            var record = await this._userRepo.save(updateData);
            return UserMapper.toDto(record);
        } catch (error) {
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<UserResponseDto> => {
        try {
            var record = await this._userRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });
            return UserMapper.toDto(record);
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._userRepo.findOne({
                where: {
                    id: id,
                    DeletedAt: null,
                },
            });

            if (!record) {
                return false;
            }
            record.DeletedAt = new Date();
            await this._userRepo.save(record);
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    search = async (filters: UserSearchFilters): Promise<any> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            const [list, count] = await this._userRepo.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: UserMapper.toArrayDto(list),
            };

            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            ErrorHandler.throwDbAccessError(
                'DB Error: Unable to search records!',
                error
            );
        }
    };

    private getSearchModel = (filters: UserSearchFilters) => {
        var search: FindManyOptions<User> = {
            relations: {},
            where: {},
        };

        if (filters.firstName) {
            search.where['FirstName'] = filters.firstName;
        }

        if (filters.lastName) {
            search.where['LastName'] = filters.lastName;
        }

        if (filters.countryCode) {
            search.where['CountryCode'] = filters.countryCode;
        }

        if (filters.email) {
            search.where['Email'] = filters.email;
        }

        if (filters.username) {
            search.where['Username'] = filters.username;
        }

        if (filters.password) {
            search.where['Password'] = filters.password;
        }

        return search;
    };
}
