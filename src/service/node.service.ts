import * as express from "express";

import { PrismaClient } from "@prisma/client";

import { PrismaClientInit } from "../startup/prisma.client.init";
import { QuestionMapper } from "../mapper/node.mapper";

export class QuestionService {
  prisma: PrismaClient = null;
  constructor() {
    this.prisma = PrismaClientInit.instance().getPrismaInstance();
  }

  getQuestion = async (_req: express.Request) => {
    const que = await this.prisma.question.findMany({});
    // return QuestionMapper.toArrayDto(que);
    // return que;
  };

  getQuestionById = async (id: number) => {
    const que = await this.prisma.node.findUnique({
      where: {
        id: id,
      },
    });
    return QuestionMapper.toDto(que);
    // return student;
  };

  createQuestion = async (req: express.Request) => {
    console.log(req.body)
    const que = await this.prisma.node.create({
      data: {
        nodeType: req.body.NodeType,
        parentNodeId: req.body.ParentNodeId,
        title: req.body.Title,
        description: req.body.Description,
        sequence: req.body.Sequence,
        queryType: req.body.QueryType,
        resolutionScore: req.body.ResolutionScore,
        providerAssessmentCode: req.body.ProviderAssessmentCode,
        message: req.body.Message,
        serveListNodeChildrenAtOnce: req.body.ServeListNodeChildrenAtOnce,
        scoringApplicable: req.body.ScoringApplicable,
        options: req.body.Options,
      },
    });
    return QuestionMapper.toDto(que);
  };

  // updateQuestion = async (id: any, requestBody: any) => {
  //   const que = await this.prisma.node.update({
  //     data: {
  //       question: requestBody.question,
  //       type: requestBody.type,
  //     },
  //     where: {
  //       id: parseInt(id),
  //     },
  //   });
  //   return que;
  // };
  // deleteQuestion = async (id: number) => {
  //   const que = await this.prisma.question.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return que;
  // };

  // deleteAllQuestion = async () => {
  //   const que = await this.prisma.question.deleteMany({});
  //   return que;
  // };
}
