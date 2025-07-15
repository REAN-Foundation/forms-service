import { QuestionResponseCreateModel } from "../../../../../domain.types/forms/response.domain.types";
import { QueryResponseType } from "../../../../../domain.types/forms/query.response.types";
import { IResponseRepo } from "../../../../repository.interfaces/question.response/question.response.repo.interface";
import { QuestionResponseUpdateModel } from "../../../../../domain.types/forms/response.domain.types";
import { QuestionResponseResponseDto } from "../../../../../domain.types/forms/response.domain.types";
import { QuestionResponseSearchFilters } from "../../../../../domain.types/forms/response.domain.types";
import { QuestionResponse } from "../../models/question.response/question.response.model";
import { Source } from "../../database.connector.typeorm";
import { Logger } from "../../../../../common/logger";
import { ErrorHandler } from "../../../../../common/handlers/error.handler";
import { ResponseMapper } from "../../mappers/question.response.mapper";
import * as fs from 'fs';
import { FindManyOptions, Repository } from "typeorm";
import PDFDocument from 'pdfkit';
import { BaseRepo } from "../base.repo";
import path from "path";
import { createObjectCsvWriter } from "csv-writer";
import { QuestionResponseDto } from "../../../../../domain.types/forms/question.domain.types";
import { FormFieldEntity } from "../../models/form.field/form.field.model";
import { FormFieldMapper } from "../../mappers/form.field.mapper";

export class ResponseRepo extends BaseRepo implements IResponseRepo {

  _responseRepo: Repository<QuestionResponse> = Source.getRepository(QuestionResponse);

  _formFieldRepo: Repository<FormFieldEntity> = Source.getRepository(FormFieldEntity);

  create = async (model: QuestionResponseCreateModel): Promise<QuestionResponseResponseDto> => {
    try {
      const data = await this._responseRepo.create({
        FormSubmissionId: model.FormSubmissionId,
        QuestionId: model.QuestionId,
        ResponseType: model.ResponseType as QueryResponseType,
        IntegerValue: model.IntegerValue,
        FloatValue: model.FloatValue,
        BooleanValue: model.BooleanValue,
        DateTimeValue: model.DateTimeValue,
        Url: model.Url,
        FileResourceId: model.FileResourceId,
        Text: model.TextValue,
        SubmissionTimestamp: null,
        LastSaveTimestamp: new Date(),
        UserResponse: model.UserResponse ?? null
      });
      const record = await this._responseRepo.save(data);
      return ResponseMapper.toDto(record);
    } catch (error) {
      ErrorHandler.throwInternalServerError(error.message, 500);
    }
  };

  save = async (model: any) => {
    try {
      const data = await this._responseRepo.create({
        ResponseType: model.ResponseType as QueryResponseType,
        FloatValue: model.FloatValue,
        IntegerValue: model.IntegerValue,
        BooleanValue: model.BooleanValue,
        DateTimeValue: model.DateTimeValue,
        Url: model.Url,
        Text: model.TextValue,
        SubmissionTimestamp: null,
        LastSaveTimestamp: new Date(),
      });
      const record = await this._responseRepo.save(data);
      return ResponseMapper.toDto(record);
    } catch (error) {
      ErrorHandler.throwInternalServerError(error.message, 500);
    }
  };

  update = async (id: string, model: QuestionResponseUpdateModel): Promise<QuestionResponseResponseDto> => {
    try {

      const updateData = await this._responseRepo.findOne({
        where: {
          id: id,
          DeletedAt: null,
        },
      });


      if (!updateData) {
        ErrorHandler.throwNotFoundError('Question Response Data not found!');
      }
      if (model.ResponseType) {
        updateData.ResponseType = model.ResponseType;
      }
      if (model.IntegerValue) {
        updateData.IntegerValue = model.IntegerValue;
      }
      if (model.FloatValue) {
        updateData.FloatValue = model.FloatValue;
      }

      if (model.BooleanValue) {
        updateData.BooleanValue = model.BooleanValue;
      }

      if (model.DateTimeValue) {
        updateData.DateTimeValue = model.DateTimeValue;
      }

      if (model.Url) {
        updateData.Url = model.Url;
      }

      if (model.FileResourceId) {
        updateData.FileResourceId = model.FileResourceId;
      }

      if (model.TextValue) {
        updateData.Text = model.TextValue;
      }

      updateData.LastSaveTimestamp = new Date();

      updateData.UpdatedAt = new Date();

      var record = await this._responseRepo.save(updateData);
      return ResponseMapper.toDto(record);
    }
    catch (error) {
      ErrorHandler.throwInternalServerError(error.message, 500);
    }
  };

