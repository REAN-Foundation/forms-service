import { PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { UserLoginSessionMapper } from "../database/sql/typeorm/mappers/user.login.mapper";
import { UserLoginSessionCreateModel, UserLoginSessionUpdateModel } from "../domain.types/forms/user.login.session.domain.types";


export class UserLoginSessionService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    // allUserLoginSessions = async (): Promise<any> => {
    //     const response = await this.prisma.userLoginSession.findMany({
    //         include: {
    //             User: true,
    //         },
    //         where: {
    //             DeletedAt: null
    //         }
    //     });
    //     return UserLoginSessionMapper.toArrayDto(response);
    //     // return response;
    // };

    create = async (model: UserLoginSessionCreateModel) => {
        const response = await this.prisma.userLoginSession.create({
            include: {
                User: true
            },
            data: {
                User: {
                    connect: { id: model.UserId }
                },
                ValidTill: model.ValidTill,
                IsActiveSession: model.IsActiveSession,
                // DeletedAt: null
            },
        });
        return UserLoginSessionMapper.toDto(response);
    };

    update = async (id: string, model: UserLoginSessionUpdateModel) => {
        const response = await this.prisma.userLoginSession.update({
            data: {
                User: {
                    connect: { id: model.UserId }
                },
                ValidTill: model.ValidTill,
                IsActiveSession: model.IsActiveSession,
                UpdatedAt: new Date()
            },
            include: {
                User: true
            },
            where: {
                id: id,
                DeletedAt: null
            },

        });
        return UserLoginSessionMapper.toDto(response);
        // return response;
    };

    getById = async (id: string) => {
        const response = await this.prisma.userLoginSession.findUnique({
            where: {
                id: id,
                DeletedAt: null
            },
            include: {
                User: true
            },
        });
        return UserLoginSessionMapper.toDto(response);
    };

    delete = async (id: string) => {
        const response = await this.prisma.userLoginSession.update({
            where: {
                id: id,
            },
            data: {
                DeletedAt: new Date(),
            },
            include: {
                User: true
            },
        });
        return UserLoginSessionMapper.toDto(response);
    };
}
