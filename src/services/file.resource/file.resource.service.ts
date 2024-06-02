import fs from 'fs';
import path from 'path';

//////////////////////////////////////////////////
import { ErrorHandler } from '../../common/error.handler';
import { FileResourceCreateModel, FileResourceResponseDto, FileResourceSearchFilters, FileResourceSearchResults, FileResourceUpdateModel } from '../../domain.types/general/file.resource.domain.types';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { Helper } from '../../common/helper';
import { FileResourceMapper } from '../../mappers/file.resource/file.resource.mapper';
import { FileResourceDto } from '../../domain.types/general/file.resource/file.resource.dto';
import { FileResourceMetadata } from '../../domain.types/general/file.resource/file.resource.types';
import { FileResourceUploadDomainModel } from '../../domain.types/general/file.resource/file.resource.domain.model';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientInit } from '../../startup/prisma.client.init';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FileResourceService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    create = async (model: FileResourceCreateModel): Promise<FileResourceResponseDto> => {
        try {
            const response = await this.prisma.fileResource.create({
                data: {

                    OriginalFilename: model.OriginalFilename,
                    StorageKey: model.StorageKey,
                    MimeType: model.MimeType,
                    Public: model.Public,
                    Size: model.Size,
                    Tags: model.Tags,
                }
            })

            return FileResourceMapper.toResponseDto(response);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create file resource!', error);
        }
    };

    getById = async (id: uuid): Promise<FileResourceResponseDto> => {
        try {
            const response = await this.prisma.fileResource.findMany({
                // include: {
                //     ParentFormTemplate: true
                // },
                where: {
                    id: id,
                    DeletedAt: null,
                }
            });
            return FileResourceMapper.toResponseDto(response);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve file resource!', error);
        }
    };

    incrementDownloadCount = async (id: uuid): Promise<boolean> => {
        try {
            const response = await this.prisma.fileResource.findUnique({
                where: {
                    id: id,
                    DeletedAt: null,
                }
            });

            var increaseCount = response.DownloadCount + 1;
            const increaseDownloadCount = await this.prisma.fileResource.update({
                data: {
                    DownloadCount: increaseCount,
                },
                where: {
                    id: id,
                    DeletedAt: null,
                }
            });
            return true;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update download count for file resource!', error);
        }
    };

    exists = async (id: uuid): Promise<boolean> => {
        try {
            const response = await this.prisma.fileResource.findUnique({
                where: {
                    id: id,
                    DeletedAt: null,
                }
            });
            return response !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of file resource!', error);
        }
    };

    protected addSortingAndPagination = (
        search: Prisma.FileResourceFindManyArgs,
        filters: FileResourceSearchFilters
    ) => {
        // Sorting
        let orderByColumn: keyof typeof Prisma.FileResourceScalarFieldEnum = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy as keyof typeof Prisma.FileResourceScalarFieldEnum;
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

    private getSearchModel = (filters: FileResourceSearchFilters): Prisma.FileResourceWhereInput => {
        const where: Prisma.FileResourceWhereInput = {};

        if (filters.id) {
            where.id = {
                equals: filters.id,
            };
        }

        if (filters.Filename) {
            where.OriginalFilename = {
                equals: filters.Filename,
            };
        }

        if (filters.Tags) {
            where.Tags = {
                equals: filters.Tags,
            };
        }
        return where;
    };

    search = async (filters: FileResourceSearchFilters): Promise<any> => {
        try {
            const { search: prismaSearch, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination({}, filters);

            const list = await this.prisma.fileResource.findMany({
                where: prismaSearch.where,

                take: limit,
                skip: (pageIndex - 1) * limit,
                orderBy: {
                    [orderByColumn]: order === 'desc' ? 'desc' : 'asc',
                },
            });

            const count = await this.prisma.fileResource.count({
                where: prismaSearch.where,
            });

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'desc' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => FileResourceMapper.toResponseDto(x)),
                // Items: FormSectionMapper.toArrayDto(list),

            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };


    update = async (id: uuid, model: FileResourceUpdateModel) => {
        try {

            const response = await this.prisma.fileResource.update({
                data: {
                    OriginalFilename: model.OriginalFilename,
                    StorageKey: model.StorageKey,
                    MimeType: model.MimeType,
                    Public: model.Public,
                    Size: model.Size,
                    Tags: model.Tags,
                },
                where: {
                    id: id,
                    DeletedAt: null
                },

            });

            return FileResourceMapper.toResponseDto(response);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update file resource!', error);
        }
    };

    delete = async (id: uuid) => {
        try {
            const response = await this.prisma.fileResource.update({
                data: {
                    DeletedAt: new Date(),
                },
                where: {
                    id: id,
                    DeletedAt: null,
                }
            });

            return true;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete file resource!', error);
        }
    };

    // uploadLocal = async (
    //     storageKey: string,
    //     sourceLocation: string,
    //     isPublicResource: boolean
    // ): Promise<FileResourceDto> => {

    //     var exists = fs.existsSync(sourceLocation);
    //     if (!exists) {
    //         console.log('Source file location does not exist!');
    //     }

    //     var existingStorageKey = await this._storageService.exists(storageKey);
    //     if (existingStorageKey !== undefined && existingStorageKey !== null) {
    //         storageKey = existingStorageKey;
    //     }
    //     else {
    //         // storageKey = await this._storageService.uploadLocally(storageKey, sourceLocation);
    //     }

    //     if (!storageKey) {
    //         console.log('Unable to upload file to storage!');
    //         return null;
    //     }

    //     var stats = fs.statSync(sourceLocation);
    //     var filename = path.basename(sourceLocation);

    //     var metadata: FileResourceMetadata = {
    //         Version: '1',
    //         OriginalName: filename,
    //         FileName: filename,
    //         SourceFilePath: null,
    //         MimeType: Helper.getMimeType(sourceLocation),
    //         Size: stats['size'] / 1024,
    //         StorageKey: storageKey,
    //     };

    //     var domainModel: FileResourceUploadDomainModel = {
    //         FileMetadata: metadata,
    //         StorageKey: metadata.StorageKey,
    //         FileName: metadata.FileName,
    //         IsMultiResolutionImage: false,
    //         MimeType: Helper.getMimeType(sourceLocation),
    //         Public: isPublicResource,
    //     };

    //     var resource = await this._fileResourceRepository.create(domainModel);
    //     var record = await this._fileResourceRepository.save(resource);

    //     domainModel.FileMetadata.ResourceId = record.id;
    //     // var version = await this.addVersion(domainModel.FileMetadata, true);
    //     // resource.DefaultVersion = version;
    //     // resource.Url = version.Url;

    //     return resource;
    // }
}