  getById = async (id: string): Promise<QuestionResponseResponseDto> => {
    try {
      var record = await this._responseRepo.findOne({
        where: {
          id: id,
          DeletedAt: null,
        },
      });
      return ResponseMapper.toDto(record);
    }

    catch (error) {
      Logger.instance().log(error.message);
      ErrorHandler.throwInternalServerError(error.message, 500);
    }
  };

  getQuestionById = async (id: string): Promise<QuestionResponseDto> => {
    try {
      var record = await this._formFieldRepo.findOne({
        where: {
          id: id,
          DeletedAt: null,
        },
      });
      return FormFieldMapper.toDto(record);
    }
    catch (error) {
      Logger.instance().log(error.message);
      ErrorHandler.throwInternalServerError(error.message, 500);
    }
  };

  delete = async (id: string): Promise<boolean> => {
    try {
      var record = await this._responseRepo.findOne({
        where: {
          id: id,
          DeletedAt: null,
        },
      });

      if (!record) {
        return false;
      }
      record.DeletedAt = new Date();
      await this._responseRepo.save(record);
      return true;
    }
    catch (error) {
      Logger.instance().log(error.message);
      ErrorHandler.throwInternalServerError(error.message, 500);
    }
  };

  getAll = async (): Promise<QuestionResponseResponseDto[]> => {
    try {
      const data = [];
      var prompts = await this._responseRepo.find();
      for (var i of prompts) {
        const record = ResponseMapper.toDto(i);
        data.push(record);
      }
      return data;
    } catch (error) {
      Logger.instance().log(error.message);
      ErrorHandler.throwDbAccessError('DB Error: Unable to get Llm prompt record!', error);
    }
  };

