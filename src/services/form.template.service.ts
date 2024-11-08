import { FormType, ItemsPerPage, Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { FormTemplateCreateModel, FormTemplateSearchFilters, FormTemplateUpdateModel } from "../domain.types/forms/form.template.domain.types";
import { FormTemplateMapper } from "../mappers/form.template.mapper";
import { ErrorHandler } from "../common/error.handler";
import { FormSectionMapper } from "../mappers/form.section.mapper";
import { QuestionMapper } from "../mappers/question.mapper";


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
                User:{
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
        const template = await this.prisma.formTemplate.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
        });
        const sections = await this.prisma.formSection.findMany({
            where: {
                ParentFormTemplateId: id,
                DeletedAt: null
            },
            include: {
                ParentFormTemplate: true
            }
        });
        const questions = await this.prisma.question.findMany({
            where: {
                ParentTemplateId: id,
                DeletedAt: null
            },
            include: {
                ParentFormTemplate: true,
                ParentFormSection: true
            }
        });

        const searchResult = {
            Template: FormTemplateMapper.toDto(template),
            Sections: sections.map((x) => FormSectionMapper.toDto(x)),
            Questions: questions.map((x) => QuestionMapper.toDto(x))
        };
        return searchResult;
    };


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

<<<<<<< Updated upstream
=======
    // public readTemplateObjToExport = async (templateId: uuid): Promise<ExportFormTemplateDto> => {

    //         const template = await this.prisma.formTemplate.findUnique({
    //             where: {
    //                 id: id,
    //                 DeletedAt: null
    //             },
    //         });

    //         const sections = await this.prisma.formSection.findMany({
    //             where: {
    //                 ParentFormTemplateId: id,
    //                 DeletedAt: null
    //             },
    //             include: {
    //                 ParentFormTemplate: true
    //             }
    //         });

    //         const questions = await this.prisma.question.findMany({
    //             where: {
    //                 ParentTemplateId: id,
    //                 DeletedAt: null
    //             },
    //             include: {
    //                 ParentFormTemplate: true,
    //                 ParentFormSection: true
    //             }
    //         });

    //         // Map sections to a nested structure
    //         const sectionMap = sections.reduce((acc, section) => {
    //             const dtoSection = FormSectionMapper.toDto(section);
    //             dtoSection.Subsections = [];
    //             dtoSection.Questions = [];
    //             acc[section.id] = dtoSection;
    //             return acc;
    //         }, {});

    //         // Assign questions to the appropriate sections or subsections
    //         questions.forEach(question => {
    //             const dtoQuestion = QuestionMapper.toDto(question);
    //             const sectionId = question.ParentFormSection.id;

    //             if (sectionMap[sectionId]) {
    //                 sectionMap[sectionId].Questions.push(dtoQuestion);
    //             } else {
    //                 const parentSection = sections.find(s => s.id === sectionId);
    //                 if (parentSection && sectionMap[parentSection.ParentSectionId]) {
    //                     if (!sectionMap[parentSection.ParentSectionId].Subsections) {
    //                         sectionMap[parentSection.ParentSectionId].Subsections = [];
    //                     }
    //                     const subsection = sectionMap[sectionId] || { ...FormSectionMapper.toDto(parentSection), Questions: [] };
    //                     subsection.Questions.push(dtoQuestion);
    //                     sectionMap[parentSection.ParentSectionId].Subsections.push(subsection);
    //                 }
    //             }
    //         });

    //         // Convert sectionMap to an array and structure it for Template
    //         const structuredSections = Object.values(sectionMap).filter(
    //             (section) => !section.ParentSectionId
    //         );

    //         const searchResult = {
    //             Template: {
    //                 ...FormTemplateMapper.toDto(template),
    //                 Sections: structuredSections
    //             }
    //         };

    //         return searchResult;
    //     }; 
    // };

    // readTemplateObjToExport = async (id: uuid): Promise<ExportFormTemplateDto> => {
    //     const template = await this.prisma.formTemplate.findUnique({
    //         where: {
    //             id: id,
    //             DeletedAt: null
    //         },
    //     });

    //     const sections = await this.prisma.formSection.findMany({
    //         where: {
    //             ParentFormTemplateId: id,
    //             DeletedAt: null
    //         },
    //         include: {
    //             ParentFormTemplate: true
    //         }
    //     });

    //     const questions = await this.prisma.question.findMany({
    //         where: {
    //             ParentTemplateId: id,
    //             DeletedAt: null
    //         },
    //         include: {
    //             ParentFormTemplate: true,
    //             ParentFormSection: true
    //         }
    //     });

    //     // Map sections to a nested structure
    //     // Define sectionMap with explicit type
    //     const sectionMap: Record<string, SectionDto | SubsectionDto> = sections.reduce((acc, section) => {
    //         const dtoSection: SectionDto = {
    //             ...FormSectionMapper.toDto(section),
    //             Subsections: [],
    //             Questions: []
    //         };
    //         acc[section.id] = dtoSection;
    //         return acc;
    //     }, {} as Record<string, SectionDto | SubsectionDto>);

    //     // Step 2: Assign questions to their respective sections or subsections
    //     questions.forEach(question => {
    //         const dtoQuestion: QuestionDto = QuestionMapper.toDto(question);
    //         const sectionId = question.ParentFormSection.id;

    //         if (sectionMap[sectionId]) {
    //             // Add directly to the Questions array if it's a top-level section
    //             (sectionMap[sectionId] as SectionDto).Questions.push(dtoQuestion);
    //         } else {
    //             // Add to Subsections if it's nested
    //             const parentSection = sections.find(s => s.id === sectionId);
    //             if (parentSection && sectionMap[parentSection.ParentSectionId]) {
    //                 const subsection: SubsectionDto = {
    //                     ...FormSectionMapper.toDto(parentSection),
    //                     Questions: [dtoQuestion],
    //                     // Subsections: []
    //                 };

    //                 if (!(sectionMap[parentSection.ParentSectionId] as SectionDto).Subsections) {
    //                     (sectionMap[parentSection.ParentSectionId] as SectionDto).Subsections = [];
    //                 }
    //                 (sectionMap[parentSection.ParentSectionId] as SectionDto).Subsections.push(subsection);
    //             }
    //         }
    //     });


    //     // Convert sectionMap to an array and structure it for Template
    //     const structuredSections = Object.values(sectionMap).filter(
    //         (section) => !section.ParentSectionId
    //     );

    //     const searchResult = {
    //         Template: {
    //             ...FormTemplateMapper.toDto(template),
    //             Sections: structuredSections
    //         }
    //     };

    //     return searchResult;
    // };

    readTemplateObjToExport = async (id: uuid): Promise<ExportFormTemplateDto> => {
        // Step 1: Fetch the main template
        const template = await this.prisma.formTemplate.findUnique({
            where: { id: id, DeletedAt: null }
        });
        if (!template) {
            throw new Error(`Template with ID ${id} not found`);
        }

        // Step 2: Fetch all sections related to the template
        const sections = await this.prisma.formSection.findMany({
            where: { ParentFormTemplateId: id, ParentSectionId: null, DeletedAt: null },
            include: { ParentFormTemplate: true }
        });

        // Step 3: Initialize the DTO object for the template
        const exportTemplate: ExportFormTemplateDto = {
            ...FormTemplateMapper.toDto(template),
            Sections: []
        };

        // Step 4: For each section, fetch subsections and questions
        for (const section of sections) {
            // Convert to DTO and prepare for adding subsections and questions
            const dtoSection: SectionDto = {
                ...FormSectionMapper.toDto(section),
                Subsections: [],
                Questions: []
            };

            // Fetch questions associated with this section
            const sectionQuestions = await this.prisma.question.findMany({
                where: { ParentSectionId: section.id, DeletedAt: null }
            });
            dtoSection.Questions = sectionQuestions.map(question => QuestionMapper.toDto(question));

            // Fetch subsections for this section
            const subsections = await this.prisma.formSection.findMany({
                where: { ParentSectionId: section.id, DeletedAt: null }
            });

            // For each subsection, fetch its questions
            for (const subsection of subsections) {
                const dtoSubsection: SectionDto = {
                    ...FormSectionMapper.toDto(subsection),
                    Questions: []
                };

                // Fetch questions for this subsection
                const subsectionQuestions = await this.prisma.question.findMany({
                    where: { ParentSectionId: subsection.id, DeletedAt: null }
                });
                dtoSubsection.Questions = subsectionQuestions.map(question => QuestionMapper.toDto(question));

                // Add the subsection (with its questions) to the parent section
                dtoSection.Subsections.push(dtoSubsection);
            }

            // Step 5: Add the section (with its subsections and questions) to the template
            exportTemplate.Sections.push(dtoSection);
        }

        return exportTemplate;
    };



    // public async readTemplateObjToExport(id: string): Promise<ExportFormTemplateDto> {
    //     // Fetch main template
    //     const template = await this.prisma.formTemplate.findUnique({
    //         where:
    //         {
    //             id,
    //             DeletedAt: null
    //         }
    //     });

    //     if (!template) {
    //         throw new Error(`Template with ID ${id} not found`);
    //     }

    //     // Define the Template DTO with required fields
    //     const templateDto: TemplateDto = {
    //         id: template.id,
    //         Title: template.Title,
    //         Description: template.Description,
    //         CurrentVersion: template.CurrentVersion,
    //         TenantCode: template.TenantCode,
    //         Type: template.Type,
    //         ItemsPerPage: template.ItemsPerPage,
    //         DisplayCode: template.DisplayCode,
    //         OwnerUserId: template.OwnerUserId,
    //         RootSectionId: template.RootSectionId,
    //         DefaultSectionNumbering: template.DefaultSectionNumbering,
    //         CreatedAt: template.CreatedAt,
    //         UpdatedAt: template.UpdatedAt,
    //         Sections: []
    //     };

    //     // Fetch all top-level sections related to the template
    //     const sections = await this.prisma.formSection.findMany({
    //         where:
    //         {
    //             ParentFormTemplateId: id,
    //             ParentSectionId: null,
    //             DeletedAt: null
    //         },
    //         include:
    //         {
    //             ParentFormTemplate: true
    //         }
    //     });

    //     // For each section, fetch subsections and questions
    //     for (const section of sections) {
    //         const dtoSection: SectionDto = {
    //             id: section.id,
    //             SectionIdentifier: section.SectionIdentifier,
    //             Title: section.Title,
    //             Description: section.Description,
    //             DisplayCode: section.DisplayCode,
    //             Sequence: section.Sequence,
    //             ParentSectionId: section.ParentSectionId,
    //             CreatedAt: section.CreatedAt,
    //             UpdatedAt: section.UpdatedAt,
    //             Subsections: [],
    //             Questions: []
    //         };

    //         // Fetch and map questions associated with this section
    //         const sectionQuestions = await this.prisma.question.findMany({
    //             where:
    //             {
    //                 ParentSectionId: section.id,
    //                 DeletedAt: null
    //             }
    //         });

    //         dtoSection.Questions = sectionQuestions.map(question => QuestionMapper.toDto(question));

    //         // Fetch and map subsections
    //         const subsections = await this.prisma.formSection.findMany({
    //             where:
    //             {
    //                 ParentSectionId: section.id,
    //                 DeletedAt: null
    //             }
    //         });

    //         for (const subsection of subsections) {
    //             const dtoSubsection: SubsectionDto = {
    //                 id: subsection.id,
    //                 SectionIdentifier: subsection.SectionIdentifier,
    //                 Title: subsection.Title,
    //                 Description: subsection.Description,
    //                 DisplayCode: subsection.DisplayCode,
    //                 Sequence: subsection.Sequence,
    //                 ParentSectionId: subsection.ParentSectionId,
    //                 CreatedAt: subsection.CreatedAt,
    //                 UpdatedAt: subsection.UpdatedAt,
    //                 Questions: []
    //             };

    //             // Fetch questions for this subsection
    //             const subsectionQuestions = await this.prisma.question.findMany({
    //                 where:
    //                 {
    //                     ParentSectionId: subsection.id,
    //                     DeletedAt: null
    //                 }
    //             });
    //             dtoSubsection.Questions = subsectionQuestions.map(question => QuestionMapper.toDto(question));

    //             // Add the subsection to the parent section
    //             dtoSection.Subsections.push(dtoSubsection);
    //         }

    //         // Add the section to the Template DTO
    //         templateDto.Sections.push(dtoSection);
    //     }

    //     // Wrap templateDto in ExportFormTemplateDto and return
    //     return { Template: templateDto };
    // }

