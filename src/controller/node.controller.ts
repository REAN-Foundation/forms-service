import * as express from "express";

import { QuestionService } from "../service/node.service";
import { ResponseHandler } from "../common/response.handler";
import { ErrorHandler } from "../common/error.handler";
import { ApiError } from "../common/api.error";
// import { Studentvalidator } from '../validation/question/question.validator';
import { QuestionUpdateModel } from "../domain.types/student/question.domain.types";

export class QuestionController {
  public service: QuestionService;
  constructor() {
    this.service = new QuestionService();
  }

  // get = async (req: express.Request, res: express.Response) => {
  //   try {
  //     const queC = await this.service.getQuestion(req);
  //     if (queC.length === 0) {
  //       ErrorHandler.throwNotFoundError("no record found");
  //     }

  //     const message = "Successfully received the data";
  //     ResponseHandler.success(req, res, message, 200, queC);
  //   } catch (error: any) {
  //     ResponseHandler.handleError(req, res, error);
  //   }
  // };

  // getById = async (req: express.Request, res: express.Response) => {
  //   try {
  //     const id: number = parseInt(req.params.id);
  //     const record = await this.service.getQuestionById(id);
  //     if (record === null) {
  //       ErrorHandler.throwNotFoundError("Student not found");
  //     }

  //     const message = "Successfully received the data";
  //     ResponseHandler.success(req, res, message, 200, record);
  //   } catch (error: any) {
  //     ResponseHandler.handleError(req, res, error);
  //   }
  // };

  create = async (req: express.Request, res: express.Response) => {
    try {
      // await Studentvalidator.validateCreateRequest(req.body)
      console.log("error after try");
      let queC = await this.service.createQuestion(req);
      console.log("error after method call");
      if (queC === null) {
        console.log("student not created");
        throw new ApiError("Unable to create user.....!", 400);
      }

      const message = "Successfully created the student";
      ResponseHandler.success(req, res, message, 200, queC);
    } catch (error: any) {
      console.log("error in catch",error);
      ResponseHandler.handleError(req, res, error);
    }
  };

  // update = async (req: express.Request, res: express.Response) => {
  //   try {
  //     const id: number = parseInt(req.params.id);
  //     const isUpdate = await this.service.getQuestionById(id);
  //     if (isUpdate === null) {
  //       ErrorHandler.throwNotFoundError(
  //         `Question with id ${req.params.id} not found`
  //       );
  //     }

  //     // await Studentvalidator.validateUpdateRequest(req.body);
  //     const UpdateModel: QuestionUpdateModel = this.getUpdateModel(req.body);
  //     const queC = await this.service.updateQuestion(id, UpdateModel);
  //     ResponseHandler.success(req, res, "Successfully updated", 200, queC);
  //   } catch (error: any) {
  //     ResponseHandler.handleError(req, res, error);
  //   }
  // };

  // delete = async (req: express.Request, res: express.Response) => {
  //   try {
  //     const id: number = parseInt(req.params.id);
  //     const isPresent = await this.service.getQuestionById(id);
  //     if (isPresent === null) {
  //       ErrorHandler.throwNotFoundError(
  //         `Question with id ${req.params.id} not found`
  //       );
  //     }
  //     const queC = await this.service.deleteQuestion(id);
  //     const message = "record deleted successfully";
  //     ResponseHandler.success(req, res, message, 200, queC);
  //   } catch (error: any) {
  //     ResponseHandler.handleError(req, res, error);
  //   }
  // };

  // deleteAll = async (req: express.Request, res: express.Response) => {
  //   try {
  //     const queC = await this.service.deleteAllQuestion();
  //     const message = "All records deleted successfully";
  //     ResponseHandler.success(req, res, message, 200, queC);
  //   } catch (error: any) {
  //     ResponseHandler.handleError(req, res, error);
  //   }
  // };

  private getUpdateModel(requestBody: any): QuestionUpdateModel {
    const model: QuestionUpdateModel = {
      question: requestBody.question,
      type: requestBody.type,
      //  ? parseInt(requestBody.age) :undefined,
    };
    return model;
  }
}
