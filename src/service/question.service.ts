import * as express from "express";

import { PrismaClient } from "@prisma/client";
import { QuestionMapper } from "../mapper/question.mapper";
import { PrismaClientInit } from "../startup/prisma.client.init";

export class QuestionService {
  prisma: PrismaClient = null;
  constructor() {
    this.prisma = PrismaClientInit.instance().getPrismaInstance();
  }

  getQuestion = async (_req: express.Request) => {
    const que = await this.prisma.question.findMany({});
    return QuestionMapper.toArrayDto(que);
    // return que;
  };

  getQuestionById = async (id: number) => {
    const que = await this.prisma.question.findUnique({
      where: {
        id: id,
      },
    });
    return QuestionMapper.toDto(que);
    // return student;
  };

  createQuestion = async (req: express.Request) => {
    const que = await this.prisma.question.create({
      data: {
        question: req.body.question,
        type: req.body.type,
      },
    });
    return QuestionMapper.toDto(que);
  };

  updateQuestion = async (id: any, requestBody: any) => {
    const que = await this.prisma.question.update({
      data: {
        question: requestBody.question,
        type: requestBody.type,
      },
      where: {
        id: parseInt(id),
      },
    });
    return que;
  };
  deleteQuestion = async (id: number) => {
    const que = await this.prisma.question.delete({
      where: {
        id: id,
      },
    });
    return que;
  };

  deleteAllQuestion = async () => {
    const que = await this.prisma.question.deleteMany({});
    return que;
  };
}
