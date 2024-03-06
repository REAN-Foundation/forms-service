import { PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../startup/prisma.client.init";
import { UserMapper } from "../mappers/user.mapper";
import { UserCreateModel, UserUpdateModel } from "../domain.types/forms/user.domain.types";

export class UserService {
    prisma: PrismaClient = null;
    constructor() {
        this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allUsers = async () => {
        const response = await this.prisma.user.findMany({});
        return UserMapper.toArrayDto(response);
    };

    create = async (model: UserCreateModel) => {
        const response = await this.prisma.user.create({
            data: {
                FirstName: model.FirstName,
                LastName: model.LastName,
                CountryCode: model.CountryCode,
                Phone: model.Phone,
                Email: model.Email,
                Username: model.Username,
                Password: model.Password,
            },
        });
        return UserMapper.toDto(response);
    };

    update = async (id: string, model: UserUpdateModel) => {
        const response = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                FirstName: model.FirstName,
                LastName: model.LastName,
                CountryCode: model.CountryCode,
                Phone: model.Phone,
                Email: model.Email,
                Username: model.Username,
                Password: model.Password,
            },
        });
        return UserMapper.toDto(response);
    };

    getById = async (id: string) => {
        const response = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return UserMapper.toDto(response);
    };




    delete = async (id: string) => {
        const response = await this.prisma.user.delete({
            where: {
                id: id,
            },
        });
        return UserMapper.toDto(response);
    };


    // getByTemplateId = async (id: string) => {
    //     const response = await this.prisma.user.findMany({
    //         where: {
    //             FormTemplateId: id,
    //         },
    //     });
    //     return UserMapper.toArrayDto(response);
    // };

    // getByResponse = async (phone: string) => {
    //     const response = await this.prisma.user.findMany({
    //         where: {
    //             Phone: phone,
    //         },
    //     });
    //     return response;
    // };

    // submit = async (model: UserUpdateModel) => {
    //     const response = await this.prisma.user.create({
    //         data: {
    //             FormTemplateId: model.FormTemplateId,
    //             FormUrl: model.FormUrl,
    //             AnsweredByUserId: model.AnsweredByUserId,
    //             Status: model.Status,
    //         },
    //     });
    //     return UserMapper.toDto(response);
    // };
}
