import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { UserMapper } from "../mappers/user.mapper";
import { UserCreateModel, UserSearchFilters, UserSearchResponseDto, UserUpdateModel } from "../domain.types/forms/user.domain.types";
import { ErrorHandler } from "../common/error.handler";



export class UserService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allUsers = async () => {
        const response = await this.prisma.user.findMany({
            where: {
                DeletedAt: null
            }
        });
        return UserMapper.toArrayDto(response);
    };

    create = async (model: UserCreateModel) => {
        const response = await this.prisma.user.create({
            data: {
                FirstName: model.FirstName,
                LastName: model.LastName,
                CountryCode: model.CountryCode,
                Phone: model.Phone,
                Email: model.Email,
                Username: model.Username,
                Password: model.Password,
            },
        });
        return UserMapper.toDto(response);
    };

    update = async (id: string, model: UserUpdateModel) => {
        const response = await this.prisma.user.update({
            where: {
                id: id,
                DeletedAt: null
            },
            data: {
                FirstName: model.FirstName,
                LastName: model.LastName,
                CountryCode: model.CountryCode,
                Phone: model.Phone,
                Email: model.Email,
                Username: model.Username,
                Password: model.Password,
                UpdatedAt: new Date()
            },
        });
        return UserMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.user.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
        });
        return UserMapper.toDto(response);
    };

    delete = async (id: string) => {
        const response = await this.prisma.user.update({
            where: {
                id: id,
                DeletedAt: null
            },
            data: {
                DeletedAt: new Date(),
            }
        });
        return UserMapper.toDto(response);
    };

    protected addSortingAndPagination = (
        search: Prisma.UserFindManyArgs,
        filters: UserSearchFilters
    ) => {
        // Sorting
        let orderByColumn: keyof typeof Prisma.UserScalarFieldEnum = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy as keyof typeof Prisma.UserScalarFieldEnum;
        }
        let order: Prisma.SortOrder = 'asc';
        if (filters.Order === 'descending') {
            order = 'desc';
        }

        search.orderBy = {
            [orderByColumn]: order,
        };

        // Pagination
        let limit = 25;
        if (filters.ItemsPerPage) {
            limit = filters.ItemsPerPage;
        }
        let offset = 0;
        let pageIndex = 1;
        if (filters.PageIndex) {
            pageIndex = filters.PageIndex < 1 ? 1 : filters.PageIndex;
            offset = (pageIndex - 1) * limit;
        }

        search.take = limit;
        search.skip = offset;

        // Update where clause
        const whereClause = this.getSearchModel(filters);
        if (Object.keys(whereClause).length > 0) {
            search.where = whereClause;
        }

        return { search, pageIndex, limit, order, orderByColumn };
    };







    public search = async (filters: UserSearchFilters) => {
        try {
            const { search: prismaSearch, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination({}, filters);

            const list = await this.prisma.user.findMany({
                where: prismaSearch.where,
                take: limit,
                skip: (pageIndex - 1) * limit,
                orderBy: {
                    [orderByColumn]: order === 'desc' ? 'desc' : 'asc',
                },
            });

            const count = await this.prisma.user.count({
                where: prismaSearch.where,
            });

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'desc' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => UserMapper.toDto(x)),
            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };





    private getSearchModel = (filters: UserSearchFilters): Prisma.UserWhereInput => {
        const where: Prisma.UserWhereInput = { DeletedAt: null };

        if (filters.firstName) {
            where.FirstName = {
                equals: filters.firstName,
            };
        }

        if (filters.lastName) {
            where.LastName = {
                equals: filters.lastName,
            };
        }

        if (filters.countryCode) {
            where.CountryCode = {
                equals: filters.countryCode,
            };
        }

        if (filters.email) {
            where.Email = {
                equals: filters.email,
            };
        }

        if (filters.username) {
            where.Username = {
                equals: filters.username,
            };
        }

        if (filters.password) {
            where.Password = {
                equals: filters.password,
            };
        }

        return where;
    };


}