>>>>>>> Stashed changes
    protected addSortingAndPagination = (
        search: Prisma.FormTemplateFindManyArgs,
        filters: FormTemplateSearchFilters
    ) => {
        // Sorting
        let orderByColumn: keyof typeof Prisma.FormTemplateScalarFieldEnum = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy as keyof typeof Prisma.FormTemplateScalarFieldEnum;
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


    public search = async (filters: FormTemplateSearchFilters) => {
        try {
            const { search: prismaSearch, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination({}, filters);

            const list = await this.prisma.formTemplate.findMany({
                where: prismaSearch.where,
                take: limit,
                skip: (pageIndex - 1) * limit,
                orderBy: {
                    [orderByColumn]: order === 'desc' ? 'desc' : 'asc',
                },
            });

            const count = await this.prisma.formTemplate.count({
                where: prismaSearch.where,
            });

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'desc' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => FormTemplateMapper.toDto(x)),
            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };





    private getSearchModel = (filters: FormTemplateSearchFilters): Prisma.FormTemplateWhereInput => {
        const where: Prisma.FormTemplateWhereInput = {
            DeletedAt: null
        };

        if (filters.id) {
            where.id = {
                equals: filters.id,
            };
        }

        if (filters.title) {
            where.Title = {
                equals: filters.title,
            };
        }
        if (filters.tenantCode) {
            where.TenantCode = {
                equals: filters.tenantCode,
            };
        }

        if (filters.description) {
            where.Description = {
                equals: filters.description,
            };
        }

        if (filters.currentVersion) {
            where.CurrentVersion = {
                equals: filters.currentVersion,
            };
        }

        if (filters.type) {
            where.Type = {
                equals: filters.type,
            };
        }

        if (filters.displayCode) {
            where.DisplayCode = {
                equals: filters.displayCode,
            };
        }

        if (filters.ownerUserId) {
            where.OwnerUserId = {
                equals: filters.ownerUserId,
            };
        }
        if (filters.rootSectionId) {
            where.RootSectionId = {
                equals: filters.rootSectionId,
            };
        }
        if (filters.defaultSectionNumbering) {
            where.DefaultSectionNumbering = {
                equals: filters.defaultSectionNumbering,
            };
        }


        return where;
    };

}
