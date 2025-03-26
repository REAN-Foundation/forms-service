import { FormType, ItemsPerPage, Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import {
    ExportFormTemplateDto,
    FormTemplateCreateModel,
    FormTemplateSearchFilters,
    FormTemplateUpdateModel,
    SectionDto,
    SectionPreviewDto,
    SubsectionDto,
    TemplateDto,
    TemplatePreviewDto
} from "../domain.types/forms/form.template.domain.types";
import { FormTemplateMapper } from "../mappers/form.template.mapper";
import { ErrorHandler } from "../common/error.handler";
import { FormSectionMapper } from "../mappers/form.section.mapper";
import { QuestionMapper } from "../mappers/question.mapper";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class FormTemplateService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    // allFormTemplates = async () => {
    //     const response = await this.prisma.formTemplate.findMany({
    //         where: {
    //             DeletedAt: null,
    //         }
    //     });
    //     return FormTemplateMapper.toArrayDto(response);
    // };

    create = async (model: FormTemplateCreateModel) => {
        const response = await this.prisma.formTemplate.create({
            data: {
                User: {
                    connect: { id: model.OwnerUserId }
                },
                Title: model.Title,
                Description: model.Description,
                CurrentVersion: model.CurrentVersion,
                TenantCode: model.TenantCode,
                Type: model.Type as FormType,
                ItemsPerPage: model.ItemsPerPage as ItemsPerPage,
                DisplayCode: model.DisplayCode,
                // OwnerUserId: model.OwnerUserId,
                RootSectionId: model.RootSectionId,
                DefaultSectionNumbering: model.DefaultSectionNumbering,
                // DeletedAt              : null
            },
        });
        return FormTemplateMapper.toDto(response);
    };

    update = async (id: string, model: FormTemplateUpdateModel) => {
        const response = await this.prisma.formTemplate.update({
            where: {
                id: id,
                DeletedAt: null
            },
            data: {
                Title: model.Title,
                Description: model.Description,
                CurrentVersion: model.CurrentVersion,
                TenantCode: model.TenantCode,
                Type: model.Type as FormType,
                ItemsPerPage: model.ItemsPerPage as ItemsPerPage,
                DisplayCode: model.DisplayCode,
                OwnerUserId: model.OwnerUserId,
                RootSectionId: model.RootSectionId,
                DefaultSectionNumbering: model.DefaultSectionNumbering,
                UpdatedAt: new Date()
            },
        });
        return FormTemplateMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.formTemplate.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
        });
        return FormTemplateMapper.toDto(response);
    };

    getDetailsById = async (id: string) => {
        const record = await this.prisma.formTemplate.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
            include: {
                FormSections: {
                    where: {
                        DeletedAt: null
                    },
                    orderBy: {
                        CreatedAt: 'asc' // Sort sections within each template
                    },
                    include: {
                        Questions: {
                            where: {
                                DeletedAt: null
                            },
                            orderBy: {
                                CreatedAt: 'asc' // Sort questions within each section
                            }
                        },
                        ParentFormTemplate: true
                    }
                }
            }
        })

        const subsections = await this.mapSections(record.FormSections);
        record.FormSections = subsections;

        return record;
        // const template = await this.prisma.formTemplate.findUnique({
        //     where: {
        //         id: id,
        //         DeletedAt: null
        //     },
        // });
        // const sections = await this.prisma.formSection.findMany({
        //     where: {
        //         ParentFormTemplateId: id,
        //         DeletedAt: null
        //     },
        //     include: {
        //         ParentFormTemplate: true
        //     }
        // });
        // const questions = await this.prisma.question.findMany({
        //     where: {
        //         ParentTemplateId: id,
        //         DeletedAt: null
        //     },
        //     include: {
        //         ParentFormTemplate: true,
        //         ParentFormSection: true
        //     }
        // });

        // const searchResult = {
        //     Template: FormTemplateMapper.toDto(template),
        //     Sections: sections.map((x) => FormSectionMapper.toDto(x)),
        //     Questions: questions.map((x) => QuestionMapper.toDto(x))
        // };
        // return searchResult;
    };

    mapSections = async (sections: any[]) => {
        const sectionMap = new Map();

        // Initialize sections and assign an empty array for Subsections
        sections.forEach((section) => {
            sectionMap.set(section.id, { ...section, Subsections: [] });
        });

        const rootSections: any[] = [];

        // Assign subsections to their respective parents
        sections.forEach((section) => {
            if (section.ParentSectionId !== null) {
                const parent = sectionMap.get(section.ParentSectionId);
                if (parent) {
                    parent.Subsections.push(sectionMap.get(section.id));
                }
            } else {
                rootSections.push(sectionMap.get(section.id));
            }
        });

        return rootSections;
    }

    readTemplateObjToExport = async (id: string): Promise<ExportFormTemplateDto> => {
        // Fetch main template
        const template = await this.prisma.formTemplate.findUnique({
            where: { id, DeletedAt: null }
        });
        if (!template) {
            throw new Error(`Template with ID ${id} not found`);
        }

        // Define the Template DTO with required fields
        const templateDto: TemplateDto = {
            id: template.id,
            Title: template.Title,
            Description: template.Description,
            CurrentVersion: template.CurrentVersion,
            TenantCode: template.TenantCode,
            Type: template.Type,
            ItemsPerPage: template.ItemsPerPage,
            DisplayCode: template.DisplayCode,
            OwnerUserId: template.OwnerUserId,
            RootSectionId: template.RootSectionId,
            DefaultSectionNumbering: template.DefaultSectionNumbering,
            CreatedAt: template.CreatedAt,
            UpdatedAt: template.UpdatedAt,
            Sections: []
        };

        // Fetch all top-level sections related to the template
        const sections = await this.prisma.formSection.findMany({
            where: { ParentFormTemplateId: id, ParentSectionId: null, DeletedAt: null },
            include: { ParentFormTemplate: true }
        });

        // For each section, fetch subsections and questions
        for (const section of sections) {
            const dtoSection: SectionDto = {
                id: section.id,
                SectionIdentifier: section.SectionIdentifier,
                Title: section.Title,
                Description: section.Description,
                DisplayCode: section.DisplayCode,
                Sequence: section.Sequence,
                ParentSectionId: section.ParentSectionId,
                CreatedAt: section.CreatedAt,
                UpdatedAt: section.UpdatedAt,
                Subsections: [],
                Questions: []
            };

            // Fetch and map questions associated with this section
            const sectionQuestions = await this.prisma.question.findMany({
                where: { ParentSectionId: section.id, DeletedAt: null }
            });
            dtoSection.Questions = sectionQuestions.map(question => QuestionMapper.toDto(question));

            // Fetch and map subsections
            const subsections = await this.prisma.formSection.findMany({
                where: { ParentSectionId: section.id, DeletedAt: null }
            });

            for (const subsection of subsections) {
                const dtoSubsection: SubsectionDto = {
                    id: subsection.id,
                    SectionIdentifier: subsection.SectionIdentifier,
                    Title: subsection.Title,
                    Description: subsection.Description,
                    DisplayCode: subsection.DisplayCode,
                    Sequence: subsection.Sequence,
                    ParentSectionId: subsection.ParentSectionId,
                    CreatedAt: subsection.CreatedAt,
                    UpdatedAt: subsection.UpdatedAt,
                    Questions: []
                };

                // Fetch questions for this subsection
                const subsectionQuestions = await this.prisma.question.findMany({
                    where: { ParentSectionId: subsection.id, DeletedAt: null }
                });
                dtoSubsection.Questions = subsectionQuestions.map(question => QuestionMapper.toDto(question));

                // Add the subsection to the parent section
                dtoSection.Subsections.push(dtoSubsection);
            }

            // Add the section to the Template DTO
            templateDto.Sections.push(dtoSection);
        }

        // Flatten Sections to top-level property as required by ExportFormTemplateDto
        const exportDto: ExportFormTemplateDto = {
            Template: templateDto,
            Sections: templateDto.Sections // Explicitly include Sections at the top level
        };

        return exportDto;
    }

    previewTemplate = async (id: string) => {
        const template = await this.prisma.formTemplate.findUnique({
            where: { id, DeletedAt: null },
        });

        if (!template) {
            throw new Error(`Template with ID ${id} not found`);
        }

        const templateDto: TemplatePreviewDto = {
            id: template.id,
            Title: template.Title,
            Description: template.Description,
            CurrentVersion: template.CurrentVersion,
            TenantCode: template.TenantCode,
            Type: template.Type,
            ItemsPerPage: template.ItemsPerPage,
            DisplayCode: template.DisplayCode,
            OwnerUserId: template.OwnerUserId,
            RootSectionId: template.RootSectionId,
            DefaultSectionNumbering: template.DefaultSectionNumbering,
            CreatedAt: template.CreatedAt,
            UpdatedAt: template.UpdatedAt,
            RootSection: [],
        };

        // const sections = await this.prisma.formSection.findMany({
        //     where: { ParentFormTemplateId: id, DeletedAt: null },
        //     include: {
        //         ParentFormTemplate: true,

        //         Questions: true
        //     }
        // })
        // console.log('****', JSON.stringify(sections))
        const rootSection = await this.prisma.formSection.findFirst({
            where: {
                ParentFormTemplateId: id,
                Title: 'Assessment Root Section',
                DeletedAt: null,
            },
        });

        if (!rootSection) {
            throw new Error(`No section found with Title 'Assessment Root Section' for template ID ${id}`);
        }

        const rootSectionId = rootSection.id;
        const allSections = await this.prisma.formSection.findMany({
            where: { ParentFormTemplateId: id, DeletedAt: null },
            include: {
                ParentFormTemplate: true,
                Questions: {
                    orderBy: {
                        CreatedAt: 'asc' // Sort questions within each section
                    }
                }
            },
            orderBy: {
                CreatedAt: 'asc' // Sorting in ascending order
            }
        })
        // return allSections;
        return await this.mapSections1(allSections);


        console.log('****', JSON.stringify(allSections))

        const mapSections = async (parentId: string | null): Promise<SectionPreviewDto[]> => {
            const sections = await this.prisma.formSection.findMany({
                where: { ParentSectionId: parentId, ParentFormTemplateId: id, DeletedAt: null },
            });

            return Promise.all(
                sections.map(async (section) => {
                    const sectionDto: SectionPreviewDto = {
                        id: section.id,
                        SectionIdentifier: section.SectionIdentifier,
                        Title: section.Title,
                        Description: section.Description,
                        DisplayCode: section.DisplayCode,
                        Sequence: section.Sequence,
                        ParentSectionId: section.ParentSectionId,
                        CreatedAt: section.CreatedAt,
                        UpdatedAt: section.UpdatedAt,
                        Questions: [],
                        Sections: [],
                    };

                    const questions = await this.prisma.question.findMany({
                        where: { ParentSectionId: section.id, DeletedAt: null },
                    });
                    sectionDto.Questions = questions.map((q) => QuestionMapper.toDto(q));

                    const subSections = await mapSections(section.id);
                    if (subSections.length > 0) {
                        sectionDto.Sections = subSections;
                    }

                    return sectionDto;
                })
            );
        };



        const rootSectionDto: SectionPreviewDto = {
            id: rootSection.id,
            SectionIdentifier: rootSection.SectionIdentifier,
            Title: rootSection.Title,
            Description: rootSection.Description,
            DisplayCode: rootSection.DisplayCode,
            Sequence: rootSection.Sequence,
            ParentSectionId: rootSection.ParentSectionId,
            CreatedAt: rootSection.CreatedAt,
            UpdatedAt: rootSection.UpdatedAt,
            Questions: [],
            Sections: await mapSections(rootSection.id),
        };

        templateDto.RootSection.push(rootSectionDto);

        return templateDto;
    };


    mapSections1 = async (sections: any[]) => {
        const sectionMap = new Map();

        // Initialize sections and assign an empty array for Subsections
        sections.forEach((section) => {
            sectionMap.set(section.id, { ...section, Subsections: [] });
        });

        const rootSections: any[] = [];

        // Assign subsections to their respective parents
        sections.forEach((section) => {
            if (section.ParentSectionId !== null) {
                const parent = sectionMap.get(section.ParentSectionId);
                if (parent) {
                    parent.Subsections.push(sectionMap.get(section.id));
                }
            } else {
                rootSections.push(sectionMap.get(section.id));
            }
        });

        return rootSections;
    }

    delete = async (id: string) => {
        const response = await this.prisma.formTemplate.update({
            where: {
                id: id,
                DeletedAt: null
            },
            data: {
                DeletedAt: new Date(),
            }
        });
        return FormTemplateMapper.toDto(response);
    };

    submissions = async (id: string) => {
        const response = await this.prisma.formTemplate.findMany({
            where: {
                id: id,
                DeletedAt: null
            }
        });
        return FormTemplateMapper.toArrayDto(response);
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


    public search = async (filters: FormTemplateSearchFilters) => {
        try {
            const search = this.getSearchModel(filters);

            const list = await this.prisma.formTemplate.findMany(search);

            const count = await this.prisma.formTemplate.count({
                where: search.where,
            });

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: filters.PageIndex,
                ItemsPerPage: filters.ItemsPerPage,
                Order: filters.Order,
                OrderedBy: filters.OrderBy,
                Items: list.map((x) => FormTemplateMapper.toDto(x)),
            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
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
