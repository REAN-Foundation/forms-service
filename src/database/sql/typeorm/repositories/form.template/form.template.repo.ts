import { ExportFormTemplateDto, FormTemplateCreateModel, SectionDto, SectionPreviewDto, SubsectionDto, TemplateDto, TemplatePreviewDto } from "../../../../../domain.types/forms/form.template.domain.types";
import { IFormTemplateRepo } from "../../../../repository.interfaces/form.template/form.template.repo.interface";
import { FormTemplateResponseDto } from "../../../../../domain.types/forms/form.template.domain.types";
import { FormTemplateUpdateModel } from "../../../../../domain.types/forms/form.template.domain.types";
import { FormTemplateSearchFilters } from "../../../../../domain.types/forms/form.template.domain.types";
import { FormTemplate } from "../../models/form.template/form.template.model";
import { Source } from "../../database.connector.typeorm";
import { FormType } from "../../models/form.template/form.template.model";
import { FormTemplateMapper } from "../../mappers/form.template.mapper";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { Logger } from "../../../../../common/logger";
import { BaseRepo } from "../base.repo";
import { FindManyOptions, IsNull, Repository } from "typeorm";
import { Question } from "../../models/question/question.model";
import { QuestionMapper } from "../../mappers/question.mapper";
import { FormSection } from "../../models/form.section/form.section.model";

export class FormTemplateRepo extends BaseRepo implements IFormTemplateRepo {

  _formTemplateRepo : Repository<FormTemplate> = Source.getRepository(FormTemplate);

  _question: Repository<Question> = Source.getRepository(Question);

  _formSection : Repository<FormSection> = Source.getRepository(FormSection);

  create = async ( model: FormTemplateCreateModel): Promise<FormTemplateResponseDto> => {

      Logger.instance().log(
            `${FormTemplate}`
          );

       Logger.instance().log(
            `${FormType}`
          );    
          
    try {
      
      const data = this._formTemplateRepo.create({
          Title: model.Title,
          Description: model.Description,
          // CurrentVersion: model.CurrentVersion,
          // TenantCode: model.TenantCode,
          Type: model.Type as FormType,
          // ItemsPerPage: model.ItemsPerPage,
          DisplayCode: model.DisplayCode,
          // OwnerUserId: model.OwnerUserId,
          RootSectionId: model.RootSectionId,
          DefaultSectionNumbering: model.DefaultSectionNumbering,
       });

       const record = await this._formTemplateRepo.save(data);
       return FormTemplateMapper.toDto(record);
      } 
      
      catch (error) 
      {
        ErrorHandler.throwInternalServerError(error.message, 500);
      }
  };

  update = async (
    id: string,
    model: FormTemplateUpdateModel
  ): Promise<FormTemplateResponseDto> => {
    try {
      const updateData = await this._formTemplateRepo.findOne({
        where: {
          id: id,
          DeletedAt: null,
        },
      });
      if (!updateData) {
        ErrorHandler.throwNotFoundError("Form Section Data not found!");
      }
      // if (model.SectionIdentifier) {
      //     updateData.SectionIdentifier = model.SectionIdentifier;
      // }
      if (model.Title) {
        updateData.Title = model.Title;
      }
      if (model.Description) {
        updateData.Description = model.Description;
      }
      //    if (model.CurrentVersion) {
      //        updateData.CurrentVersion = model.CurrentVersion;
      //    }

      //    if (model.TenantCode) {
      //        updateData.TenantCode = model.TenantCode;
      //    }

      //    if (model.QueryParams) {
      //        updateData.QueryParams = model.QueryParams;
      //    }

      if (model.Type) {
        updateData.Type = model.Type;
      }

      //    if (model.ItemsPerPage) {
      //        updateData.ItemsPerPage = model.ItemsPerPage;
      //    }

      //    if (model.Status) {
      //        updateData.Status = model.Status;
      //    }

      //    if (model.Category) {
      //        updateData.Category = model.Category;
      //    }

      updateData.UpdatedAt = new Date();

      var record = await this._formTemplateRepo.save(updateData);
      return FormTemplateMapper.toDto(record);
    } catch (error) {
      ErrorHandler.throwInternalServerError(error.message, 500);
    }
  };

  getById = async (id: string): Promise<FormTemplateResponseDto> => {
    try {
      var record = await this._formTemplateRepo.findOne({
        where: {
          id: id,
          DeletedAt: null,
        },
      });
      return FormTemplateMapper.toDto(record);
    } catch (error) {
      Logger.instance().log(error.message);
      ErrorHandler.throwInternalServerError(error.message, 500);
    }
  };

