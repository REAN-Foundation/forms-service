import express from 'express';
import { uuid } from '../domain.types/miscellaneous/system.types';
import { Injector } from '../startup/injector';
import { UserService } from '../services/user.service';
import { PermissionHandler } from '../auth/custom/permission.handler';
import { ApiError } from '../common/api.error';


///////////////////////////////////////////////////////////////////////////////////////

export class BaseController {

    public authorizeOne = async (
        request: express.Request,
        resourceOwnerUserId?: uuid,
        resourceTenantId?: uuid): Promise<void> => {

        if (request.currentClient?.IsPrivileged) {
            return;
        }

        let ownerUserId = resourceOwnerUserId ?? null;
        let tenantId = resourceTenantId ?? null;

        if (ownerUserId) {
            const userService = Injector.Container.resolve(UserService);
            const user = await userService.getById(ownerUserId);
            if (user) {
                ownerUserId = user.id;
                tenantId = tenantId ?? user.TenantId;
            }
        }

        if (tenantId == null) {
            // If tenant is not provided, get the default tenant
            const tenantService = Injector.Container.resolve(TenantService);
            const tenant = await tenantService.getTenantWithCode('default');
            if (tenant) {
                tenantId = tenant.id;
            }
        }

        request.resourceOwnerUserId = ownerUserId;
        request.resourceTenantId = tenantId;

        const permitted = await PermissionHandler.checkFineGrained(request);
        if (!permitted) {
            throw new ApiError(403, 'Permission denied.');
        }
    };

}
