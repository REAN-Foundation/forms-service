import {
    UserCreateModel,
    UserResponseDto,
    UserSearchFilters,
    UserUpdateModel,
} from '../../../domain.types/forms/user.domain.types';

export interface IUserRepo {
    allUsers(): Promise<any>;

    create(model: UserCreateModel): Promise<UserResponseDto>;

    update(id: string, model: UserUpdateModel): Promise<UserResponseDto>;

    getById(id: string): Promise<UserResponseDto>;

    delete(id: string): Promise<boolean>;

    search(filters: UserSearchFilters): Promise<any>;
}
