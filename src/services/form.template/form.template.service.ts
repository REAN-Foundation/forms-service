import { FormType, ItemsPerPage, Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import {
    ExportFormTemplateDto,
    FormTemplateCreateModel,
    FormTemplateResponseDto,
    FormTemplateSearchFilters,
    FormTemplateUpdateModel,
    SectionDto,
    SectionPreviewDto,
    SubsectionDto,
    TemplateDto,
    TemplatePreviewDto
} from "../../domain.types/forms/form.template.domain.types";
import { FormTemplateMapper } from "../../database/sql/typeorm/mappers/form.template.mapper";
import { ErrorHandler } from "../../common/handlers/error.handler";
import { FormSectionMapper } from "../../database/sql/typeorm/mappers/form.section.mapper";
import { QuestionMapper } from "../../database/sql/typeorm/mappers/question.mapper";
import { IFormTemplateRepo } from "../../database/repository.interfaces/form.template/form.template.repo.interface";
import { inject, injectable } from "tsyringe";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class FormTemplateService {
    // prisma: PrismaClient = null;
    constructor(@inject('IFormTemplateRepo') private _formTempRepo : IFormTemplateRepo) {
        // this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    // allFormTemplates = async () => {
    //     const response = await this.prisma.formTemplate.findMany({
    //         where: {
    //             DeletedAt: null,
    //         }
    //     });
    //     return FormTemplateMapper.toArrayDto(response);
    // };

    // create = async (model: FormTemplateCreateModel) => {
    //     const response = await this.prisma.formTemplate.create({
    //         data: {
    //             User: {
    //                 connect: { id: model.OwnerUserId }
    //             },
    //             Title: model.Title,
    //             Description: model.Description,
    //             CurrentVersion: model.CurrentVersion,
    //             TenantCode: model.TenantCode,
    //             Type: model.Type as FormType,
    //             ItemsPerPage: model.ItemsPerPage as ItemsPerPage,
    //             DisplayCode: model.DisplayCode,
    //             // OwnerUserId: model.OwnerUserId,
    //             RootSectionId: model.RootSectionId,
    //             DefaultSectionNumbering: model.DefaultSectionNumbering,
    //             // DeletedAt              : null
    //         },
    //     });
    //     return FormTemplateMapper.toDto(response);
    // };

    create = async (model: FormTemplateCreateModel) : Promise<FormTemplateResponseDto> => {
        const dto=await this._formTempRepo.create(model);
         return dto;
    };

    update = async (id: string, model: FormTemplateUpdateModel) : Promise<FormTemplateResponseDto> => {
        const dto=await this._formTempRepo.update(id,model);
         return dto;
    };

    getById = async (id: string) : Promise<FormTemplateResponseDto> => {
        const dto=await this._formTempRepo.getById(id);
         return dto;
    };

    // getDetailsById = async (id: string) => {
    //     const record = await this.prisma.formTemplate.findUnique({
    //         where: {
    //             id: id,
    //             DeletedAt: null
    //         },
    //         include: {
    //             FormSections: {
    //                 where: {
    //                     DeletedAt: null
    //                 },
    //                 orderBy: {
    //                     CreatedAt: 'asc' // Sort sections within each template
    //                 },
    //                 include: {
    //                     Questions: {
    //                         where: {
    //                             DeletedAt: null
    //                         },
    //                         orderBy: {
    //                             CreatedAt: 'asc' // Sort questions within each section
    //                         }
    //                     },
    //                     ParentFormTemplate: true
    //                 }
    //             }
    //         }
    //     })

    //     const subsections = await this.mapSections(record.FormSections);
    //     record.FormSections = subsections;

    //     return record;
    //     // const template = await this.prisma.formTemplate.findUnique({
    //     //     where: {
    //     //         id: id,
    //     //         DeletedAt: null
    //     //     },
    //     // });
    //     // const sections = await this.prisma.formSection.findMany({
    //     //     where: {
    //     //         ParentFormTemplateId: id,
    //     //         DeletedAt: null
    //     //     },
    //     //     include: {
    //     //         ParentFormTemplate: true
    //     //     }
    //     // });
    //     // const questions = await this.prisma.question.findMany({
    //     //     where: {
    //     //         ParentTemplateId: id,
    //     //         DeletedAt: null
    //     //     },
    //     //     include: {
    //     //         ParentFormTemplate: true,
    //     //         ParentFormSection: true
    //     //     }
    //     // });

    //     // const searchResult = {
    //     //     Template: FormTemplateMapper.toDto(template),
    //     //     Sections: sections.map((x) => FormSectionMapper.toDto(x)),
    //     //     Questions: questions.map((x) => QuestionMapper.toDto(x))
    //     // };
    //     // return searchResult;
    // };

     getDetailsById = async (id: string) : Promise<any> => {
         const dto=await this._formTempRepo.getDetailsById(id);
         return dto;
        
    };

    readTemplateObjToExport = async (id: string): Promise<ExportFormTemplateDto> => {
        const dto=await this._formTempRepo.readTemplateObjToExport(id);
         return dto;     
    }

    previewTemplate = async (id: string) : Promise<any> => {
         const dto=await this._formTempRepo.previewTemplate(id);
         return dto;
    };


    delete = async (id: string) : Promise<boolean> => {
       const dto=await this._formTempRepo.delete(id);
       return dto;
    };

    submissions = async (id: string) : Promise<FormTemplateResponseDto[]> => {
        const dto=await this._formTempRepo.submissions(id);
         return dto;
    };

    // protected addSortingAndPagination = (
    //     search: Prisma.FormTemplateFindManyArgs,
    //     filters: FormTemplateSearchFilters
    // ) => {
    //     // Sorting
    //     let orderByColumn: keyof typeof Prisma.FormTemplateScalarFieldEnum = 'CreatedAt';
    //     if (filters.OrderBy) {
    //         orderByColumn = filters.OrderBy as keyof typeof Prisma.FormTemplateScalarFieldEnum;
    //     }
    //     let order: Prisma.SortOrder = 'asc';
    //     if (filters.Order === 'descending') {
    //         order = 'desc';
    //     }

    //     search.orderBy = {
    //         [orderByColumn]: order,
    //     };

    //     // Pagination
    //     let limit = 25;
    //     if (filters.ItemsPerPage) {
    //         limit = filters.ItemsPerPage;
    //     }
    //     let offset = 0;
    //     let pageIndex = 1;
    //     if (filters.PageIndex) {
    //         pageIndex = filters.PageIndex < 1 ? 1 : filters.PageIndex;
    //         offset = (pageIndex - 1) * limit;
    //     }

    //     search.take = limit;
    //     search.skip = offset;

    //     // Update where clause
    //     const whereClause = this.getSearchModel(filters);
    //     if (Object.keys(whereClause).length > 0) {
    //         search.where = whereClause;
    //     }

    //     return { search, pageIndex, limit, order, orderByColumn };
    // };


    public search = async (filters: FormTemplateSearchFilters) : Promise<any>=> {
       const dto=await this._formTempRepo.search(filters);
         return dto;
    };
    // public search = async (filters: FormTemplateSearchFilters) => {
    //     try {
    //         const { search: prismaSearch, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination({}, filters);

    //         const list = await this.prisma.formTemplate.findMany({
    //             where: prismaSearch.where,
    //             take: limit,
    //             skip: (pageIndex - 1) * limit,
    //             orderBy: {
    //                 [orderByColumn]: order === 'desc' ? 'desc' : 'asc',
    //             },
    //         });

    //         const count = await this.prisma.formTemplate.count({
    //             where: prismaSearch.where,
    //         });

    //         const searchResults = {
    //             TotalCount: count,
    //             RetrievedCount: list.length,
    //             PageIndex: pageIndex,
    //             ItemsPerPage: limit,
    //             Order: order === 'desc' ? 'descending' : 'ascending',
    //             OrderedBy: orderByColumn,
    //             Items: list.map((x) => FormTemplateMapper.toDto(x)),
    //         };

    //         return searchResults;
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
    //     }
    // };

    private getSearchModel = (filters: FormTemplateSearchFilters) => {
        // const where: Prisma.FormTemplateWhereInput = {
        //     DeletedAt: null
        // };
        const searchFilter = {
            where: {
                DeletedAt: null,
            }
        }

        if (filters.id) {
            searchFilter.where['id'] = filters.id
        }

        if (filters.Title) {
            searchFilter.where['Title'] = filters.Title
        }

        if (filters.TenantCode) {
            searchFilter.where['TenantCode'] = filters.TenantCode
        }

        if (filters.Description) {
            searchFilter.where['Description'] = filters.Description
        }

        if (filters.CurrentVersion) {
            searchFilter.where['CurrentVersion'] = filters.CurrentVersion
        }

        if (filters.Type) {
            searchFilter.where['Type'] = filters.Type
        }

        if (filters.DisplayCode) {
            searchFilter.where['DisplayCode'] = filters.DisplayCode
        }

        if (filters.OwnerUserId) {
            searchFilter.where['OwnerUserId'] = filters.OwnerUserId
        }
        if (filters.RootSectionId) {
            searchFilter.where['RootSectionId'] = filters.RootSectionId
        }
        if (filters.DefaultSectionNumbering) {
            searchFilter.where['DefaultSectionNumbering'] = filters.DefaultSectionNumbering
        }

        let limit = 25;
        if (filters.ItemsPerPage) {
            limit = filters.ItemsPerPage;
        }

        let order = 'asc';
        if (filters.Order === 'descending') {
            order = 'desc';
        }

        let orderByColum = 'CreatedAt';
        if (filters.OrderBy) {
            searchFilter['orderBy'] = {
                [orderByColum]: order
            }
        }

        let offset = 0;

        let pageIndex = 0;

        if (filters.PageIndex) {
            pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
            offset = pageIndex * limit;
        }

        searchFilter['take'] = limit;
        searchFilter['skip'] = offset;

        return searchFilter;
    };

}
