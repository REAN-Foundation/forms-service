import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { UserMapper } from "../../database/sql/typeorm/mappers/user.mapper";
import { UserCreateModel, UserSearchFilters, UserSearchResponseDto, UserUpdateModel } from "../../domain.types/forms/user.domain.types";
import { ErrorHandler } from "../../common/handlers/error.handler";
import { IUserRepo } from "../../database/repository.interfaces/user/user.repo.interface";
import { inject, injectable } from "tsyringe";


@injectable()
export class UserService {
    // prisma: PrismaClient = null;
    constructor(@inject('IUserRepo') private _userRepo : IUserRepo) {
        // this.prisma = PrismaClientInit.instance().getPrismaInstance();
    }

    allUsers = async () => {
       const dto=await this._userRepo.allUsers();
         return dto;
    };

    create = async (model: UserCreateModel) => {
        const dto=await this._userRepo.create(model);
         return dto;
    };

    update = async (id: string, model: UserUpdateModel) => {
       const dto=await this._userRepo.update(id,model);
         return dto;
    };

    getById = async (id: string) => {
       const dto=await this._userRepo.getById(id);
       return dto;
    };

    delete = async (id: string) => {
       const dto=await this._userRepo.delete(id);
       return dto;
    };

 
    public search = async (filters: UserSearchFilters) => {
        const dto=await this._userRepo.search(filters);
         return dto;
    };


}
