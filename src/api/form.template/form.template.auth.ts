import {
    AuthOptions,
    RequestType,
    ResourceOwnership,
    ActionScope,
    DefaultAuthOptions
} from '../../auth/auth.types';

///////////////////////////////////////////////////////////////////////////////////////

export class TemplateAuth {

    static readonly _baseContext = `Template`;

    static readonly create: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Create`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.CreateOne,
    };

    static readonly update: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Update`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.UpdateOne,
    };

    static readonly delete: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Delete`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.DeleteOne,
    };

    static readonly getById: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetById`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.GetOne,
    };

    static readonly search: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Search`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.Search,
        CustomAuthorization: true,
    };

    static readonly getDetailsById: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetDetailsById`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.UpdateOne,
        CustomAuthorization: true,
    };

    static readonly submission: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Submission`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.UpdateOne,
        CustomAuthorization: true,
    };

    static readonly export: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Export`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.UpdateOne,
        CustomAuthorization: true,
    };
}