  exportCsv = async (): Promise<string> => {
    const data = await this.getAll();
    const csvPath = path.join(__dirname, '../../../storage/data.csv');
    const csvWriter = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'FormSubmission.id', title: 'Submission ID' },
        { id: 'FormSubmission.TemplateId', title: 'Template ID' },
        { id: 'FormSubmission.FormUrl', title: 'Form URL' },
        { id: 'FormSubmission.UserId', title: 'User ID' },
        { id: 'FormSubmission.Status', title: 'Status' },
        { id: 'FormSubmission.SubmissionTimestamp', title: 'Submission Timestamp' },
        { id: 'FormSubmission.CreatedAt', title: 'Created At' },
        { id: 'Question.id', title: 'Question ID' },
        { id: 'Question.Title', title: 'Question Title' },
        { id: 'Question.Description', title: 'Question Description' },
        { id: 'Question.DisplayCode', title: 'Display Code' },
        { id: 'Question.ResponseType', title: 'Response Type' },
        { id: 'Question.Score', title: 'Score' },
        { id: 'Question.CorrectAnswer', title: 'Correct Answer' },
        { id: 'Question.Hint', title: 'Hint' },
        { id: 'Question.TemplateId', title: 'Question Template ID' },
        { id: 'Question.SectionId', title: 'Question Section ID' },
        { id: 'Question.CreatedAt', title: 'Question Created At' },
        { id: 'Question.UpdatedAt', title: 'Question Updated At' },
        { id: 'ResponseType', title: 'Query Response Type' },
        { id: 'IntegerValue', title: 'Integer Value' },
        { id: 'FloatValue', title: 'Float Value' },
        { id: 'BooleanValue', title: 'Boolean Value' },
        { id: 'DateTimeValue', title: 'Date Time Value' },
        { id: 'Url', title: 'URL' },
        { id: 'FileResourceId', title: 'File Resource ID' },
        { id: 'TextValue', title: 'Text Value' },
        { id: 'SubmissionTimestamp', title: 'Submission Timestamp' },
        { id: 'LastSaveTimestamp', title: 'Last Save Timestamp' }
      ]
    });
    await csvWriter.writeRecords(data);
    return csvPath;
  };

  exportPdf = async (): Promise<string> => {
    const data = await this.getAll();
    const pdfPath = path.join(__dirname, '../../../storage/data.pdf');
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.text('ID\tSubmission ID\tTemplate ID\tForm URL\tUser ID\tStatus\tSubmission Timestamp\tCreated At\t' +
      'Question ID\tQuestion Title\tQuestion Description\tDisplay Code\tResponse Type\tScore\t' +
      'Correct Answer\tHint\tQuestion Template ID\tQuestion Section ID\tQuestion Created At\t' +
      'Question Updated At\tQuery Response Type\tInteger Value\tFloat Value\tBoolean Value\t' +
      'Date Time Value\tURL\tFile Resource ID\tText Value\tSubmission Timestamp\tLast Save Timestamp');

    data.forEach(row => {
      doc.text(`${row.id}\t${row.FormSubmission.id}\t${row.FormSubmission.TemplateId}\t${row.FormSubmission.FormUrl}\t${row.FormSubmission.UserId}\t${row.FormSubmission.Status}\t${row.FormSubmission.SubmissionTimestamp}\t${row.FormSubmission.CreatedAt}\t` +
        `${row.Question.id}\t${row.Question.Title}\t${row.Question.Description}\t${row.Question.DisplayCode}\t${row.Question.ResponseType}\t${row.Question.Score}\t${row.Question.CorrectAnswer}\t${row.Question.Hint}\t` +
        `${row.Question.TemplateId}\t${row.Question.SectionId}\t${row.Question.CreatedAt}\t${row.Question.UpdatedAt}\t${row.ResponseType}\t${row.IntegerValue}\t${row.FloatValue}\t${row.BooleanValue}\t` +
        `${row.DateTimeValue}\t${row.Url}\t${row.FileResourceId}\t${row.TextValue}\t${row.SubmissionTimestamp}\t${row.LastSaveTimestamp}`);
    });

    doc.end();
    return pdfPath;
  };


  search = async (filters: QuestionResponseSearchFilters): Promise<any> => {
    try {
      var search = this.getSearchModel(filters);
      var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
      const [list, count] = await this._responseRepo.findAndCount(search);

      const searchResults = {
        TotalCount: count,
        RetrievedCount: list.length,
        PageIndex: pageIndex,
        ItemsPerPage: limit,
        Order: order === 'DESC' ? 'descending' : 'ascending',
        OrderedBy: orderByColumn,
        Items: ResponseMapper.toArrayDto(list),
      };

      return searchResults;
    }

    catch (error) {
      Logger.instance().log(error.message);
      ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
    }
  };

  private getSearchModel = (filters: QuestionResponseSearchFilters) => {

    var search: FindManyOptions<QuestionResponse> = {
      relations: {},
      where: {},
    };

    if (filters.FormSubmissionId) {
      search.where["FormSubmissionId"] =
        filters.FormSubmissionId;
    }

    if (filters.QuestionId) {
      search.where["QuestionId"] = filters.QuestionId;
    }

    if (filters.ResponseType) {
      search.where["ResponseType"] =
        filters.ResponseType;
    }

    if (filters.IntegerValue) {
      search.where["IntegerValue"] =
        filters.IntegerValue;
    }

    if (filters.FloatValue) {
      search.where["FloatValue"] = filters.FloatValue;
    }

    if (filters.BooleanValue) {
      search.where["BooleanValue"] =
        filters.BooleanValue;
    }
    if (filters.Url) {
      search.where["Url"] = filters.Url;
    }
    if (filters.FileResourceId) {
      search.where["FileResourceId"] =
        filters.FileResourceId;
    }
    if (filters.TextValue) {
      search.where["TextValue"] = filters.TextValue;
    }


    return search;
  };
}