  getDetailsById = async (id: string) => {
    const record = await this._formTemplateRepo.findOne({
      where: {
        id: id,
        DeletedAt: IsNull(),
      },
      relations: {
        FormSections: {
          Questions: true,
          FormTemplate: true,
        },
      },
      order: {
        FormSections: {
          CreatedAt: "ASC",
          Questions: {
            CreatedAt: "ASC",
          },
        },
      },
    });

    if (record && record.FormSections) {
      record.FormSections = record.FormSections.filter(
        (section) => section.DeletedAt === null
      );

      record.FormSections.forEach((section) => {
        if (section.Questions) {
          section.Questions = section.Questions.filter(
            (question) => question.DeletedAt === null
          );
        }
      });
    }

    const subsections = await this.mapSections(record.FormSections);
    record.FormSections = subsections;

    return record;
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
  };

  readTemplateObjToExport = async (
    id: string
  ): Promise<ExportFormTemplateDto> => {
    // Fetch main template
    const template = await this._formTemplateRepo.findOne({
      where: { id, DeletedAt: null },
    });
    if (!template) {
      throw new Error(`Template with ID ${id} not found`);
    }

    // Define the Template DTO with required fields
    const templateDto: TemplateDto = {
      id: template.id,
      Title: template.Title,
      Description: template.Description,
      // CurrentVersion: template.CurrentVersion,
      // TenantCode: template.TenantCode,
      Type: template.Type as FormType,
      // ItemsPerPage: template.ItemsPerPage,
      DisplayCode: template.DisplayCode,
      // OwnerUserId: template.OwnerUserId,
      RootSectionId: template.RootSectionId,
      DefaultSectionNumbering: template.DefaultSectionNumbering,
      CreatedAt: template.CreatedAt,
      UpdatedAt: template.UpdatedAt,
      Sections: [],
    };

    // Fetch all top-level sections related to the template
    // const sections = await this._formTemplateRepo.find({
    //   where: {
    //     ParentFormTemplateId: id,
    //     ParentSectionId: null,
    //     DeletedAt: null,
    //   },
    //   include: { ParentFormTemplate: true },
    // });

    const sections = await this._formSection.find({
      where: {
        FormTemplateId: id,
        ParentSectionId: null,
        DeletedAt: null,
      },
    });

    // For each section, fetch subsections and questions
    for (const section of sections) {
      const dtoSection: SectionDto = {
        id: section.id,
        // SectionIdentifier: section.SectionIdentifier,
        Title: section.Title,
        Description: section.Description,
        DisplayCode: section.DisplayCode,
        // Sequence: section.Sequence,
        ParentSectionId: section.ParentSectionId,
        CreatedAt: section.CreatedAt,
        UpdatedAt: section.UpdatedAt,
        Subsections: [],
        Questions: [],
      };

      // Fetch and map questions associated with this section
      const sectionQuestions = await this._question.find({
        where: { ParentSectionId: section.id, DeletedAt: null },
      });
      dtoSection.Questions = sectionQuestions.map((question) =>
        QuestionMapper.toDto(question)
      );

      // Fetch and map subsections
      const subsections = await this._formSection.find({
        where: { ParentSectionId: section.id, DeletedAt: null },
      });

      for (const subsection of subsections) {
        const dtoSubsection: SubsectionDto = {
          id: subsection.id,
          // SectionIdentifier: subsection.SectionIdentifier,
          Title: subsection.Title,
          Description: subsection.Description,
          DisplayCode: subsection.DisplayCode,
          Sequence: subsection.Sequence,
          ParentSectionId: subsection.ParentSectionId,
          CreatedAt: subsection.CreatedAt,
          UpdatedAt: subsection.UpdatedAt,
          Questions: [],
        };

        // Fetch questions for this subsection
        const subsectionQuestions = await this._question.find({
          where: { ParentSectionId: subsection.id, DeletedAt: null },
        });
        dtoSubsection.Questions = subsectionQuestions.map((question) =>
          QuestionMapper.toDto(question)
        );

        // Add the subsection to the parent section
        dtoSection.Subsections.push(dtoSubsection);
      }

      // Add the section to the Template DTO
      templateDto.Sections.push(dtoSection);
    }

    // Flatten Sections to top-level property as required by ExportFormTemplateDto
    const exportDto: ExportFormTemplateDto = {
      Template: templateDto,
      Sections: templateDto.Sections, // Explicitly include Sections at the top level
    };

    return exportDto;
  };

  previewTemplate = async (id: string) => {
    const template = await this._formTemplateRepo.findOne({
      where: { id, DeletedAt: null },
    });

    if (!template) {
      throw new Error(`Template with ID ${id} not found`);
    }

    const templateDto: TemplatePreviewDto = {
      id: template.id,
      Title: template.Title,
      Description: template.Description,
      // CurrentVersion: template.CurrentVersion,
      // TenantCode: template.TenantCode,
      Type: template.Type as FormType,
      // ItemsPerPage: template.ItemsPerPage,
      DisplayCode: template.DisplayCode,
      // OwnerUserId: template.OwnerUserId,
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
    const rootSection = await this._formSection.findOne({
      where: {
        FormTemplateId: id,
        Title: "Assessment Root Section",
        DeletedAt: null,
      },
    });

    if (!rootSection) {
      throw new Error(
        `No section found with Title 'Assessment Root Section' for template ID ${id}`
      );
    }

    const rootSectionId = rootSection.id;
    const allSections = await this._formSection.find({
      where: {
        FormTemplateId: id,
        DeletedAt: IsNull(),
      },
      relations: {
        FormTemplate: true,
        Questions: true,
      },
      order: {
        CreatedAt: "ASC", // Sorting sections in ascending order
        Questions: {
          CreatedAt: "ASC", // Sorting questions within each section
        },
      },
    });
    // return allSections;
    return await this.mapSections1(allSections);

    console.log("****", JSON.stringify(allSections));

    const mapSections = async (
      parentId: string | null
    ): Promise<SectionPreviewDto[]> => {
      const sections = await this._formSection.find({
        where: {
          ParentSectionId: parentId,
          FormTemplateId: id,
          DeletedAt: null,
        },
      });

      return Promise.all(
        sections.map(async (section) => {
          const sectionDto: SectionPreviewDto = {
            id: section.id,
            // SectionIdentifier: section.SectionIdentifier,
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

          const questions = await this._question.find({
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
      // SectionIdentifier: rootSection.SectionIdentifier,
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
  };

  delete = async (id: string) : Promise<boolean>=> {
    const record = await this._formTemplateRepo.findOne({
      where: {
        id: id,
        DeletedAt: null,
      },
    });

     if (!record) {
       return false; // Record not found
     }
     record.DeletedAt = new Date(); // Soft delete
     await this._formTemplateRepo.save(record);

    return true; // Soft delete successful
  };

  submissions = async (id: string) : Promise<FormTemplateResponseDto[]>=> {
    const response = await this._formTemplateRepo.find({
      where: {
        id: id,
        DeletedAt: null,
      },
    });
    return FormTemplateMapper.toArrayDto(response);
  };

  search = async (filters: FormTemplateSearchFilters): Promise<any> => {
    try {
      var search = this.getSearchModel(filters);
      var { search, pageIndex, limit, order, orderByColumn } =
        this.addSortingAndPagination(search, filters);
      const [list, count] = await this._formTemplateRepo.findAndCount(search);

      const searchResults = {
        TotalCount: count,
        RetrievedCount: list.length,
        PageIndex: pageIndex,
        ItemsPerPage: limit,
        Order: order === "DESC" ? "descending" : "ascending",
        OrderedBy: orderByColumn,
        Items: list.map((x) => FormTemplateMapper.toDto(x)),
      };
      return searchResults;
    } catch (error) {
      Logger.instance().log(error.message);
      ErrorHandler.throwDbAccessError(
        "DB Error: Unable to search records!",
        error
      );
    }
  };

  private getSearchModel = (filters: FormTemplateSearchFilters) => {
    var search: FindManyOptions<FormTemplate> = {
      relations: {},
      where: {},
    };

    if (filters.id) {
      search.where["id"] = filters.id;
    }

    if (filters.Title) {
      search.where["Title"] = filters.Title;
    }

    if (filters.TenantCode) {
      search.where["TenantCode"] = filters.TenantCode;
    }

    if (filters.Description) {
      search.where["Description"] = filters.Description;
    }

    if (filters.CurrentVersion) {
      search.where["CurrentVersion"] = filters.CurrentVersion;
    }

    if (filters.Type) {
      search.where["Type"] = filters.Type;
    }

    if (filters.DisplayCode) {
      search.where["DisplayCode"] = filters.DisplayCode;
    }

    if (filters.OwnerUserId) {
      search.where["OwnerUserId"] = filters.OwnerUserId;
    }
    if (filters.RootSectionId) {
      search.where["RootSectionId"] = filters.RootSectionId;
    }
    if (filters.DefaultSectionNumbering) {
      search.where["DefaultSectionNumbering"] = filters.DefaultSectionNumbering;
    }

    return search;
  };
}